import os

report_path = "scratch/auditor_report.md"
output_path = "scratch/clean_auditor_report.md"

if os.path.exists(report_path):
    with open(report_path, "r", encoding="utf-8") as f:
        text = f.read().strip()
    
    # Strip quotes
    if text.startswith('"'):
        text = text[1:]
    if text.endswith('"'):
        text = text[:-1]
        
    # Unescape newlines, quotes, and backslashes
    text = text.replace("\\n", "\n")
    text = text.replace('\\"', '"')
    text = text.replace("\\'", "'")
    text = text.replace("\\\\", "\\")
    
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(text)
        
    with open(output_path, "r", encoding="utf-8") as f:
        lines = f.readlines()
        
    print(f"Report cleaned successfully to clean_auditor_report.md with {len(lines)} lines.")
else:
    print(f"Error: {report_path} not found.")
