const response = await fetch('./data/demo-content.json');
if (!response.ok) throw new Error(`Could not load demo content: ${response.status}`);
const content = await response.json();
const text = (value) => String(value ?? '');
const make = (tag, className, value) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (value != null) node.textContent = text(value);
  return node;
};

document.querySelectorAll('[data-site]').forEach((node) => {
  node.textContent = text(content.site[node.dataset.site]);
});
document.querySelectorAll('[data-link]').forEach((node) => {
  node.href = text(content.site[node.dataset.link]) || '#register';
});
const nav = document.querySelector('#nav-links');
content.navigation.forEach((item) => {
  const link = make('a', '', item.label);
  link.href = text(item.href);
  nav.append(link);
});
const ribbons = document.querySelector('#ribbons');
content.ribbons.forEach((item, index) => {
  const ribbon = make('div', `ribbon ribbon-${text(item.tone)}`);
  ribbon.style.setProperty('--i', index);
  ribbon.setAttribute('aria-label', text(item.name));
  ribbon.append(make('span', 'ribbon-label', item.name));
  const symbol = make('span', 'ribbon-symbol', item.symbol);
  symbol.setAttribute('aria-hidden', 'true');
  ribbon.append(symbol);
  ribbons.append(ribbon);
});
const chapters = document.querySelector('#chapters');
content.chapters.forEach((item) => {
  const card = make('article', 'chapter');
  card.append(make('span', 'chapter-number', item.number));
  card.append(make('h3', '', item.title));
  card.append(make('p', '', item.text));
  chapters.append(card);
});
const highlights = document.querySelector('#highlights-grid');
content.highlights.forEach((item) => {
  const card = make('article');
  card.append(make('strong', '', item.value));
  card.append(make('span', '', item.label));
  highlights.append(card);
});

const countdown = document.querySelector('#countdown');
const updateCountdown = () => {
  const days = Math.max(0, Math.ceil((new Date(`${content.site.startDate}T00:00:00`) - new Date()) / 86400000));
  countdown.textContent = days ? `${days} days` : 'Event is on';
};
updateCountdown();
setInterval(updateCountdown, 3600000);

document.querySelector('#calendar').addEventListener('click', () => {
  const event = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Consoulium//Demo//EN', 'BEGIN:VEVENT',
    `DTSTART;VALUE=DATE:${content.site.startDate.replaceAll('-', '')}`,
    `DTEND;VALUE=DATE:${content.site.endDateExclusive.replaceAll('-', '')}`,
    `SUMMARY:${content.site.brand} · ${content.site.title}`,
    `LOCATION:${content.site.venue}`, `DESCRIPTION:${content.site.description}`,
    'END:VEVENT', 'END:VCALENDAR'
  ].join('\r\n');
  const url = URL.createObjectURL(new Blob([event], { type: 'text/calendar;charset=utf-8' }));
  const link = Object.assign(document.createElement('a'), { href: url, download: 'consoulium-2026.ics' });
  link.click();
  URL.revokeObjectURL(url);
});
