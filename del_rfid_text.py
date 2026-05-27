import os

fpath = r"C:\Users\nagul\medichain-frontend\src\pages\RFID\RFIDModule.js"

with open(fpath, 'r', encoding='utf-8') as f:
    content = f.read()

remove = "Hardware connect cheyyataniki: 1. RC522 module \u2192 Arduino Mega (SDA:53, SCK:52, MOSI:51, MISO:50, RST:5, 3.3V, GND) 2. Arduino \u2192 USB cable \u2192 PC 3. Backend .env lo: RFID_PORT=COM3 (Device Manager lo check cheyyandi) 4. node server.js restart cheyyandi \u2014 auto connect avutundi \u2705"

content = content.replace(remove, "Hardware vasthaka auto-connect avutundi")

with open(fpath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Done!")