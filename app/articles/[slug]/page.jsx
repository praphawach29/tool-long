import { notFound } from 'next/navigation';
import { edition, pathFor } from '../../../content/edition.mjs';
import fixture from '../../../content/fixture-tests.json';
import trial from '../../../content/trial.json';
import { articlePath } from '../../../content/pilot.mjs';
import { siteOrigin } from '../../../content/site-origin.mjs';

const origin = siteOrigin || 'http://localhost:3000';
export const dynamicParams = false;
export const generateStaticParams = () => edition.map(({slug}) => ({slug}));

async function findStory(params) {
  const {slug} = await params;
  const story = edition.find(entry => entry.slug === slug);
  if (!story) notFound();
  return story;
}

export async function generateMetadata({params}) {
  const {slug,title,summary,art,alt,announcedOn} = await findStory(params);
  const image = new URL(`/edition-${art}-share.png`,origin).href;
  const url = new URL(pathFor(slug),origin).href;
  return {
    title,
    description:summary,
    alternates:{canonical:url},
    openGraph:{
      type:'article',
      locale:'th_TH',
      siteName:'Toolลอง',
      url,
      title,
      description:summary,
      images:[{url:image,width:1200,height:630,alt}]
    },
    twitter:{
      card:'summary_large_image',
      title,
      description:summary,
      images:[image]
    },
    ...(announcedOn ? {other:{'news-source-date':announcedOn}} : {})
  };
}

function badgeClassFor(category) {
  if (!category) return 'badge badge-default';
  if (category.includes('AI')) return 'badge badge-ai';
  if (category.includes('ซอฟต์แวร์') || category.includes('SaaS')) return 'badge badge-sw';
  if (category.includes('รีวิว')) return 'badge badge-rev';
  if (category.includes('เปรียบเทียบ')) return 'badge badge-comp';
  return 'badge badge-default';
}

export default async function EditionArticle({params}) {
  const story = await findStory(params);
  const cover = story.coverImage ?? {src:`/edition-${story.art}.svg`,width:820,height:345};
  const coverMarkup = (
    <div className="cover">
      <img {...cover} alt={story.alt} fetchPriority="high" />
    </div>
  );

  return (
    <article className="read">
      <nav className="breadcrumb" aria-label="เส้นทางนำทาง">
        <a href="/">หน้าแรก</a>
        <span>/</span>
        <span>{story.category}</span>
        <span>/</span>
        <span style={{ color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '300px' }}>
          {story.title}
        </span>
      </nav>

      <div className="article-badge-row">
        <span className={badgeClassFor(story.category)}>{story.category}</span>
        <span className="read-time">⏱ อ่านประมาณ 3-4 นาที</span>
      </div>

      <h1 className="headline">{story.title}</h1>
      <p className="lede">{story.summary}</p>

      {story.coverCaption ? (
        <figure className="article-cover">
          {coverMarkup}
          <figcaption className="caption">{story.coverCaption}</figcaption>
        </figure>
      ) : (
        <div className="article-cover">{coverMarkup}</div>
      )}

      {story.intro && <p>{story.intro}</p>}

      {story.sections.map(([title, copy, illustration]) => (
        <section key={title}>
          <h2>{title}</h2>
          <p>{copy}</p>
          {illustration && (
            <figure className="article-cover">
              <div className="cover">
                <img
                  src={illustration.src}
                  width={illustration.width}
                  height={illustration.height}
                  alt={illustration.alt}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <figcaption className="caption">
                <a href={illustration.href} target="_blank" rel="noopener noreferrer">
                  {illustration.credit}
                </a>
                {illustration.license && (
                  <>
                    {' · '}
                    <a href={illustration.license.href} target="_blank" rel="noopener noreferrer">
                      {illustration.license.label}
                    </a>
                  </>
                )}
                {' · ไม่ใช่ผลทดสอบของ Toolลอง'}
              </figcaption>
            </figure>
          )}
        </section>
      ))}

      {story.results && (
        <section>
          <h2>อ่านผลถอดเสียงดิบ</h2>
          <p><b>บทต้นฉบับ:</b> {trial.reference}</p>
          <dl className="transcripts">
            {story.results.map(([label, model, input]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{fixture[model][input]}</dd>
              </div>
            ))}
          </dl>
          <p>
            <a href={articlePath}>ฟังคลิปต้นฉบับจากบทความนำร่อง ↗</a>
          </p>
        </section>
      )}

      <section>
        <h2>แหล่งข้อมูลอ้างอิง</h2>
        <ul>
          {story.sources.map(([label, href]) => (
            <li key={href}>
              <a href={href} target="_blank" rel="noopener noreferrer">
                {label} ↗
              </a>
            </li>
          ))}
        </ul>
        {story.sourceNote && <p className="caption">{story.sourceNote}</p>}
      </section>

      <div className="affiliate-disclaimer">
        🛡 <b>คำชี้แจงความโปร่งใส:</b> ข้อมูลในบทความนี้สรุปและวิเคราะห์จากเอกสารทางการของผู้พัฒนาโดยตรง ลิงก์อ้างอิงภายนอกไม่ใช่ลิงก์รับค่าคอมมิชชัน ·{' '}
        <a href="/affiliate/">อ่านนโยบาย Affiliate ของ Toolลอง</a>
      </div>
    </article>
  );
}
