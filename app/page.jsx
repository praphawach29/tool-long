import { articleTitle, articleSummary, articlePath } from '../content/pilot.mjs';
import { edition, pathFor } from '../content/edition.mjs';

const [feature, review, ...news] = edition;

function StoryLink({entry}) {
  return <article className="story"><span className="kicker">{entry.category}</span><h3><a href={pathFor(entry.slug)}>{entry.title}</a></h3><p>{entry.summary}</p></article>;
}

export default function Home() {
  return <><section className="feature" aria-label="เรื่องเด่น"><article className="hero">
    <div className="kicker">01 / เรื่องเด่น · {feature.category}</div>
    <h1 className="headline">{feature.title}</h1><p className="lede">{feature.summary}</p>
    <a className="cover" href={pathFor(feature.slug)}><img src={`/edition-${feature.art}.svg`} width="820" height="345" alt={feature.alt} fetchPriority="high" /></a>
    <div className="under"><span className="issue">ทดสอบด้วยเสียงจำลอง</span><a href={pathFor(feature.slug)}>อ่านผลเปรียบเทียบ ↗</a></div>
  </article><aside aria-labelledby="rail-title"><h2 id="rail-title" className="rail-title">เรื่องน่าอ่าน</h2><ol className="rail">
    {[...news,review].map(entry=><li key={entry.slug}><div><a href={pathFor(entry.slug)}>{entry.title}</a><small>{entry.category}</small></div></li>)}
  </ol></aside></section>
  <section className="feed" id="latest"><div className="feed-head"><div><div className="kicker">02 / ข่าวล่าสุด</div><h2>ข่าว AI และซอฟต์แวร์</h2></div></div><div className="stories edition-grid">{news.map(entry=><StoryLink key={entry.slug} entry={entry}/>)}</div></section>
  <section className="feed" id="reviews"><div className="feed-head"><div><div className="kicker">03 / จากการทดสอบ</div><h2>รีวิวและเปรียบเทียบ</h2></div></div><div className="stories edition-grid"><StoryLink entry={review}/><StoryLink entry={feature}/><article className="story"><span className="kicker">บทความนำร่อง</span><h3><a href={articlePath}>{articleTitle}</a></h3><p>{articleSummary}</p></article></div></section></>;
}
