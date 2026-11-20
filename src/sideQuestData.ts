interface QuestArticle {
  title: string;
  text: string;
}

export interface DesktopQuest {
  slug: string;
  title: string;
  repository: string;
  intro: string;
  summary: string;
  screenshot?: string;
  imageLabel: string;
  caption: string;
  facts: { label: string; value: string }[];
  featuresTitle: string;
  features: QuestArticle[];
  workflowTitle: string;
  steps: QuestArticle[];
  note: string;
}

export const desktopQuests: DesktopQuest[] = [
  {
    slug: 'packrat',
    title: 'PackRat',
    repository: 'https://github.com/overlytiwa/Packrat',
    intro: 'Your games on the go, with room to play',
    summary: 'A portable game launcher that keeps your library on an external drive, stages the game you’re playing on your local SSD, and syncs changes back when you quit.',
    screenshot: '/side-quests/packrat/preview.png',
    imageLabel: 'PackRat Windows app with an Add button, NineSols ready to run, and a Run button',
    caption: 'A compact library, with NineSols ready to run',
    facts: [
      { label: 'Platform', value: 'Windows 10 & 11' },
      { label: 'Built with', value: 'C# · .NET 7 · WinUI 3' },
      { label: 'Storage', value: 'External drive + local SSD' },
      { label: 'License', value: 'MIT / Open source' },
    ],
    featuresTitle: 'Space for your library',
    features: [
      { title: 'Play from the faster drive', text: 'Your library stays on external storage. PackRat copies the selected game to a local workspace before launching it, so the session runs from your internal drive.' },
      { title: 'Bring your progress back', text: 'When the game closes, new and changed files in its staged folder are copied back. Sync adds or updates files without deleting anything from the external drive.' },
      { title: 'Recognize the drive', text: 'External drives are tracked by their volume serial number. A changed drive letter doesn’t break the path to your games.' },
      { title: 'Pick up after an interruption', text: 'If a session is interrupted or a drive disconnects, PackRat keeps the local files and offers recovery when the drive is available again.' },
    ],
    workflowTitle: 'From your drive to your desktop',
    steps: [
      { title: 'Add a game', text: 'Choose the game’s executable on your external drive. PackRat remembers its location and the drive it belongs to.' },
      { title: 'Make room to play', text: 'Select Run. PackRat stages the game files locally and launches the executable from that workspace.' },
      { title: 'Pack it away', text: 'Close the game to sync changes back to the external drive. The temporary local copy is cleaned up after a successful sync.' },
    ],
    note: 'Built for portable games and applications. Sync covers files in the staged game folder; saves stored elsewhere by a game remain outside that folder.',
  },
  {
    slug: 'sourcefield',
    title: 'Sourcefield',
    repository: 'https://github.com/overlytiwa/sourcefield',
    intro: 'Find your way through a codebase',
    summary: 'A desktop tool that turns folders, files and declarations into an interactive 3D map. Follow connections, inspect source, and see how a project fits together.',
    imageLabel: 'Sourcefield typographic cover: Find your way through code',
    caption: 'A desktop tool for exploring the shape of a codebase',
    facts: [
      { label: 'Format', value: 'Desktop application' },
      { label: 'Built with', value: 'TypeScript · Electron · Three.js' },
      { label: 'Analysis', value: 'Local / 11 languages' },
      { label: 'License', value: 'MIT / Open source' },
    ],
    featuresTitle: 'See how the pieces connect',
    features: [
      { title: 'Explore the structure', text: 'Navigate a 3D map of real folders, files and declarations. Labels appear as you move closer, keeping the wider view clear.' },
      { title: 'Follow a connection', text: 'Trace imports, exports, calls, inheritance and references. Select a node to inspect its source location and follow its direct relationships.' },
      { title: 'Bring AI into the map', text: 'A local MCP server lets compatible AI clients search symbols, retrieve source sections, trace dependencies and focus the same visualization.' },
      { title: 'Keep a snapshot', text: 'Export a .sourcefield map to save its layout, relationships and source previews. Reopen or share it even when the original project folder is unavailable.' },
    ],
    workflowTitle: 'From an unfamiliar project to a clearer picture',
    steps: [
      { title: 'Open a folder', text: 'Choose a local project. Sourcefield analyzes its files without running the project’s code or build scripts.' },
      { title: 'Find a starting point', text: 'Search for a familiar file, class or function. Select it to see its location, source preview and incoming or outgoing connections.' },
      { title: 'Follow the thread', text: 'Move through related declarations, filter connection layers, or ask an MCP-connected AI client to help trace the graph.' },
    ],
    note: 'Maps reflect the most recent scan. Rescan after editing source, and check the analysis report for unsupported files or unresolved relationships.',
  },
];

export const sideQuestPages = [
  { slug: 's-remote', title: 'S-Remote' },
  ...desktopQuests,
].map(quest => ({ slug: quest.slug, title: quest.title, path: `/side-quests/${quest.slug}`, cover: `/side-quests/${quest.slug}/cover.svg` }));

export const sideQuestForPath = (path: string) => sideQuestPages.find(quest => quest.path === path);
