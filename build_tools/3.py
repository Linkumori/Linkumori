import json

def reassign_ids_and_minify_json(input_file, output_file):
    # Read the input JSON file
    with open(input_file, 'r') as f:
        data = json.load(f)

    # Reassign rule IDs
    for index, rule in enumerate(data, start=1):
        rule['id'] = index

    # Open the output file
    with open(output_file, 'w') as f:
        # Write the opening bracket
        f.write('[\n')

        # Iterate through each rule
        for i, rule in enumerate(data):
            # Minify the individual rule
            minified_rule = json.dumps(rule, separators=(',', ':'))
            
            # Write the minified rule
            f.write(minified_rule)
            
            # Add a comma if it's not the last rule
            if i < len(data) - 1:
                f.write(',\n')
            else:
                f.write('\n')

        # Write the closing bracket
        f.write(']\n')

# Process files from rules1.json to rules7.json
for i in range(1, 10):
    input_file = f'rules{i}.json'
    output_file = f'rules{i}.json'
    reassign_ids_and_minify_json(input_file, output_file)
    print(f"Processed {input_file}: Rules have been reassigned IDs and minified. The output has been saved to {output_file}")

print("All files have been processed successfully.")
