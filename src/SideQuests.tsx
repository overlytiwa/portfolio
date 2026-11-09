import { CardGallery, type GalleryItem } from './Work';
import { ImageSlot } from './components';
import { RouteLink } from './navigation';
import { Reveal } from './motion';
import './side-quests.css';

export const sideQuestsPath = '/side-quests';
export const sRemotePath = '/side-quests/s-remote';
const repository = 'https://github.com/overlytiwa/s-remote';
const screenshot = '/side-quests/s-remote/preview.png';
const quests: GalleryItem[] = [{ href: sRemotePath, title: 'S-Remote', coverImage: '/side-quests/s-remote/cover.svg' }];

export function SideQuests() {
  return <CardGallery items={quests} heading="Side Quests — small experiments by Tiwalope" label="Side Quests" className="side-quests-gallery" />;
}

export function SRemoteProject() {
  return <main tabIndex={-1} className="s-remote-page">
    <section className="s-remote-hero">
      <div className="project-info">
        <Reveal as="h1">S-Remote</Reveal>
        <p className="s-remote-intro">A Samsung TV remote, right on your Windows desktop</p>
        <p className="s-remote-summary">A compact desktop app that puts navigation, volume and playback within reach while you’re at your computer.</p>
        <div className="s-remote-links"><a href={repository} target="_blank" rel="noopener noreferrer">View on GitHub</a><a href={screenshot} target="_blank" rel="noopener noreferrer">View full screenshot</a></div>
        <RouteLink href={sideQuestsPath} className="s-remote-back">All Side Quests</RouteLink>
      </div>
      <figure className="s-remote-preview">
        <ImageSlot src={screenshot} label="S-Remote Windows app with TV selector, directional pad, volume, playback, back and home controls" className="project-hero-image" eager />
        <figcaption>The desktop app, connected to a living room TV</figcaption>
      </figure>
    </section>

    <dl className="s-remote-facts"><div><dt>Platform</dt><dd>Windows 10 & 11</dd></div><div><dt>Built with</dt><dd>C# · .NET 8 · WPF</dd></div><div><dt>Connection</dt><dd>Your local network</dd></div><div><dt>License</dt><dd>MIT / Open source</dd></div></dl>

    <section className="s-remote-section" aria-labelledby="s-remote-controls">
      <h2 id="s-remote-controls">The controls you reach for</h2>
      <div className="s-remote-features">
        <article><h3>Find your way</h3><p>A large directional pad and a central OK button handle menus. Dedicated back and home buttons keep the next action close.</p></article>
        <article><h3>Adjust the room</h3><p>Volume and mute sit alongside playback controls. Hold either volume button to keep adjusting without repeated clicks.</p></article>
        <article><h3>Know you’re connected</h3><p>The TV selector keeps the chosen device in view, with a status light for discovery, pairing and connection. Controls become available when the TV is connected.</p></article>
        <article><h3>Keep it nearby</h3><p>Closing the window tucks the app into the system tray. Bring it back when you need it, or quit from the tray menu.</p></article>
      </div>
    </section>

    <section className="s-remote-section s-remote-connection" aria-labelledby="s-remote-pairing">
      <h2 id="s-remote-pairing">From discovery to control</h2>
      <div className="s-remote-steps"><article><h3>Find the TV</h3><p>Keep the PC and TV on the same network. S-Remote searches for compatible Samsung TVs and lets you rescan from the device selector.</p></article><article><h3>Pair once</h3><p>Choose a TV and approve the first connection on its screen. The app saves the pairing token locally and tries to reconnect to your last TV on launch.</p></article><article><h3>Settle in</h3><p>Commands travel directly to the TV over a WebSocket connection. Power switches it off when connected; waking it uses Wake-on-LAN when the TV supports it and its network address has been saved.</p></article></div>
      <p className="s-remote-requirements">Designed for compatible Samsung Smart TVs from 2016 onward, with network remote access enabled. Standby wake support depends on the TV and its network settings.</p>
    </section>

    <footer className="s-remote-footer"><a href={repository} target="_blank" rel="noopener noreferrer">Explore S-Remote on GitHub</a><RouteLink href={sideQuestsPath}>Back to Side Quests</RouteLink></footer>
  </main>;
}
