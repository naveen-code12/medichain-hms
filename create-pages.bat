@echo off
echo Creating remaining page stubs...
for %%f in (
  "src\pages\Patients\Patients.js"
  "src\pages\Patients\InPatients.js"
  "src\pages\Patients\Appointments.js"
  "src\pages\Patients\Doctors.js"
  "src\pages\Patients\Discharge.js"
  "src\pages\Lab\Lab.js"
  "src\pages\Billing\Billing.js"
  "src\pages\Pharmacy\Pharmacy.js"
  "src\pages\Pharmacy\Inventory.js"
  "src\pages\Beds\Beds.js"
  "src\pages\History\History.js"
  "src\pages\Reports\Reports.js"
) do (
  echo export default function Page(){return <div><h2>Loading...</h2></div>} > %%f
)
echo Done!