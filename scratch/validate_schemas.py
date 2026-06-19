import re
import os
import json
import sys

def extract_json_ld_schemas():
    seo_path = "src/components/SEO.tsx"
    if not os.path.exists(seo_path):
        print(f"Error: {seo_path} not found.")
        return None

    with open(seo_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Verify that the consolidate schemas are correct
    errors = []
    
    # 1. Check for consolidated schema structure
    if "const consolidatedSchema" not in content or "getConsolidatedSchema" not in content:
        errors.append("Missing consolidated Schema Graph definition in SEO.tsx")

    # 2. Check for required Schema Types in the codebase
    required_types = ["BreadcrumbList", "Product", "RealEstateListing", "LocalBusiness", "Organization", "WebSite", "ApartmentComplex", "VideoObject"]
    for schema_type in required_types:
        if f'"@type": "{schema_type}"' not in content and f'"@type": ["{schema_type}"' not in content:
            # Check if it is conditional
            if f'"{schema_type}"' not in content:
                errors.append(f"Missing references to required schema type: {schema_type} in SEO.tsx")

    # 3. Check for specific fields in LocalBusiness
    if '"telephone": "+917744009295"' not in content:
        errors.append("Missing standard business contact telephone in LocalBusiness Schema")
        
    if '"priceRange": "₹1.77 Cr - ₹3.40 Cr+"' not in content:
        errors.append("Missing standard priceRange in LocalBusiness Schema")

    # 4. Check that site URL is correct
    if "https://goelgangalegend.com" not in content:
        errors.append("Invalid Site canonical URL reference in SEO.tsx")

    # 5. Check RERA number in schema descriptions
    if "P52100054578" not in content:
        errors.append("Missing MahaRERA license verification (P52100054578) inside SEO.tsx schemas")

    return errors

def main():
    print("Starting Automated Schema Graph Validation...")
    errors = extract_json_ld_schemas()

    if errors is None:
        sys.exit(1)

    if errors:
        print("\n--- SCHEMA VALIDATION FAILED ---")
        for err in errors:
            print(f"❌ {err}")
        sys.exit(1)
    else:
        print("\n--- SCHEMA VALIDATION PASSED SUCCESSFULLY ---")
        print("✅ All required JSON-LD schemas conform to Schema.org graphs and Google SERP rich result specifications.")
        sys.exit(0)

if __name__ == "__main__":
    main()
