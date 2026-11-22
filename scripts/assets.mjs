import {mkdir, readFile, writeFile} from 'node:fs/promises';
import sharp from 'sharp';
import {fileURLToPath} from 'node:url';
import {edition} from '../content/edition.mjs';
import {coverFor} from './editorial-art.mjs';

const publicDir = new URL('../public/', import.meta.url);
const original = await readFile(new URL('../design-prototype.html', import.meta.url), 'utf8');
const cover = original.match(/<svg\b[\s\S]*?<\/svg>/)?.[0];
const stylesheet = original.match(/<style>([\s\S]*?)<\/style>/)?.[1];
if (!cover || !stylesheet) throw new Error('Missing editorial artwork or stylesheet');
await mkdir(publicDir, {recursive:true});
await writeFile(new URL('meeting-cover.svg', publicDir), cover);
await sharp(Buffer.from(cover)).resize(1200,630,{fit:'cover'}).png().toFile(fileURLToPath(new URL('meeting-share.png',publicDir)));
await writeFile(new URL('prototype.css',publicDir), stylesheet);
await Promise.all(edition.map(async ({art, coverImage}) => {
  const image = coverImage ? await readFile(new URL(coverImage.src.slice(1),publicDir)) : Buffer.from(coverFor(art));
  if (!coverImage) await writeFile(new URL(`edition-${art}.svg`,publicDir), image);
  await sharp(image).resize(1200,630,{fit:'cover'}).png().toFile(fileURLToPath(new URL(`edition-${art}-share.png`,publicDir)));
}));
