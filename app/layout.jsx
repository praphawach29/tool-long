import './site.css';

export const metadata = { title:{default:'Toolลอง — ข่าว AI และรีวิวเครื่องมือ',template:'%s | Toolลอง'}, description:'ข่าว AI และรีวิวเครื่องมือสำหรับคนทำงาน', robots:{index:false,follow:false} };

export default function Layout({children}) {
  return <html lang="th"><head><link rel="stylesheet" href="/prototype.css" /></head><body id="top">
    <a className="skip" href="#main">ข้ามไปเนื้อหา</a>
    <header><div className="top"><div className="wrap"><span className="edition">TOOL LONG / TH</span><span>ฉบับทดลอง · 02</span></div></div><div className="mast"><div className="wrap"><a className="brand" href="/" aria-label="Toolลอง หน้าแรก">Tool<span>ลอง</span>.</a><p className="tagline">ข่าว AI และรีวิวเครื่องมือ<br/>สำหรับคนทำงาน</p></div></div></header>
    <nav className="nav" aria-label="เมนูหลัก"><div className="wrap"><a href="/">หน้าแรก</a><a href="/#latest">ข่าวล่าสุด</a><a href="/#reviews">รีวิวและเปรียบเทียบ</a></div></nav>
    <main id="main" className="wrap">{children}</main>
    <footer className="wrap folio"><span>Toolลอง · ฉบับทดลอง</span><a href="/affiliate/">นโยบาย Affiliate</a></footer>
  </body></html>;
}
