with open('src/pages/ArticlePage.tsx', 'r') as f:
    lines = f.readlines()

in_template = False
depth = 0

for i, line in enumerate(lines):
    line_num = i + 1
    char_idx = 0
    while char_idx < len(line):
        c = line[char_idx]
        if c == '`':
            in_template = not in_template
        elif not in_template:
            if c == '{':
                depth += 1
            elif c == '}':
                depth -= 1
        char_idx += 1
    
    if 740 <= line_num <= 760:
        print(f"Line {line_num:3d} (in_template={in_template}): {line.strip()} | Depth: {depth}")
