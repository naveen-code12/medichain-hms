import os, re

base = r"C:\Users\nagul\medichain-frontend\src\pages"

old = r"setRecords(prev=>[...prev,{...form,id:(records.length+1).toString()});"
new = r"setRecords(prev=>[...prev,{...form}]);"

count = 0
for root, dirs, files in os.walk(base):
    for fname in files:
        if fname.endswith('.js'):
            fpath = os.path.join(root, fname)
            with open(fpath, 'r', encoding='utf-8') as f:
                content = f.read()
            if old in content:
                content = content.replace(old, new)
                with open(fpath, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Fixed: {fname}")
                count += 1

print(f"\nTotal: {count} files fixed!")