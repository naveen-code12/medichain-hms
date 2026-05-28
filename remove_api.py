import os

base = r"C:\Users\nagul\medichain-frontend\src\pages"

# Fix all pages - remove API import and replace with local state
fixes = {
    "pages/Patients/InPatients.js": True,
    "pages/Patients/Appointments.js": True,
    "pages/Patients/Doctors.js": True,
    "pages/Patients/Discharge.js": True,
    "pages/Lab/Lab.js": True,
    "pages/Billing/Billing.js": True,
}

for root, dirs, files in os.walk(base):
    for fname in files:
        if fname.endswith('.js'):
            fpath = os.path.join(root, fname)
            with open(fpath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Remove API import
            if "import API from '../../utils/api'" in content:
                content = content.replace("import API from '../../utils/api';", "")
                content = content.replace("import API from '../../utils/api'", "")
            
            # Fix async save functions - remove API calls
            if "await API.post" in content or "await API.get" in content:
                # Replace try-catch API save with simple local save
                import re
                # Replace: const save = async () => { try { await API... } catch... }
                # With: const save = () => { ... local state update ... }
                content = re.sub(
                    r'const save = async \(\) => \{[\s\S]*?catch\(e\)\{alert\([^)]+\)\}\s*\};',
                    'const save = () => { if(!form[Object.keys(form)[1]]) return; setRecords(prev=>[...prev,{...form}]); setShowModal(false); };',
                    content
                )
                # Remove useEffect API calls
                content = re.sub(
                    r'useEffect\(\(\) => \{[^}]*API\.get[^}]*\}[^}]*\}, \[\]\);',
                    '',
                    content
                )
                
                with open(fpath, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Fixed: {fname}")

print("Done! Now run: npm run deploy")