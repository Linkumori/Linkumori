import json
import os

def convert_json_to_rules():
    # Initialize rules dictionary with generic parameters
    rules = {
        "generic": set(),
        "domain_specific": {}
    }
    
    # Process files rules1.json through rules8.json
    for i in range(1, 9):
        filename = f'rules{i}.json'
        if os.path.exists(filename):
            try:
                with open(filename, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    
                print(f"Processing {filename}...")
                
                for rule in data:
                    if "action" not in rule or "condition" not in rule:
                        continue

                    # Extract parameters to remove
                    try:
                        params = rule["action"]["redirect"]["transform"]["queryTransform"]["removeParams"]
                    except (KeyError, TypeError):
                        continue

                    # Check if it's a domain-specific rule
                    if "condition" in rule:
                        if "requestDomains" in rule["condition"]:
                            domains = rule["condition"]["requestDomains"]
                            # Handle single domain or list of domains
                            if isinstance(domains, str):
                                domains = [domains]
                            
                            for domain in domains:
                                # Skip regex patterns and invalid domains
                                if not isinstance(domain, str) or domain.startswith(("^", "(", "*")):
                                    continue
                                    
                                # Clean up domain
                                domain = domain.replace(".*", ".com")
                                if domain not in rules["domain_specific"]:
                                    rules["domain_specific"][domain] = set()
                                rules["domain_specific"][domain].update(params)
                                
                        elif "regexFilter" in rule["condition"]:
                            # Handle regex filter cases
                            regex = rule["condition"]["regexFilter"]
                            if "google" in regex:
                                domain = "google.com"
                            elif "amazon" in regex:
                                domain = "amazon.com"
                            elif "shopee" in regex:
                                domain = "shopee.com"
                            else:
                                continue
                                
                            if domain not in rules["domain_specific"]:
                                rules["domain_specific"][domain] = set()
                            rules["domain_specific"][domain].update(params)
                            
                        elif "urlFilter" in rule["condition"] and rule["condition"]["urlFilter"] == "*":
                            # These are generic parameters
                            rules["generic"].update(params)

            except Exception as e:
                print(f"Error processing {filename}: {str(e)}")
                continue

    # Convert to desired format
    formatted_rules = "const parameterRules = [\n"
    
    # Add generic parameters
    formatted_rules += "    {\n"
    formatted_rules += "        // Generic parameters\n"
    formatted_rules += "        removeParams: [\n            "
    generic_params = sorted(list(rules["generic"]))
    # Split into chunks of 4 for readability
    chunks = [generic_params[i:i + 4] for i in range(0, len(generic_params), 4)]
    formatted_rules += ",\n            ".join([
        '"' + '", "'.join(chunk) + '"' for chunk in chunks
    ])
    formatted_rules += "\n        ]\n    }"
    
    # Add domain-specific rules
    for domain, params in sorted(rules["domain_specific"].items()):
        if len(params) > 0:  # Only add domains with parameters
            formatted_rules += ",\n    {\n"
            formatted_rules += f'        domain: "{domain}",\n'
            formatted_rules += "        removeParams: [\n            "
            param_list = sorted(list(params))
            # Split domain-specific params into chunks too
            chunks = [param_list[i:i + 4] for i in range(0, len(param_list), 4)]
            formatted_rules += ",\n            ".join([
                '"' + '", "'.join(chunk) + '"' for chunk in chunks
            ])
            formatted_rules += "\n        ]\n    }"
    
    formatted_rules += "\n];"
    
    return formatted_rules

def main():
    try:
        formatted_output = convert_json_to_rules()
        
        # Write to file
        with open('formatted_rules.js', 'w', encoding='utf-8') as f:
            f.write(formatted_output)
        
        print("\nRules have been successfully converted and saved to 'formatted_rules.js'")
        
        # Print some statistics
        with open('formatted_rules.js', 'r', encoding='utf-8') as f:
            content = f.read()
            rules_count = content.count('domain:')
            print(f"\nStatistics:")
            print(f"- Total domain-specific rules: {rules_count}")
            print(f"- Output file size: {len(content)} bytes")
            
    except Exception as e:
        print(f"Error: {str(e)}")

if __name__ == "__main__":
    main()