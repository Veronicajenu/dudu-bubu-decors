document.getElementById('year').textContent = new Date().getFullYear();

/* ===== Mobile nav ===== */
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});
mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

/* ===== Gallery data ===== */
const galleryItems = [
  { category: 'birthday', label: 'Rainbow arch, 5th birthday', colors: ['var(--pink)', 'var(--yellow)'] },
  { category: 'baby', label: 'Storybook baby shower', colors: ['var(--lavender)', 'var(--teal)'] },
  { category: 'wedding', label: 'Blush garden arch', colors: ['var(--pink)', 'var(--paper-dim)'] },
  { category: 'corporate', label: 'Brand launch backdrop', colors: ['var(--ink)', 'var(--teal)'] },
  { category: 'birthday', label: 'Neon 21st backdrop', colors: ['var(--ink)', 'var(--pink)'] },
  { category: 'baby', label: 'Gender reveal cascade', colors: ['var(--teal)', 'var(--yellow)'] },
  { category: 'wedding', label: 'Ceremony floral arch', colors: ['var(--yellow)', 'var(--pink)'] },
  { category: 'corporate', label: 'Product launch wall', colors: ['var(--teal)', 'var(--ink)'] },
  { category: 'birthday', label: 'Pastel first birthday', colors: ['var(--lavender)', 'var(--pink)'] },
];

const galleryGrid = document.getElementById('galleryGrid');
galleryItems.forEach(item => {
  const el = document.createElement('div');
  el.className = 'gallery-item';
  el.dataset.category = item.category;
  el.style.background = `linear-gradient(135deg, ${item.colors[0]}, ${item.colors[1]})`;
  el.innerHTML = `<span class="tag">${item.label}</span>`;
  galleryGrid.appendChild(el);
});

const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.gallery-item').forEach(item => {
      const match = filter === 'all' || item.dataset.category === filter;
      item.classList.toggle('hidden', !match);
    });
  });
});

/* ===== Testimonials ===== */
const testimonials = [
  { quote: "The balloon arch was bigger and better than what I imagined from the photos. Guests were taking pictures all night.", author: "Amaka O. — 30th birthday" },
  { quote: "They understood our brand colors instantly and the backdrop made every launch photo look polished.", author: "Tunde F. — Product launch" },
  { quote: "Showed up early, worked quietly, and the room was transformed by the time our first guest arrived.", author: "Chiamaka N. — Baby shower" },
  { quote: "We booked the Room Takeover for our wedding reception and it felt like a completely different venue.", author: "Bisi & Kunle — Wedding" },
];

let tIndex = 0;
const testimonialCard = document.getElementById('testimonialCard');
const tDots = document.getElementById('tDots');

function renderTestimonial() {
  const t = testimonials[tIndex];
  testimonialCard.innerHTML = `<p class="quote">"${t.quote}"</p><p class="author">${t.author}</p>`;
  tDots.querySelectorAll('button').forEach((d, i) => d.classList.toggle('active', i === tIndex));
}

testimonials.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.setAttribute('aria-label', `Show testimonial ${i + 1}`);
  dot.addEventListener('click', () => { tIndex = i; renderTestimonial(); });
  tDots.appendChild(dot);
});

document.getElementById('tPrev').addEventListener('click', () => {
  tIndex = (tIndex - 1 + testimonials.length) % testimonials.length;
  renderTestimonial();
});
document.getElementById('tNext').addEventListener('click', () => {
  tIndex = (tIndex + 1) % testimonials.length;
  renderTestimonial();
});

renderTestimonial();
setInterval(() => {
  tIndex = (tIndex + 1) % testimonials.length;
  renderTestimonial();
}, 7000);

/* ===== Contact form ===== */
const quoteForm = document.getElementById('quoteForm');
const formStatus = document.getElementById('formStatus');

quoteForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !email || !message) {
    formStatus.textContent = 'Please fill in your name, email, and vision.';
    formStatus.classList.add('error');
    return;
  }
  if (!emailPattern.test(email)) {
    formStatus.textContent = 'Please enter a valid email address.';
    formStatus.classList.add('error');
    return;
  }

  formStatus.classList.remove('error');
  formStatus.textContent = `Thanks, ${name}! We'll reply within 48 hours with ideas and pricing.`;
  quoteForm.reset();
});