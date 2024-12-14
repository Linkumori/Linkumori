import json
from collections import defaultdict

def count_parameters(rule):
    """Count the number of parameters in a rule's removeParams."""
    if 'action' in rule and 'redirect' in rule['action']:
        redirect = rule['action']['redirect']
        if 'transform' in redirect and 'queryTransform' in redirect['transform']:
            query_transform = redirect['transform']['queryTransform']
            if 'removeParams' in query_transform:
                return len(query_transform['removeParams'])
    return 0

def group_rules_by_param_ranges(rules):
    """Group rules by parameter count ranges."""
    grouped_rules = defaultdict(list)
    
    for rule in rules:
        param_count = count_parameters(rule)
        # Skip rules with no parameters
        if param_count == 0:
            continue
            
        # Create range groups (1-10, 11-20, 21-30, 31-40, 41-50, >50)
        if param_count <= 10:
            group_key = "1-10"
        elif param_count <= 20:
            group_key = "11-20"
        elif param_count <= 30:
            group_key = "21-30"
        elif param_count <= 40:
            group_key = "31-40"
        elif param_count <= 50:
            group_key = "41-50"
        else:
            group_key = "over50"
            
        grouped_rules[group_key].append(rule)
    
    return grouped_rules

def save_rules_to_files(grouped_rules):
    """Save grouped rules to separate JSON files."""
    # Save individual range files
    ranges = ["1-10", "11-20", "21-30", "31-40", "41-50", "over50"]
    for file_num, range_key in enumerate(ranges, 1):
        if range_key in grouped_rules:
            # Reset rule IDs for each file, starting from 1
            rules_for_file = grouped_rules[range_key]
            for idx, rule in enumerate(rules_for_file, 1):
                rule['id'] = idx
                
            filename = f'rules{file_num}.json'
            with open(filename, 'w', encoding='utf-8') as f:
                json.dump(rules_for_file, f, indent=2, ensure_ascii=False)
            print(f'Created {filename} with {len(rules_for_file)} rules (Parameters: {range_key})')

def main():
    # Read the input JSON file
    try:
        with open('merged_rules.json', 'r', encoding='utf-8') as f:
            rules = json.load(f)
        
        # Group rules by parameter ranges
        grouped_rules = group_rules_by_param_ranges(rules)
        
        # Get statistics
        total_rules = len(rules)
        rules_by_range = {range_key: len(rule_list) for range_key, rule_list in grouped_rules.items()}
        
        # Print statistics
        print(f"\nTotal number of rules: {total_rules}")
        print("\nRules distribution by parameter ranges:")
        for range_key in sorted(rules_by_range.keys()):
            print(f"Rules with {range_key} parameters: {rules_by_range[range_key]}")
        
        # Save rules to separate files and combined file
        save_rules_to_files(grouped_rules)
        
    except FileNotFoundError:
        print("Error: Could not find merged_rules.json file")
    except json.JSONDecodeError:
        print("Error: Invalid JSON format in the input file")
    except Exception as e:
        print(f"An error occurred: {str(e)}")

if __name__ == "__main__":
    main()