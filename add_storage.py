import os, re

pages = {
    r"src\pages\Patients\InPatients.js": ("medichain_inpatients", "patientId"),
    r"src\pages\Patients\Appointments.js": ("medichain_appointments", "patientName"),
    r"src\pages\Patients\Doctors.js": ("medichain_doctors", "doctorId"),
    r"src\pages\Patients\Discharge.js": ("medichain_discharge", "patientId"),
    r"src\pages\Lab\Lab.js": ("medichain_lab", "testId"),
    r"src\pages\Billing\Billing.js": ("medichain_billing", "billId"),
    r"src\pages\Pharmacy\Pharmacy.js": ("medichain_pharmacy", "id"),
    r"src\pages\Pharmacy\Inventory.js": ("medichain_inventory", "id"),
    r"src\pages\Diagnostics\Laboratory.js": ("medichain_laboratory", "test_id"),
    r"src\pages\Diagnostics\Radiology.js": ("medichain_radiology", "scan_id"),
    r"src\pages\Diagnostics\BloodBank.js": ("medichain_bloodbank", "unit_id"),
    r"src\pages\Diagnostics\Phlebotomy.js": ("medichain_phlebotomy", "sample_id"),
    r"src\pages\Finance\Billing.js": ("medichain_finance_billing", "bill_id"),
    r"src\pages\Finance\Insurance.js": ("medichain_insurance", "claim_id"),
    r"src\pages\Support\MedicineInventory.js": ("medichain_medicine", "medicine_id"),
    r"src\pages\Support\Ambulance.js": ("medichain_ambulance", "vehicle_no"),
    r"src\pages\Support\Linen.js": ("medichain_linen", "item"),
    r"src\pages\Support\CSSD.js": ("medichain_cssd", "item"),
    r"src\pages\Support\Mortuary.js": ("medichain_mortuary", "body_id"),
    r"src\pages\Support\Feedback.js": ("medichain_feedback", "feedback_id"),
    r"src\pages\Admin\HRManagement.js": ("medichain_hr", "staff_id"),
    r"src\pages\Admin\MRD.js": ("medichain_mrd", "mr_no"),
    r"src\pages\Admin\Security.js": ("medichain_security", "log_id"),
    r"src\pages\OT\OT.js": ("medichain_ot", "ot_no"),
    r"src\pages\Nurse\NurseStation.js": ("medichain_nurse", "patient"),
    r"src\pages\Discharge\Discharge.js": ("medichain_discharge2", "patient_id"),
    r"src\pages\Doctors\Doctors.js": ("medichain_doctors2", "doctor_id"),
}

base = r"C:\Users\nagul\medichain-frontend"
count = 0

for rel_path, (key, _) in pages.items():
    fpath = os.path.join(base, rel_path)
    if not os.path.exists(fpath):
        print(f"Skip (not found): {rel_path}")
        continue
    
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Skip if already has localStorage
    if 'localStorage' in content:
        print(f"Already has storage: {rel_path}")
        continue
    
    # Add useEffect import if not present
    if "useState } from 'react'" in content and 'useEffect' not in content:
        content = content.replace("useState } from 'react'", "useState, useEffect } from 'react'")
    elif "{ useState }" in content and 'useEffect' not in content:
        content = content.replace("{ useState }", "{ useState, useEffect }")
    
    # Add localStorage save after first useState
    storage_code = f"""
  useEffect(() => {{
    try {{ localStorage.setItem('{key}', JSON.stringify(records)); }} catch{{}}
  }}, [records]);
"""
    
    # Find first useState and add initial loader + useEffect
    old = "const [records, setRecords] = useState("
    if old in content:
        # Change useState to load from localStorage
        content = re.sub(
            r'const \[records, setRecords\] = useState\((\[[\s\S]*?\])\);',
            f'const [records, setRecords] = useState(() => {{ try {{ const s = localStorage.getItem(\'{key}\'); return s ? JSON.parse(s) : \\1; }} catch {{ return \\1; }} }});',
            content,
            count=1
        )
        # Add useEffect after useState line
        content = content.replace(
            "  const [search, setSearch]",
            storage_code + "  const [search, setSearch]",
            1
        )
        
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✅ Added storage: {rel_path}")
        count += 1
    else:
        print(f"Pattern not found: {rel_path}")

print(f"\nDone! {count} files updated.")
print("Now run: npm run deploy")