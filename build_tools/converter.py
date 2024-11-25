import json
from collections import defaultdict
from datetime import datetime

def read_output_file(file_path):
    """Read the input file and return its contents as a list of lines."""
    with open(file_path, 'r') as file:
        return file.readlines()

def parse_rules(lines):
    """
    Parse the input lines and extract removeparam rules.
    
    Returns a tuple of (converted_rules, skipped_rules, conversion_log)
    """
    rules = defaultdict(set)
    skipped_rules = []
    conversion_log = []

    for line in lines:
        line = line.strip()
        if line.startswith('||') or line.startswith('$'):
            parts = line.split('$')
            domain = parts[0].lstrip('|')  # Use lstrip instead of strip
            if len(parts) > 1:
                param_part = parts[1]
                if 'removeparam=' in param_part:
                    params = param_part.split('removeparam=')[1].split(',')
                    rules[domain].update(params)
                    conversion_log.append(f"Original: {line}")
                    conversion_log.append(f"Converted: Domain: {domain}, Params: {params}")
                elif '=' in param_part:
                    params = param_part.split('=')[1].split(',')
                    rules[domain].update(params)
                    conversion_log.append(f"Original: {line}")
                    conversion_log.append(f"Converted: Domain: {domain}, Params: {params}")
                else:
                    skipped_rules.append(f"No parameters: {line}")
            else:
                skipped_rules.append(f"No parameters: {line}")
        else:
            skipped_rules.append(f"Unsupported rule type: {line}")

    return rules, skipped_rules, conversion_log

def generate_ubo_json(rules):
    """Generate uBlock Origin compatible JSON rules."""
    ubo_rules = []
    for index, (domain, params) in enumerate(rules.items(), start=1):
        if params:
            clean_domain = domain.rstrip('^')
            rule = {
                "id": index,
                "priority": 1,
                "action": {
                    "type": "redirect",
                    "redirect": {
                        "transform": {
                            "queryTransform": {
                                "removeParams": list(params)
                            }
                        }
                    }
                },
                "condition": {
                    "resourceTypes": ["xmlhttprequest", "sub_frame", "main_frame"],
                    "requestDomains": [clean_domain]
                }
            }
            ubo_rules.append(rule)
    return ubo_rules

def write_minified_json(data, output_file):
    """Write minified JSON to the output file."""
    with open(output_file, 'w') as f:
        f.write('[\n')
        for i, rule in enumerate(data):
            minified_rule = json.dumps(rule, separators=(',', ':'))
            f.write(minified_rule)
            if i < len(data) - 1:
                f.write(',\n')
            else:
                f.write('\n')
        f.write(']\n')

def main():
    input_file = 'output2.txt'
    output_file = 'ublock_rules.json'
    conversion_log_file = 'conversion_log.txt'

    try:
        start_time = datetime.now()
        lines = read_output_file(input_file)
        rules, skipped_rules, conversion_log = parse_rules(lines)
        json_rules = generate_ubo_json(rules)

        write_minified_json(json_rules, output_file)

        end_time = datetime.now()
        duration = end_time - start_time

        with open(conversion_log_file, 'w') as f:
            f.write(f"Conversion Log\n")
            f.write(f"==============\n\n")
            f.write(f"Conversion started at: {start_time}\n")
            f.write(f"Conversion ended at: {end_time}\n")
            f.write(f"Duration: {duration}\n\n")
            f.write(f"Input file: {input_file}\n")
            f.write(f"Output file: {output_file}\n\n")
            f.write("Converted Rules:\n")
            f.write("================\n\n")
            for original, converted in zip(conversion_log[::2], conversion_log[1::2]):
                f.write(f"{original}\n{converted}\n\n")
            f.write("Skipped Rules:\n")
            f.write("==============\n\n")
            f.write("\n".join(skipped_rules))
            f.write(f"\n\nSummary:\n")
            f.write(f"Total rules converted: {len(json_rules)}\n")
            f.write(f"Total rules skipped: {len(skipped_rules)}\n")

        print(f"Conversion complete. Minified rules saved to {output_file}")
        print(f"Conversion log saved to {conversion_log_file}")
        print(f"Total rules converted: {len(json_rules)}")
        print(f"Total rules skipped: {len(skipped_rules)}")
        print(f"Conversion duration: {duration}")
    except FileNotFoundError:
        print(f"Error: Input file '{input_file}' not found.")
    except Exception as e:
        print(f"An error occurred: {str(e)}")

if __name__ == "__main__":
    main()