from PIL import Image, ImageDraw, ImageFont

# Create a 450x100 transparent image
img = Image.new("RGBA", (450, 100), (255, 255, 255, 0))
draw = ImageDraw.Draw(img)

# Draw a stylized "G" icon with blue-green colors matching the website brand
draw.ellipse([20, 20, 80, 80], outline=(0, 114, 188), width=8)
draw.arc([35, 35, 65, 65], start=0, end=270, fill=(141, 198, 63), width=6)
draw.rectangle([50, 48, 70, 52], fill=(141, 198, 63))

# Draw clean text representation
# Since it is for metadata schema, default font is perfectly fine
try:
    font = ImageFont.load_default()
except Exception:
    font = None

draw.text((100, 25), "GOEL GANGA", fill=(26, 26, 30))
draw.text((100, 45), "LEGEND COUNTY", fill=(134, 59, 255))
draw.text((100, 70), "SPORTS TOWNSHIP • BAVDHAN PUNE", fill=(107, 107, 120))

# Save the files
img.save("/Users/vikasyewle/goelgangalegendcounty/public/logo.png", "PNG")
img.save("/Users/vikasyewle/goelgangalegendcounty/public/logo.webp", "WEBP", quality=85)
print("Logo generated successfully in both PNG and WebP formats!")
