// Get product ID from URL (e.g., product.html?id=1)
const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get('id'));

// Load product data
fetch('products.json')
  .then(response => response.json())
  .then(products => {
    const product = products.find(p => p.id === productId);
    
    if (!product) {
      document.body.innerHTML = '<div class="text-center py-20"><h1 class="text-4xl text-[#5C4033]">Product not found</h1></div>';
      return;
    }
    
    // Update page title
    document.getElementById('page-title').textContent = product.title;
    
    // Update product image
    document.getElementById('product-image').src = product.image;
    document.getElementById('product-image').alt = product.name;
    
    // Update product name
    document.getElementById('product-name').textContent = product.name;
    
    // Generate star rating
    const starsContainer = document.getElementById('product-stars');
    for (let i = 0; i < product.rating; i++) {
      starsContainer.innerHTML += '<span class="text-[20px] text-[#5C4033]">&#9733;</span>';
    }
    
    // Update reviews count
    document.getElementById('product-reviews').textContent = `${product.reviews} reviews`;
    
    // Update price
    document.getElementById('product-price').textContent = `${product.price}$`;
    
    // Update description
    document.getElementById('product-description').textContent = product.description;
    
    // Generate size options
    const sizeContainer = document.getElementById('size-options');
    product.sizes.forEach(size => {
      const sizeSpan = document.createElement('span');
      sizeSpan.className = 'py-[5px] px-[12px] border border-[#5C4033] cursor-pointer text-[#5C4033]';
      sizeSpan.textContent = size;
      sizeSpan.onclick = function() { selectSize(this); };
      
      // Set default size border
      if (size === product.defaultSize) {
        sizeSpan.classList.add('border-2');
      }
      
      sizeContainer.appendChild(sizeSpan);
    });
    
    // Update selected size display
    document.getElementById('selected-size').textContent = product.defaultSize;
  })
  .catch(error => {
    console.error('Error loading product:', error);
    document.body.innerHTML = '<div class="text-center py-20"><h1 class="text-4xl text-[#5C4033]">Error loading product</h1></div>';
  });

// Quantity controls
const decreaseBtn = document.getElementById('decrease');
const increaseBtn = document.getElementById('increase');
const qtyInput = document.getElementById('qtyInput');

decreaseBtn.addEventListener('click', () => {
  let current = parseInt(qtyInput.value);
  if (current > 1) qtyInput.value = current - 1;
});

increaseBtn.addEventListener('click', () => {
  let current = parseInt(qtyInput.value);
  if (current < 10) qtyInput.value = current + 1;
});

qtyInput.addEventListener('input', () => {
  let val = parseInt(qtyInput.value);
  if (isNaN(val) || val < 1) qtyInput.value = 1;
  else if (val > 10) qtyInput.value = 10;
});

// Size selection
function selectSize(element) {
  // Remove border from all sizes
  element.parentElement.querySelectorAll('span').forEach(span => {
    span.classList.remove('border-2');
  });
  // Add border to selected size
  element.classList.add('border-2');
  
  // Update the "Size X" display
  document.getElementById('selected-size').textContent = element.textContent;
}

// Wishlist functionality
const wishlistIcon = document.getElementById('wishlistIcon');
const wishlistText = document.getElementById('wishlistText');
const wishlistDiv = wishlistIcon.closest('div');
let isWishlisted = false;

wishlistDiv.addEventListener('click', () => {
  isWishlisted = !isWishlisted;

  if (isWishlisted) {
    wishlistIcon.classList.remove('ri-poker-hearts-line');
    wishlistIcon.classList.add('ri-poker-hearts-fill');
    wishlistText.classList.add('font-semibold');
  } else {
    wishlistIcon.classList.remove('ri-poker-hearts-fill');
    wishlistIcon.classList.add('ri-poker-hearts-line');
    wishlistText.classList.remove('font-semibold');
  }
});