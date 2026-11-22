import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import { articleTitle, articleSummary, articlePath } from '../../../content/pilot.mjs';
import trial from '../../../content/trial.json';
import { siteOrigin as origin } from '../../../content/site-origin.mjs';

const image = new URL('/meeting-share.png', origin || 'http://localhost:3000').href;
const audioSource = process.env.INLINE_PREVIEW_AUDIO === '1' && trial.audio
  ? `data:audio/mpeg;base64,${readFileSync(resolve('public/meeting-fixture.mp3')).toString('base64')}`
  : '/meeting-fixture.mp3';
export const metadata = {
  title:articleTitle, description:articleSummary,
  ...(origin ? {alternates:{canonical:new URL(articlePath,origin).href}} : {}),
  openGraph:{type:'article',locale:'th_TH',siteName:'Toolลอง',title:articleTitle,description:articleSummary,images:[{url:image,width:1200,height:630,alt:'ภาพประกอบเครื่องบันทึกเสียงโทนเขียวเข้ม'}]},
  twitter:{card:'summary_large_image',title:articleTitle,description:articleSummary,images:[image]},
};

export default function Pilot() {
  return <article className="read"><a className="site-link" href="/">← กลับหน้าแรก</a><p className="kicker">ทดลองใช้จริง / บทความนำร่อง</p>
    <h1 className="headline">{articleTitle}</h1><p className="lede">{articleSummary}</p>
    <div className="cover"><img src="/meeting-cover.svg" width="820" height="345" alt="เครื่องบันทึกเสียงมีรูปคลื่นเสียงบนจอ" fetchPriority="high" /></div>
    <p className="trial-note">{trial.verdict}</p>
    <h2 id="method">ทดสอบอย่างไร</h2><p>{trial.method}</p>
    {trial.audio && <><audio controls preload="none" src={audioSource} aria-label="เสียงประชุมจำลอง"/><p className="caption">เสียงสังเคราะห์จากบทที่เขียนขึ้นเพื่อทดสอบเท่านั้น</p></>}
    <details><summary>อ่านบทพูดต้นฉบับและผลถอดเสียง</summary><p><strong>ต้นฉบับ:</strong> {trial.reference}</p><p><strong>ผลถอดเสียง:</strong> {trial.transcript || 'ยังไม่มีผลที่ยืนยันได้'}</p></details>
    <h2 id="results">ชื่อคน มติ และงานต่อ</h2>
    <table><thead><tr><th scope="col">จุดตรวจ</th><th scope="col">สิ่งที่พบ</th></tr></thead><tbody>{trial.rows.map(([label,result])=><tr key={label}><th scope="row">{label}</th><td>{result}</td></tr>)}</tbody></table>
    <p className="caption">{trial.limitations}</p>
    <h2 id="checklist">เช็กก่อนส่งสรุปให้ทีม</h2><ol><li>ทวนชื่อผู้พูดและชื่อคนรับงานกับรายชื่อผู้เข้าประชุม</li><li>แยกข้อเสนอออกจากมติที่ตกลงจริง</li><li>ตรวจเจ้าของงานและกำหนดส่งกับเสียงต้นฉบับ หากไม่ชัดให้ระบุว่ารอยืนยัน</li></ol>
  </article>;
}
