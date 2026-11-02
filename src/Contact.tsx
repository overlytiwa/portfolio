import { useState, type FormEvent, type KeyboardEvent } from 'react';
import { Arrow, Dialog } from './components';
import { profile } from './content';

export function Contact({ open, close }: { open: boolean; close: () => void }) {
  const [tab, setTab] = useState<'project' | 'email'>('project');
  const [copyStatus, setCopyStatus] = useState('');
  function handleTabKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 'project' : event.key === 'End' ? 'email' : tab === 'project' ? 'email' : 'project';
    setTab(next);
    document.getElementById(`${next}-tab`)?.focus();
  }
  function prepareEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') ?? '').trim();
    const body = [
      `Hi Tiwalope,`, '', String(data.get('message') ?? '').trim(), '',
      `Name: ${name}`, `Email: ${String(data.get('email') ?? '').trim()}`,
      data.getAll('scope').length ? `Interested in: ${data.getAll('scope').join(', ')}` : '',
    ].filter((line, index, all) => line || all[index - 1]).join('\n');
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(`Project enquiry from ${name}`)}&body=${encodeURIComponent(body)}`;
  }
  async function copyEmail() {
    try {
      if (navigator.clipboard) await navigator.clipboard.writeText(profile.email);
      else {
        const field = document.createElement('textarea');
        field.value = profile.email;
        field.style.cssText = 'position:fixed;opacity:0;pointer-events:none;';
        const active = document.activeElement as HTMLElement | null;
        document.getElementById('email-panel')?.append(field);
        field.select();
        const copied = document.execCommand('copy');
        field.remove();
        active?.focus();
        if (!copied) throw new Error('Copy unavailable');
      }
      setCopyStatus('Email copied.');
    }
    catch { setCopyStatus('Select the email address above to copy it.'); }
  }
  return <Dialog open={open} onClose={close} label="Contact Tiwalope" id="contact-panel" className="contact-dialog">
    <div className="contact-shell">
      <div className="contact-top"><div className="contact-tabs" role="tablist" aria-label="Contact options" onKeyDown={handleTabKeyDown}><button role="tab" id="project-tab" tabIndex={tab === 'project' ? 0 : -1} aria-selected={tab === 'project'} aria-controls="project-panel" onClick={() => setTab('project')}><span data-contact-reveal>Client</span></button><button role="tab" id="email-tab" tabIndex={tab === 'email' ? 0 : -1} aria-selected={tab === 'email'} aria-controls="email-panel" onClick={() => setTab('email')}><span data-contact-reveal>Email</span></button></div><button className="text-control micro" onClick={close} aria-label="Close contact">Close <span aria-hidden="true">×</span></button></div>
      <div className="contact-intro"><h2><span className="contact-line"><span data-contact-reveal>let’s build</span></span><span className="contact-line"><span data-contact-reveal>together</span></span></h2></div>
      {tab === 'project' ? <form id="project-panel" role="tabpanel" aria-labelledby="project-tab" onSubmit={prepareEmail}>
        <fieldset className="scope-field"><legend><span className="micro">01.</span> Scope</legend><div>{profile.services.map(service => <label key={service}><input type="checkbox" name="scope" value={service} /><span>{service}</span></label>)}</div></fieldset>
        <div className="contact-fields"><label><span>02. Name</span><input name="name" autoComplete="name" maxLength={100} required /></label><label><span>03. Email</span><input name="email" type="email" autoComplete="email" maxLength={254} required /></label><label className="message-field"><span>04. Note</span><textarea name="message" rows={3} maxLength={4000} required /></label></div>
        <div className="contact-submit"><p>Opens your email app with a draft.<br />You review it and send it from there.</p><button type="submit" className="underlined-button">Prepare email <Arrow /></button></div>
      </form> : <div id="email-panel" role="tabpanel" aria-labelledby="email-tab" className="direct-email"><a href={`mailto:${profile.email}`}>{profile.email}<Arrow /></a><button className="text-control copy-button" onClick={copyEmail}>Copy email address <Arrow /></button><p role="status" className="copy-status">{copyStatus}</p></div>}
    </div>
  </Dialog>;
}
