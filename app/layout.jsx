import './site.css';

export const metadata = {
  title: {
    default: 'Toolลอง — ข่าว AI และรีวิวเครื่องมือซอฟต์แวร์',
    template: '%s | Toolลอง'
  },
  description: 'เจาะลึกข่าว AI ซอฟต์แวร์ SaaS และรีวิวเครื่องมือทำงานจริงสำหรับคนไทย',
  robots: { index: false, follow: false }
};

export default function Layout({ children }) {
  return (
    <html lang="th">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Sarabun:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body id="top">
        <a className="skip" href="#main">ข้ามไปเนื้อหา</a>
        
        {/* Top Notification Bar */}
        <div className="top-banner">
          <div className="container banner-content">
            <div className="banner-left">
              <span className="live-pill">
                <span className="live-dot" /> LIVE
              </span>
              <span className="banner-text">ฉบับทดลอง · รายงานเทคโนโลยี AI &amp; SaaS 2026</span>
            </div>
            <div className="banner-right">
              <a href="/affiliate/" className="banner-link">นโยบายความโปร่งใส ↗</a>
            </div>
          </div>
        </div>

        {/* Sticky Header */}
        <header className="site-header">
          <div className="container header-inner">
            <div className="header-brand">
              <a href="/" className="brand-logo" aria-label="Toolลอง หน้าแรก">
                Tool<span className="brand-accent">ลอง</span><span className="brand-dot">.</span>
              </a>
              <span className="brand-badge">TECH &amp; AI</span>
            </div>

            <nav className="header-nav" aria-label="เมนูหลัก">
              <a href="/" className="nav-item">หน้าแรก</a>
              <a href="/#category-ai" className="nav-item">🤖 ข่าว AI</a>
              <a href="/#category-software" className="nav-item">💻 ซอฟต์แวร์ &amp; SaaS</a>
              <a href="/#category-reviews" className="nav-item">🧪 รีวิว &amp; เปรียบเทียบ</a>
            </nav>

            <div className="header-actions">
              <a href="/affiliate/" className="nav-cta">นโยบาย Affiliate</a>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main id="main">
          {children}
        </main>

        {/* Footer */}
        <footer className="site-footer">
          <div className="container footer-inner">
            <div className="footer-col-main">
              <a href="/" className="footer-logo">
                Tool<span className="brand-accent">ลอง</span><span className="brand-dot">.</span>
              </a>
              <p className="footer-desc">
                เกาะติดความเคลื่อนไหวเครื่องมือ AI, ซอฟต์แวร์ SaaS และการทดสอบใช้งานจริง เพื่อให้คนทำงานไทยนำไปใช้ได้คุ้มค่าที่สุด
              </p>
            </div>
            <div className="footer-col-links">
              <h4>หมวดหมู่เนื้อหา</h4>
              <ul>
                <li><a href="/#category-ai">ข่าวและโมเดล AI</a></li>
                <li><a href="/#category-software">ซอฟต์แวร์และเครื่องมือ SaaS</a></li>
                <li><a href="/#category-reviews">รีวิวและผลการทดลองจริง</a></li>
              </ul>
            </div>
            <div className="footer-col-links">
              <h4>เกี่ยวกับเรา</h4>
              <ul>
                <li><a href="/affiliate/">นโยบาย Affiliate &amp; ความโปร่งใส</a></li>
                <li><a href="https://github.com/praphawach29/tool-long" target="_blank" rel="noopener noreferrer">GitHub Repository</a></li>
              </ul>
            </div>
          </div>
          <div className="container footer-bottom">
            <span>© 2026 Toolลอง. สงวนลิขสิทธิ์ · จัดทำขึ้นเพื่อการทดสอบเนื้อหาเทคโนโลยี</span>
            <span className="footer-built">สร้างด้วย Next.js &amp; Vercel</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
