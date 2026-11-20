import { mkdir, readFile, writeFile } from 'node:fs/promises';
const html = await readFile('dist/index.html', 'utf8');
for (const route of ['about', 'work/derazee', 'work/lasgidi', 'work/disc-archive', 'work/polaroid', 'work/listening-shelf', 'research', 'research/001', 'side-quests', 'side-quests/s-remote', 'side-quests/packrat', 'side-quests/sourcefield']) {
  await mkdir(`dist/${route}`, { recursive: true });
  await writeFile(`dist/${route}/index.html`, html);
}
await writeFile('dist/404.html', html);
