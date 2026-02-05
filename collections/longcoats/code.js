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

// Function to open menu
function openMenu() {
  navListMobile.classList.add('active');
  navListMobile.style.left = '0';
  menuToggles[0].classList.add('hidden');
  menuToggles[1].classList.remove('hidden');
  overlay.classList.remove('opacity-0', 'invisible');
  overlay.classList.add('opacity-100', 'visible');
  document.body.style.overflow = 'hidden';
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