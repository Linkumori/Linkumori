import json
import sys

def read_file_content():
    try:
        with open('input.json', 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        print("Error:  not found")
        sys.exit(1)

def filter_rules(rules):
    """
    Filter  rules to remove domain-specific rules and keep only URL pattern rules.
    """
    filtered_rules = []
    
    for rule in rules:
        # Skip rules that have requestDomains condition
        if 'condition' in rule and 'requestDomains' in rule['condition']:
            continue
            
        # Skip rules that have initiatorDomains condition
        if 'condition' in rule and 'initiatorDomains' in rule['condition']:
            continue
            
        # Keep rules that have urlFilter condition
        if 'condition' in rule and 'urlFilter' in rule['condition']:
            filtered_rules.append(rule)
    
    return filtered_rules

def write_output(rules):
    """
    Write the filtered rules to a JSON file with proper formatting
    """
    output_filename = 'output.json'
    with open(output_filename, 'w', encoding='utf-8') as f:
        json.dump(rules, f, indent=2, ensure_ascii=False)
    return output_filename

def main():
    # Get all rules
    rules = read_file_content()
    
    # Filter rules
    filtered_rules = filter_rules(rules)
    
    # Write output
    output_file = write_output(filtered_rules)
    
    # Print summary
    print(f"Original rules count: {len(rules)}")
    print(f"Filtered rules count: {len(filtered_rules)}")
    print(f"Filtered rules saved to: {output_file}")

if __name__ == "__main__":
    main()
