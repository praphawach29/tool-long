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
  return {title, description:summary, alternates:{canonical:url}, openGraph:{type:'article',locale:'th_TH',siteName:'Toolลอง',url,title,description:summary,images:[{url:image,width:1200,height:630,alt}]}, twitter:{card:'summary_large_image',title,description:summary,images:[image]}, ...(announcedOn ? {other:{'news-source-date':announcedOn}} : {})};
}

export default async function EditionArticle({params}) {
  const story = await findStory(params);
  const cover = story.coverImage ?? {src:`/edition-${story.art}.svg`,width:820,height:345};
  const coverMarkup = <div className="cover"><img {...cover} alt={story.alt} fetchPriority="high" /></div>;
  return <article className="read"><a className="site-link" href="/">← กลับหน้าแรก</a><p className="kicker">{story.category} / ฉบับ 02</p>
    <h1 className="headline">{story.title}</h1><p className="lede">{story.summary}</p>
    {story.coverCaption ? <figure className="article-cover">{coverMarkup}<figcaption className="caption">{story.coverCaption}</figcaption></figure> : coverMarkup}
    {story.intro && <p>{story.intro}</p>}
    {story.sections.map(([title,copy,illustration])=><section key={title}><h2>{title}</h2><p>{copy}</p>{illustration && <figure className="article-cover"><div className="cover"><img src={illustration.src} width={illustration.width} height={illustration.height} alt={illustration.alt} loading="lazy" decoding="async" /></div><figcaption className="caption"><a href={illustration.href}>{illustration.credit}</a>{illustration.license && <> · <a href={illustration.license.href}>{illustration.license.label}</a></>} · ไม่ใช่ผลทดสอบของ Toolลอง</figcaption></figure>}</section>)}
    {story.results && <section><h2>อ่านผลถอดเสียงดิบ</h2><p><b>บทต้นฉบับ:</b> {trial.reference}</p><dl className="transcripts">{story.results.map(([label,model,input])=><div key={label}><dt>{label}</dt><dd>{fixture[model][input]}</dd></div>)}</dl><p><a href={articlePath}>ฟังคลิปต้นฉบับจากบทความนำร่อง</a></p></section>}
    <section><h2>แหล่งอ้างอิง</h2><ul>{story.sources.map(([label,href])=><li key={href}><a href={href}>{label}</a></li>)}</ul>{story.sourceNote && <p className="caption">{story.sourceNote}</p>}</section>
    <p className="caption">ลิงก์อ้างอิงในบทความนี้ไม่ใช่ลิงก์ Affiliate · <a href="/affiliate/">นโยบาย Affiliate</a></p>
  </article>;
}
