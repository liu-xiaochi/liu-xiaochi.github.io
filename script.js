const p = window.PROFILE;
if (p) {
  document.querySelectorAll('[data-field]').forEach(el => { const value = p[el.dataset.field]; if (value) el.textContent = value; });
  document.title = p.name === '我' ? '个人主页' : `${p.name} · 个人学术主页`;
  document.querySelector('meta[name="description"]').content = p.bio;
  const list = document.getElementById('interest-list');
  if (list && Array.isArray(p.interests)) {
    list.replaceChildren();
    p.interests.forEach((item, i) => {
      const card = document.createElement('article'); card.className = 'card';
      const n = document.createElement('span'); n.className = 'card-number'; n.textContent = String(i+1).padStart(2,'0');
      const h = document.createElement('h3'); h.textContent = item.title;
      const text = document.createElement('p'); text.textContent = item.description;
      card.append(n,h,text); list.append(card);
    });
  }
  const links = document.getElementById('contact-links'); links.replaceChildren();
  function addLink(label, href) { const a = document.createElement('a'); a.textContent = label + ' ↗'; a.href = href; links.append(a); }
  if (p.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email)) addLink(p.email, 'mailto:' + p.email);
  if (p.github && /^https:\/\/github\.com\/[\w-]+\/?$/.test(p.github)) addLink('GitHub', p.github);
}
document.getElementById('year').textContent = new Date().getFullYear();


