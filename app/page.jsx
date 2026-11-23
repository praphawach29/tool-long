import { articleTitle, articleSummary, articlePath } from '../content/pilot.mjs';
import { edition, pathFor } from '../content/edition.mjs';

function badgeClassFor(category) {
  if (!category) return 'badge badge-default';
  if (category.includes('AI')) return 'badge badge-ai';
  if (category.includes('ซอฟต์แวร์') || category.includes('SaaS')) return 'badge badge-sw';
  if (category.includes('รีวิว')) return 'badge badge-rev';
  if (category.includes('เปรียบเทียบ')) return 'badge badge-comp';
  return 'badge badge-default';
}

function ArticleCard({ entry }) {
  const thumb = entry.coverImage?.src || `/edition-${entry.art}.svg`;
  return (
    <article className="card">
      <a href={pathFor(entry.slug)} className="card-thumb" aria-label={entry.title}>
        <img src={thumb} alt={entry.alt} loading="lazy" decoding="async" />
      </a>
      <div className="card-body">
        <div className="card-meta-top">
          <span className={badgeClassFor(entry.category)}>{entry.category}</span>
          <span className="read-time">⏱ อ่าน ~3 นาที</span>
        </div>
        <h3 className="card-title">
          <a href={pathFor(entry.slug)}>{entry.title}</a>
        </h3>
        <p className="card-excerpt">{entry.summary}</p>
        <div className="card-footer">
          <span className="card-source">ตรวจจากต้นทางแล้ว</span>
          <a href={pathFor(entry.slug)} className="btn-read-more">
            อ่านต่อ →
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  const feature = edition[0];
  const zapyso = edition.find(e => e.slug === 'zapyso-offline-meeting-notes') || edition[1];
  const gimp = edition.find(e => e.slug === 'gimp-ui-tests') || edition[2];

  const aiNews = edition.filter(e => e.category.includes('AI') && e.slug !== feature.slug);
  const softwareNews = edition.filter(e => (e.category.includes('ซอฟต์แวร์') || e.category.includes('SaaS')) && e.slug !== feature.slug);
  const reviewStories = edition.filter(e => (e.category.includes('รีวิว') || e.category.includes('เปรียบเทียบ')) && e.slug !== feature.slug);

  const featureThumb = feature.coverImage?.src || `/edition-${feature.art}.svg`;

  return (
    <>
      {/* Hero Bento Section */}
      <section className="hero-section" aria-label="เรื่องเด่นประจำฉบับ">
        <div className="container">
          <div className="bento-grid">
            {/* Main Featured Hero Card */}
            <article className="hero-card-main">
              <a href={pathFor(feature.slug)} className="hero-image-wrap" aria-label={feature.title}>
                <img
                  src={featureThumb}
                  alt={feature.alt}
                  fetchPriority="high"
                />
              </a>
              <div className="hero-content">
                <div className="hero-meta-top">
                  <span className={badgeClassFor(feature.category)}>⭐ เรื่องเด่น · {feature.category}</span>
                  <span className="read-time">⏱ อ่าน ~3-4 นาที</span>
                </div>
                <h1 className="hero-title">
                  <a href={pathFor(feature.slug)}>{feature.title}</a>
                </h1>
                <p className="hero-summary">{feature.summary}</p>
                <div className="hero-footer">
                  <span className="hero-author">โดย ทีมบรรณาธิการ Toolลอง</span>
                  <a href={pathFor(feature.slug)} className="btn-read-more">
                    อ่านเนื้อหาเต็ม ↗
                  </a>
                </div>
              </div>
            </article>

            {/* Side Bento Rail */}
            <div className="bento-rail">
              <article className="rail-card">
                <div>
                  <span className={badgeClassFor(zapyso.category)}>{zapyso.category}</span>
                  <h3 className="rail-title">
                    <a href={pathFor(zapyso.slug)}>{zapyso.title}</a>
                  </h3>
                  <p className="rail-summary">{zapyso.summary}</p>
                </div>
                <div className="rail-footer">
                  <span>รองรับ macOS / Local AI</span>
                  <a href={pathFor(zapyso.slug)} className="btn-read-more">อ่านสรุป →</a>
                </div>
              </article>

              <article className="rail-card">
                <div>
                  <span className={badgeClassFor(gimp.category)}>{gimp.category}</span>
                  <h3 className="rail-title">
                    <a href={pathFor(gimp.slug)}>{gimp.title}</a>
                  </h3>
                  <p className="rail-summary">{gimp.summary}</p>
                </div>
                <div className="rail-footer">
                  <span>โอเพนซอร์ส / เครื่องมือทำงาน</span>
                  <a href={pathFor(gimp.slug)} className="btn-read-more">อ่านข่าว →</a>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Category Section: ข่าว AI */}
      <section className="section-block" id="category-ai">
        <div className="container">
          <div className="section-header">
            <div className="section-title-wrap">
              <span className="section-icon">🤖</span>
              <h2 className="section-heading">ข่าว AI และโมเดลล่าสุด</h2>
            </div>
            <span className="section-badge-desc">อัปเดตโมเดล Agent และฟีเจอร์ AI ใหม่</span>
          </div>
          <div className="article-grid">
            {aiNews.map((entry) => (
              <ArticleCard key={entry.slug} entry={entry} />
            ))}
          </div>
        </div>
      </section>

      {/* Category Section: ซอฟต์แวร์ & SaaS */}
      <section className="section-block" id="category-software">
        <div className="container">
          <div className="section-header">
            <div className="section-title-wrap">
              <span className="section-icon">💻</span>
              <h2 className="section-heading">ซอฟต์แวร์ &amp; เครื่องมือ SaaS</h2>
            </div>
            <span className="section-badge-desc">โปรแกรมทำงาน ออฟฟิศ และระบบคลาวด์</span>
          </div>
          <div className="article-grid">
            {softwareNews.map((entry) => (
              <ArticleCard key={entry.slug} entry={entry} />
            ))}
          </div>
        </div>
      </section>

      {/* Category Section: รีวิวและผลการทดสอบ */}
      <section className="section-block" id="category-reviews">
        <div className="container">
          <div className="section-header">
            <div className="section-title-wrap">
              <span className="section-icon">🧪</span>
              <h2 className="section-heading">รีวิว &amp; ผลทดสอบใช้งานจริง</h2>
            </div>
            <span className="section-badge-desc">ทดสอบความแม่นยำภาษาไทยและข้อจำกัด</span>
          </div>
          <div className="article-grid">
            {reviewStories.map((entry) => (
              <ArticleCard key={entry.slug} entry={entry} />
            ))}
            <article className="card">
              <a href={articlePath} className="card-thumb" aria-label={articleTitle}>
                <img src="/meeting-share.png" alt="ภาพประกอบคลิปประชุมภาษาไทย" loading="lazy" decoding="async" />
              </a>
              <div className="card-body">
                <div className="card-meta-top">
                  <span className="badge badge-comp">บทความนำร่อง</span>
                  <span className="read-time">⏱ เสียงประชุมจริง</span>
                </div>
                <h3 className="card-title">
                  <a href={articlePath}>{articleTitle}</a>
                </h3>
                <p className="card-excerpt">{articleSummary}</p>
                <div className="card-footer">
                  <span className="card-source">มีคลิปเสียงให้ฟัง</span>
                  <a href={articlePath} className="btn-read-more">อ่านผลทดสอบ →</a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
