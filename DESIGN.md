# ระบบดีไซน์ Toolลอง (Tool Long Design System)

เอกสารมาตรฐานการออกแบบส่วนต่อประสานผู้ใช้ (UI/UX) และระบบอัตลักษณ์ของเว็บไซต์ **Toolลอง** (https://tool-long.vercel.app/)

---

## 1. ปรัชญาการออกแบบ (Design Philosophy)
- **Modern AI & SaaS Editorial:** ผสานความเป็นสื่อไอทีระดับมืออาชีพเข้ากับความโมเดิร์นแบบเว็บผลิตภัณฑ์ซอฟต์แวร์ยุคใหม่ (เช่น Linear, Vercel, TechCrunch)
- **High Readability (อ่านสบายตา):** ใช้เฉดสีขาวออฟไวท์ (Slate 50) คอนทราสต์สูงกับตัวหนังสือสีเทาเข้ม (Slate 900) ป้องกันอาการล้าสายตา
- **Clarity & Transparency (ชัดเจน โปร่งใส):** มี Badge หมวดหมู่ แหล่งที่มาต้นฉบับ และป้ายกำกับบทความทดสอบจริงอย่างชัดเจน

---

## 2. ระบบสี (Color Palette)

### พื้นหลังและพื้นผิว (Surfaces)
- **Page Background:** \#F8FAFC\ (Slate 50) — พื้นหลังหน้าเว็บสะอาด สบายตา สไตล์โมเดิร์นเทค
- **Surface / Card Background:** \#FFFFFF\ (White) — พื้นหลังการ์ดบทความและกล่องเนื้อหา
- **Surface Hover / Muted:** \#F1F5F9\ (Slate 100) — สีพื้นหลังชิป แท็บ และพื้นที่รอง
- **Dark Surface:** \#0F172A\ (Slate 900) — สีส่วนหัวย่อย ท็อปบาร์ และฟุตเตอร์

### ตัวอักษรและข้อความ (Typography Colors)
- **Primary Text:** \#0F172A\ (Slate 900) — พาดหัวและข้อความหลัก คมชัดสูง
- **Secondary Text:** \#475569\ (Slate 600) — เนื้อความย่อ บทสรุป และรายละเอียด
- **Muted Text:** \#94A3B8\ (Slate 400) — วันที่ เวลาอ่าน และ Metadata เล็ก
- **Inverse Text:** \#F8FAFC\ (Slate 50) — ตัวหนังสือบนพื้นหลังเข้ม

### สีอัตลักษณ์และไฮไลต์ (Brand & Accents)
- **Brand Primary:** \#2563EB\ (Tech Blue 600) — สีแบรนด์หลัก ให้ความน่าเชื่อถือและแอคทีฟ
- **Brand Gradient:** \linear-gradient(135deg, #2563EB 0%, #06B6D4 100%)\ — การไล่สีเทคโนโลยีสดใส
- **Border Subtle:** \#E2E8F0\ (Slate 200) — เส้นขอบการ์ดบาง 1px ให้มิติเรียบหรู
- **Border Elevated:** \#CBD5E1\ (Slate 300) — เส้นขอบเมื่อเมาส์ชี้ (Hover)

### สีประจำหมวดหมู่ (Category Accents)
- **ข่าว AI:**
  - Background: \#EEF2FF\ (Indigo 50)
  - Text: \#4F46E5\ (Indigo 600)
  - Border: \#C7D2FE\ (Indigo 200)
- **ซอฟต์แวร์ & SaaS:**
  - Background: \#F0F9FF\ (Sky 50)
  - Text: \#0284C7\ (Sky 600)
  - Border: \#BAE6FD\ (Sky 200)
- **รีวิว & เปรียบเทียบ:**
  - Background: \#ECFDF5\ (Emerald 50)
  - Text: \#059669\ (Emerald 600)
  - Border: \#A7F3D0\ (Emerald 200)

---

## 3. ระบบตัวอักษร (Typography)

### ลำดับฟอนต์ (Font Family Stack)
- **ภาษาไทยและข้อความทั่วไป:**
  'Sarabun', 'Prompt', 'Sukhumvit Set', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif- **ตัวเลขและข้อความละติน (Numbers / English):**
  'Inter', 'Plus Jakarta Sans', system-ui, sans-serif- **โค้ดและข้อมูลเทคนิค (Monospace):**
  'Geist Mono', 'JetBrains Mono', 'Fira Code', Consolas, monospace
### ขนาดและน้ำหนัก (Scale & Weight)
- **Brand Logo:** 26px / 800 Bold / Letter-spacing -0.03em
- **Hero Title:** clamp(26px, 3.5vw, 36px) / 800 ExtraBold / Line-height 1.25
- **Section Heading:** 22px / 700 Bold / Line-height 1.35
- **Card Title:** 18px / 600 SemiBold / Line-height 1.45
- **Body Copy:** 16px / 400 Regular / Line-height 1.75
- **Category Badge:** 12px / 600 SemiBold / Uppercase / Tracking 0.05em

---

## 4. โครงสร้างคอมโพเนนต์หลัก (Component Hierarchy)

### 1. Sticky Navigation Bar
- กระจกฝ้าเบลอพื้นหลัง (\ackdrop-filter: blur(16px); background: rgba(255,255,255,0.9)\)
- โลโก้ **Toolลอง.** ด้านซ้าย
- แถบเมนูแบ่งหมวดหมู่ตรงกลาง (\หน้าแรก\, \ข่าว AI\, \ซอฟต์แวร์ & SaaS\, \รีวิว & เปรียบเทียบ\)
- ป้ายสถานะระบบด้านขวา เช่น \● LIVE / อัปเดตล่าสุด
### 2. Interactive Category Tabs (หน้าแรก)
- แถบแคปซูลฟิลเตอร์ (\Pill Tabs\) ให้คลิกเลือกดูข่าวเฉพาะหมวดได้ทันทีในหน้าแรก

### 3. Bento Grid Hero Section
- การ์ดเรื่องเด่นหลักขนาดใหญ่ (Hero Story) ขนาบด้วยการ์ดเรื่องน่าสนใจด้านข้าง
- ภาพประกอบแบบ 16:9 มุมโค้งมน 16px พร้อมเอฟเฟกต์ซูมเนียนเมื่อวางเมาส์

### 4. Article Grid Cards
- การ์ดขอบมน 16px พร้อมเงาฟุ้งแบบบาง (\ox-shadow: 0 1px 3px rgba(0,0,0,0.05), 0 10px 15px -5px rgba(0,0,0,0.02)\)
- มีป้าย Badge หมวดหมู่, เวลาที่ใช้อ่าน (\อ่าน 3 นาที\), วันที่ และป้ายกำกับแหล่งที่มา

### 5. Article Detail Page (\/articles/[slug]\)
- หน้าอ่านบทความความกว้างสูงสุด 740px จัดระเบียบให้อ่านง่าย
- Breadcrumb นำทางกลับหน้าแรก
- กล่องเน้นข้อความสรุป ตารางเปรียบเทียบ และส่วนอ้างอิงแหล่งข่าวต้นทาง
