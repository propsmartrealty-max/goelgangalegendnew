import os
import re

file_path = "src/pages/ArticlePage.tsx"
if not os.path.exists(file_path):
    print(f"Error: {file_path} not found.")
    exit(1)

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Escaping parentheses in var(--border-light)
pattern = r'(<table style="width:100%; border-collapse: collapse; margin: 2rem 0; border: 1px solid var\(--border-light\);\">([\s\S]*?)</table>)'

def replace_table(match):
    full_table = match.group(1)
    table_body = match.group(2)
    
    responsive_table = (
        '<div style="overflow-x:auto;-webkit-overflow-scrolling:touch;width:100%;margin:2rem 0;">'
        '<table style="width:100%; border-collapse: collapse; border: 1px solid var(--border-light);">'
        f'{table_body}'
        '</table>'
        '</div>'
    )
    return responsive_table

new_content = re.sub(pattern, replace_table, content)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(new_content)

print("Tables in ArticlePage.tsx wrapped in responsive scroll containers successfully!")
