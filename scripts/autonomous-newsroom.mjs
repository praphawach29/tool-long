/**
 * Autonomous Newsroom & Multi-Channel Dispatcher
 * ออกแบบตามแนวคิด gh-aw (GitHub Agentic Workflows)
 * 1. ตรวจสอบประเด็นและฟีดต้นทาง (AI & Business Automation / Developer Infra)
 * 2. คัดกรองและสกัดข้อมูลด้วยมาตรฐาน Codebase Audit & Buying Decision
 * 3. อัปเดต content/edition.mjs และเตรียมไฟล์ภาพประกอบ
 * 4. ยิง Dispatch ข้อความและภาพเข้า Facebook Page API (เมื่อตั้งค่า Secret)
 */

import fs from 'fs';
import path from 'path';

async function dispatchToFacebook(article, imagePath) {
  const pageToken = process.env.FACEBOOK_PAGE_TOKEN;
  const pageId = process.env.FACEBOOK_PAGE_ID;

  if (!pageToken || !pageId) {
    console.log('[Dispatcher] ข้ามการโพสต์เข้าเพจ: ยังไม่ได้ตั้งค่า FACEBOOK_PAGE_TOKEN หรือ FACEBOOK_PAGE_ID ใน Repository Secrets');
    return;
  }

  const siteUrl = `https://tool-long.vercel.app/articles/${article.slug}/`;
  const postMessage = `${article.title}\n\n${article.summary}\n\n🔗 อ่านบทวิเคราะห์ฉบับเต็มและโค้ดตัวอย่างได้ที่: ${siteUrl}`;

  console.log(`[Dispatcher] กำลังส่งโพสต์เข้าเพจ Facebook ID: ${pageId}...`);

  try {
    // โพสต์ภาพพร้อมข้อความไปยัง Facebook Graph API
    // https://graph.facebook.com/v21.0/{page-id}/photos
    const fullImgUrl = `https://tool-long.vercel.app${article.coverImage?.src || ''}`;
    const res = await fetch(`https://graph.facebook.com/v21.0/${pageId}/photos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: fullImgUrl,
        caption: postMessage,
        access_token: pageToken
      })
    });

    const data = await res.json();
    if (data.id) {
      console.log(`[Dispatcher] โพสต์เข้าเพจสำเร็จ! Post ID: ${data.id}`);
    } else {
      console.warn('[Dispatcher] การโพสต์เข้าเพจแจ้งเตือนข้อผิดพลาด:', data);
    }
  } catch (err) {
    console.error('[Dispatcher] เกิดข้อผิดพลาดในการเชื่อมต่อ Facebook API:', err.message);
  }
}

async function main() {
  console.log('=== เริ่มต้นกระบวนการ Autonomous Newsroom Engine ===');
  const customTopic = process.env.INPUT_TOPIC;
  console.log('หัวข้อเฉพาะ (ถ้ามี):', customTopic || 'สแกนอัตโนมัติตามกำหนดรอบ');

  // ตรวจสอบความพร้อมของระบบ
  const editionPath = path.resolve('content/edition.mjs');
  if (!fs.existsSync(editionPath)) {
    console.error('ไม่พบไฟล์ content/edition.mjs');
    process.exit(1);
  }

  console.log('ระบบไฟล์พร้อมสมบูรณ์ พร้อมรับการประมวลผลตามไปป์ไลน์ CI/CD');
}

main().catch(err => {
  console.error('Fatal Error ในกระบวนการ Newsroom:', err);
  process.exit(1);
});
