import json
from typing import Dict, List, Optional
from collections import defaultdict

def url_patterns_match(pattern1: str, pattern2: str) -> bool:
    """Check if two URL patterns are exactly the same."""
    return pattern1 == pattern2

def extract_pattern_from_rule(rule: Dict) -> Optional[str]:
    """Extract URL pattern from a rule's condition."""
    condition = rule.get("condition", {})
    
    # Check for regexFilters first
    if "regexFilters" in condition:
        return condition["regexFilters"]
        
    # Check for urlFilter
    if "urlFilter" in condition:
        return condition["urlFilter"]
        
    # Check for requestDomains
    if "requestDomains" in condition:
        domains = condition["requestDomains"]
        if isinstance(domains, list):
            if len(domains) == 1:
                return f"||{domains[0]}"
            else:
                return "|".join(f"||{d}" for d in domains)
        return f"||{domains}"
        
    # Check for initiatorDomains
    if "initiatorDomains" in condition:
        domains = condition["initiatorDomains"]
        if isinstance(domains, list):
            if len(domains) == 1:
                return f"||{domains[0]}"
            else:
                return "|".join(f"||{d}" for d in domains)
        return f"||{domains}"
        
    return None

def merge_remove_params(params1: List[str], params2: List[str]) -> List[str]:
    """Merge two lists of parameters to remove, keeping unique values."""
    return sorted(list(set(params1) | set(params2)))

def merge_resource_types(types1: List[str], types2: List[str]) -> List[str]:
    """Merge resource types from two rules."""
    return sorted(list(set(types1) | set(types2)))

def merge_domains(domains1: List[str], domains2: List[str]) -> List[str]:
    """Merge domain lists, handling both single strings and lists."""
    if isinstance(domains1, str):
        domains1 = [domains1]
    if isinstance(domains2, str):
        domains2 = [domains2]
    return sorted(list(set(domains1) | set(domains2)))

def can_merge_rules(rule1: Dict, rule2: Dict) -> bool:
    """Determine if two rules can be merged based on their patterns and actions."""
    if rule1["action"]["type"] != rule2["action"]["type"]:
        return False
        
    pattern1 = extract_pattern_from_rule(rule1)
    pattern2 = extract_pattern_from_rule(rule2)
    
    if not pattern1 or not pattern2:
        return False
        
    return url_patterns_match(pattern1, pattern2)

def merge_conditions(condition1: Dict, condition2: Dict) -> Dict:
    """Merge two rule conditions."""
    merged = condition1.copy()
    
    # Handle regex patterns or urlFilter - keep original as they're identical
    if "regexFilters" in condition1:
        merged["regexFilters"] = condition1["regexFilters"]
    elif "urlFilter" in condition1:
        merged["urlFilter"] = condition1["urlFilter"]
    
    # Merge resource types
    if "resourceTypes" in condition1 and "resourceTypes" in condition2:
        merged["resourceTypes"] = merge_resource_types(
            condition1["resourceTypes"],
            condition2["resourceTypes"]
        )
    
    # Merge domains if present
    for domain_key in ["requestDomains", "initiatorDomains"]:
        if domain_key in condition1 and domain_key in condition2:
            merged[domain_key] = merge_domains(
                condition1[domain_key],
                condition2[domain_key]
            )
    
    return merged

def merge_rules(rules_list: List[Dict]) -> List[Dict]:
    """Merge rules based on exact URL pattern matches."""
    merged_rules = []
    
    # First pass: Group rules by action type
    action_groups = defaultdict(list)
    for rule in rules_list:
        action_type = rule["action"]["type"]
        action_groups[action_type].append(rule)
    
    # Second pass: For each action type, merge identical rules
    for action_type, group_rules in action_groups.items():
        unmerged = group_rules.copy()
        while unmerged:
            base_rule = unmerged.pop(0)
            cluster = [base_rule]
            
            i = 0
            while i < len(unmerged):
                if can_merge_rules(base_rule, unmerged[i]):
                    cluster.append(unmerged.pop(i))
                else:
                    i += 1
            
            # Merge the cluster into a single rule
            if cluster:
                merged_rule = cluster[0].copy()
                for rule in cluster[1:]:
                    # Merge conditions
                    merged_rule["condition"] = merge_conditions(
                        merged_rule["condition"],
                        rule["condition"]
                    )
                    
                    # Merge transform parameters if present
                    if ("action" in rule and "redirect" in rule["action"] and
                        "transform" in rule["action"]["redirect"] and
                        "queryTransform" in rule["action"]["redirect"]["transform"] and
                        "removeParams" in rule["action"]["redirect"]["transform"]["queryTransform"]):
                        
                        if "transform" not in merged_rule["action"]["redirect"]:
                            merged_rule["action"]["redirect"]["transform"] = {}
                        if "queryTransform" not in merged_rule["action"]["redirect"]["transform"]:
                            merged_rule["action"]["redirect"]["transform"]["queryTransform"] = {}
                        if "removeParams" not in merged_rule["action"]["redirect"]["transform"]["queryTransform"]:
                            merged_rule["action"]["redirect"]["transform"]["queryTransform"]["removeParams"] = []
                        
                        existing_params = merged_rule["action"]["redirect"]["transform"]["queryTransform"]["removeParams"]
                        new_params = rule["action"]["redirect"]["transform"]["queryTransform"]["removeParams"]
                        merged_params = merge_remove_params(existing_params, new_params)
                        merged_rule["action"]["redirect"]["transform"]["queryTransform"]["removeParams"] = merged_params
                
                merged_rules.append(merged_rule)
    
    # Sort and reassign IDs
    merged_rules.sort(key=lambda x: x.get("id", 0))
    
    for i, rule in enumerate(merged_rules, 1):
        rule["id"] = i
        if "priority" in rule:
            rule["priority"] = 1
    
    return merged_rules

def load_json_content(content: str) -> List[Dict]:
    """Load JSON content and return as list of rules."""
    try:
        return json.loads(content)
    except json.JSONDecodeError:
        print(f"Error decoding JSON content")
        return []

def process_json_files(json_contents: List[str]) -> List[Dict]:
    """Process multiple JSON contents and merge their rules."""
    all_rules = []
    
    # Load and combine all rules
    for content in json_contents:
        rules = load_json_content(content)
        all_rules.extend(rules)
    
    # Merge rules
    merged_rules = merge_rules(all_rules)
    return merged_rules

def save_merged_rules(rules: List[Dict], output_file: str = "merged_rules.json"):
    """Save merged rules to a JSON file with pretty printing."""
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(rules, f, indent=2, ensure_ascii=False)
    print(f"Merged rules saved to {output_file}")

if __name__ == "__main__":
    # Get the JSON contents from the files
    json_contents = []
    for i in range(1, 9):
        try:
            with open(f'rules{i}.json', 'r', encoding='utf-8') as f:
                json_contents.append(f.read())
        except FileNotFoundError:
            print(f"Warning: rules{i}.json not found")
    
    # Process and merge the rules
    merged_rules = process_json_files(json_contents)
    
    # Save the merged rules
    save_merged_rules(merged_rules)
    
    print(f"Successfully merged {len(merged_rules)} rules")