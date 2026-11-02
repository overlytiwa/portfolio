document.documentElement.classList.add('js');
const $ = selector => document.querySelector(selector);
const money = value => new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(value);
const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Lagos', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
const addDays = (date, count) => new Date(Date.parse(`${date}T12:00:00Z`) + count * 86400000).toISOString().slice(0, 10);
const arrival = $('#arrival'), departure = $('#departure'), rooms = $('#rooms');
arrival.min = today; arrival.value = today; departure.min = addDays(today, 1); departure.value = addDays(today, 1);
$('#year').textContent = new Date().getFullYear();
const contact = window.MIOLAD_PUBLIC_CONTACT || {};
const whatsapp = /^\d{7,15}$/.test(contact.whatsapp || '') ? contact.whatsapp : '';
const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email || '') ? contact.email : '';
function estimate() {
  const nights = Math.round((Date.parse(`${departure.value}T12:00:00Z`) - Date.parse(`${arrival.value}T12:00:00Z`)) / 86400000);
  const count = Number(rooms.value);
  let error = '';
  if (!arrival.value || !departure.value || !Number.isFinite(nights)) error = 'Choose your arrival and departure dates.';
  else if (arrival.value < today) error = 'Choose today or a later arrival date.';
  else if (nights < 1) error = 'Departure must be after arrival.';
  else if (nights > 365) error = 'Choose a stay of up to 365 nights.';
  else if (!Number.isInteger(count) || count < 1 || count > 9) error = 'Choose between one and nine rooms.';
  $('#form-error').textContent = error;
  $('#estimate-total').textContent = error ? '—' : money(count * nights * 100000);
  $('#estimate-detail').textContent = error ? 'Update your dates to see an estimate.' : `${count} room${count === 1 ? '' : 's'} · ${nights} night${nights === 1 ? '' : 's'}`;
  return error ? null : { nights, count, total: count * nights * 100000 };
}
arrival.addEventListener('change', () => {
  if (arrival.value) { departure.min = addDays(arrival.value, 1); if (departure.value <= arrival.value) departure.value = departure.min; }
  $('#form-status').textContent = ''; estimate();
});
for (const field of [departure, rooms]) field.addEventListener('change', () => { $('#form-status').textContent = ''; estimate(); });
if (whatsapp || email) {
  $('#submit-label').textContent = 'Ask about these dates';
  $('#form-note').textContent = `Opens ${whatsapp ? 'WhatsApp' : 'your email app'} with your stay details. Reception will confirm availability. This does not reserve a room.`;
}
$('#stay-form').addEventListener('submit', event => {
  event.preventDefault(); const result = estimate(); if (!result) return;
  const message = `Hello MIOLAD Hotels,\n\nI would like to ask about a stay.\nArrival: ${arrival.value}\nDeparture: ${departure.value}\nRooms: ${result.count}\nNights: ${result.nights}\nRoom rate: ₦100,000 per room, per night\nEstimated room total: ${money(result.total)}\n\nPlease confirm availability, facilities, guest capacity and final payment terms.\n\nThis is an enquiry, not a confirmed reservation.`;
  if (whatsapp) { window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer'); $('#form-status').textContent = 'Your enquiry is ready in WhatsApp. Send it there when you are ready.'; }
  else if (email) { window.location.href = `mailto:${email}?subject=${encodeURIComponent('MIOLAD stay enquiry')}&body=${encodeURIComponent(message)}`; $('#form-status').textContent = 'Your enquiry is ready in your email app. Send it there when you are ready.'; }
  else { const url = URL.createObjectURL(new Blob([message], { type: 'text/plain;charset=utf-8' })); const a = document.createElement('a'); a.href = url; a.download = 'MIOLAD-stay-details.txt'; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); $('#form-status').textContent = 'Stay details downloaded. Share them with reception to confirm availability.'; }
});
if (contact.phone || email || contact.address) {
  const target = $('#public-contact'); target.hidden = false;
  if (/^[+\d ()-]{7,25}$/.test(contact.phone || '')) { const a = document.createElement('a'); a.href = `tel:${contact.phone.replace(/[^+\d]/g, '')}`; a.textContent = contact.phone; target.append(a); }
  if (email) { const a = document.createElement('a'); a.href = `mailto:${email}`; a.textContent = email; target.append(a); }
  if (contact.address) { const p = document.createElement('p'); p.textContent = contact.address; target.append(p); }
}
const menuButton = $('.mobile-menu-button'), menu = $('#mobile-menu');
function closeMenu() { menu.hidden = true; menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Open menu'); }
menuButton.addEventListener('click', () => { const open = menu.hidden; menu.hidden = !open; menuButton.setAttribute('aria-expanded', String(open)); menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu'); });
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
const galleryDialog = $('#gallery-dialog');
document.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click', () => {
  const entrance = button.dataset.view === 'entrance';
  galleryDialog.classList.toggle('entrance-view', entrance);
  galleryDialog.querySelector('img').alt = entrance ? 'Detail of the MIOLAD Hotels entrance' : 'MIOLAD Hotels exterior';
  galleryDialog.querySelector('figcaption').textContent = entrance ? 'MIOLAD Hotels entrance' : 'MIOLAD Hotels exterior';
  galleryDialog.showModal();
}));
$('#privacy-open').addEventListener('click', () => $('#privacy-dialog').showModal());
document.querySelectorAll('dialog').forEach(dialog => { dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close()); dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } }); });
if ('IntersectionObserver' in window) { const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: .08 }); document.querySelectorAll('.reveal').forEach(el => observer.observe(el)); } else document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
window.addEventListener('scroll', () => $('.site-header').classList.toggle('scrolled', window.scrollY > 10), { passive: true });
estimate();
