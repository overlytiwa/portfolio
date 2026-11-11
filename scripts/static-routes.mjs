import { mkdir, readFile, writeFile } from 'node:fs/promises';
const html = await readFile('dist/index.html', 'utf8');
for (const route of ['about', 'work/lasgidi', 'work/disc-archive', 'work/polaroid', 'work/listening-shelf', 'research', 'research/001', 'side-quests', 'side-quests/s-remote']) {
  await mkdir(`dist/${route}`, { recursive: true });
  await writeFile(`dist/${route}/index.html`, html);
}
await writeFile('dist/404.html', html);
