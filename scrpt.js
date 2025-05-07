// Custom Cursor
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

// Magnetic Button Effect
const magneticButtons = document.querySelectorAll('.magnetic');
magneticButtons.forEach(button => {
  button.addEventListener('mousemove', (e) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    button.style.setProperty('--x', `${x - rect.width/2}px`);
    button.style.setProperty('--y', `${y - rect.height/2}px`);
  });
  
  button.addEventListener('mouseleave', () => {
    button.style.setProperty('--x', '0px');
    button.style.setProperty('--y', '0px');
  });
});

// Theme Toggle
const themeSwitch = document.getElementById('themeSwitch');
themeSwitch.addEventListener('change', () => {
  document.documentElement.setAttribute('data-theme', 
    themeSwitch.checked ? 'dark' : 'light');
  localStorage.setItem('theme', themeSwitch.checked ? 'dark' : 'light');
});

// Initialize theme from localStorage
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
themeSwitch.checked = savedTheme === 'dark';

// Visit Counter
let visitCount = localStorage.getItem('visitCount') || 0;
visitCount = parseInt(visitCount) + 1;
localStorage.setItem('visitCount', visitCount);
document.getElementById('visitCount').textContent = visitCount;

if (visitCount > 1) {
  const welcomeMessage = document.getElementById('welcomeMessage');
  welcomeMessage.textContent = `Welcome back! This is visit #${visitCount}`;
  welcomeMessage.style.display = 'block';
  welcomeMessage.classList.add('animate__animated', 'animate__fadeIn');
}

// Set current year
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Gallery item animation
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach((item, index) => {
  item.style.setProperty('--clip-start', `${index * 50}%`);
  item.style.setProperty('--clip-end', `${index * 50 + 50}%`);
});

// Scroll animations
const animateOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate__animated', 'animate__fadeInUp');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.project-card, .gallery-item').forEach(el => {
  animateOnScroll.observe(el);
});

// CTA Button click
document.querySelector('.cta-button').addEventListener('click', () => {
  document.querySelector('.projects').scrollIntoView({
    behavior: 'smooth'
  });
});