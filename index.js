const overlay = document.getElementById('overlay');
const header = document.getElementById('header');
const nav = document.querySelector('nav');
const menuToggles = document.querySelectorAll('.menu-toggle');
const navListMobile = document.querySelector('.nav-list-mobile');
const visibleMenu = document.querySelector('.visible-menu');
const closedMenu = document.querySelector('.closed-menu');
const logo = document.querySelector('.logo');
const searchIcon = document.querySelector('.search-icon');
const mobileLinks = document.querySelectorAll('.mobile-link');

let isScrolling = false;

// Function to open menu
function openMenu() {
  navListMobile.classList.add('active');
  navListMobile.style.left = '0';
  menuToggles[0].classList.add('hidden');
  menuToggles[1].classList.remove('hidden');
  overlay.classList.remove('opacity-0', 'invisible');
  overlay.classList.add('opacity-100', 'visible');
  document.body.style.overflow = 'hidden';

  // Navbar white background
  nav.classList.add('bg-white');

  // Change icons/text to brown directly
  logo.classList.remove('text-white');
  logo.classList.add('text-[#5C4033]');

  closedMenu.classList.remove('text-white');
  closedMenu.classList.add('text-[#5C4033]');

  searchIcon.classList.remove('text-white');
  searchIcon.classList.add('text-[#5C4033]');
}

// Function to close menu
function closeMenu() {
  navListMobile.classList.remove('active');
  navListMobile.style.left = '-100%';
  menuToggles[0].classList.remove('hidden');
  menuToggles[1].classList.add('hidden');
  overlay.classList.add('opacity-0', 'invisible');
  overlay.classList.remove('opacity-100', 'visible');
  document.body.style.overflow = '';

  // Reset navbar colors if not scrolled
  if (window.scrollY === 0) {
    nav.classList.remove('bg-white');

    logo.classList.add('text-white');
    logo.classList.remove('text-[#5C4033]');

    visibleMenu.classList.add('text-white');
    visibleMenu.classList.remove('text-[#5C4033]');

    searchIcon.classList.add('text-white');
    searchIcon.classList.remove('text-[#5C4033]');
  }
}

// Toggle menu on click
menuToggles.forEach(toggle => {
  toggle.addEventListener('click', (e) => {
    e.preventDefault();
    if (!navListMobile.classList.contains('active')) {
      openMenu();
    } else {
      closeMenu();
    }
  });
});

// Close menu if overlay clicked or mobile link clicked
overlay.addEventListener('click', closeMenu);
mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

// Smooth scroll / header scroll effect
function handleScroll() {
  if (isScrolling) return;
  isScrolling = true;
  requestAnimationFrame(() => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    isScrolling = false;
  });
}
window.addEventListener('scroll', handleScroll, { passive: true });

// Collection Slider
const cardsContainer = document.querySelector('.cards');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const cards = document.querySelectorAll('.card');

let currentIndex = 0;
let cardsPerView = 4;

// Update cards per view based on screen size
function updateCardsPerView() {
  if (window.innerWidth < 640) {
    cardsPerView = 2; // Mobile: 2 cards
  } else if (window.innerWidth < 1024) {
    cardsPerView = 3; // Tablet: 3 cards
  } else {
    cardsPerView = 4; // Desktop: 4 cards
  }
}

function updateSlider() {
  const cardWidth = cards[0].offsetWidth;
  const gap = 16; // gap-4 = 16px
  const offset = -(currentIndex * (cardWidth + gap));
  cardsContainer.style.transform = `translateX(${offset}px)`;

  // Disable buttons at ends
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex >= cards.length - cardsPerView;

  prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
  nextBtn.style.opacity = currentIndex >= cards.length - cardsPerView ? '0.5' : '1';
}

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateSlider();
  }
});

nextBtn.addEventListener('click', () => {
  if (currentIndex < cards.length - cardsPerView) {
    currentIndex++;
    updateSlider();
  }
});

// Update on resize
window.addEventListener('resize', () => {
  updateCardsPerView();
  currentIndex = 0; // Reset to start on resize
  updateSlider();
});

// Initialize
updateCardsPerView();
updateSlider();

// Hero
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item');
const totalSlides = slides.length;

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'));
  slides[index].classList.add('active');
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  showSlide(currentSlide);
}

setInterval(nextSlide, 5000); // Change slide every 5 seconds

