import os
import glob

base = r"C:\Users\nagul\medichain-frontend\src\pages"

# Find all JS files with the broken save line
broken = "id:'#{records.length+1}'"
fixed = "id:(records.length+1).toString()"

count = 0
for root, dirs, files in os.walk(base):
    for fname in files:
        if fname.endswith('.js'):
            fpath = os.path.join(root, fname)
            with open(fpath, 'r', encoding='utf-8') as f:
                content = f.read()
            if broken in content:
                content = content.replace(broken, fixed)
                with open(fpath, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Fixed: {fpath}")
                count += 1

print(f"\nTotal fixed: {count} files")