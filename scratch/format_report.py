import os
import json

report_path = "scratch/auditor_report.md"
output_path = "scratch/readable_auditor_report.md"

if os.path.exists(report_path):
    with open(report_path, "r", encoding="utf-8") as f:
        raw_content = f.read().strip()
        
    try:
        # Parse JSON string using strict=False to handle unescaped control characters
        text = json.loads(raw_content, strict=False)
    except Exception as e:
        print(f"Standard JSON load failed: {e}. Trying raw string cleaning...")
        # Fallback to string stripping if it's not a JSON string
        text = raw_content
        if text.startswith('"') and text.endswith('"'):
            text = text[1:-1]
        text = text.replace('\\n', '\n').replace('\\"', '"').replace("\\'", "'")
        
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(text)
        
    print("Report formatted successfully to scratch/readable_auditor_report.md")
else:
    print(f"Error: {report_path} not found.")
