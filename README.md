# Toolลอง · เว็บข่าวฉบับทดลอง

ใช้ Node.js และ npm รัน `npm ci` ตามด้วย `npm run build` เพื่อสร้างเว็บใน `out/` สำหรับทดสอบบนเครื่องใช้ `python -m http.server 3000 --bind 127.0.0.1 --directory out` แล้วเปิด `http://localhost:3000/`

ตั้ง `SITE_URL` เป็นโดเมนเต็มก่อน build หากต้องการกำหนด URL สำหรับภาพแชร์และ canonical เอง เมื่อ build บน Vercel โค้ดจะใช้โดเมน Production (`VERCEL_PROJECT_PRODUCTION_URL`) สำหรับเว็บจริง และใช้ `VERCEL_URL` สำหรับ Preview ค่าเริ่มต้นคือไม่ให้ระบบค้นหาจัดทำดัชนี

บทความนำร่อง: `/articles/ai-meeting-notes-th/` เสียงสังเคราะห์จาก Google Translate มาจากบททดสอบที่เขียนขึ้นเองและไม่มีข้อมูลประชุมจริง หากต้องการทำซ้ำให้รัน `python scripts/transcribe-fixture.py` ด้วย openai-whisper, PyTorch และ FFmpeg
