// Selecciona todos los botones de favoritos en la página
const btnsFavorite = document.querySelectorAll('.btn-favorite');

// Selecciona el contador de favoritos en la página
const counterFavorites = document.querySelector('.counter-favorites');

// Inicializa un array vacío para almacenar los productos favoritos
let favorites = [];

// Función para actualizar los favoritos en el localStorage
const updateFavoritesInLocalStorage = () => {
  localStorage.setItem('favorites', JSON.stringify(favorites));
};

// Función para cargar los favoritos desde el localStorage
const loadFavoritesFromLocalStorage = () => {
  const storedFavorites = localStorage.getItem('favorites');
  if (storedFavorites) {
    favorites = JSON.parse(storedFavorites);
  }
};

// Función para agregar o eliminar un producto de los favoritos
const toggleFavorite = (product) => {
  const productIndex = favorites.findIndex((favProduct) => favProduct.id === product.id);

  if (productIndex !== -1) {
    favorites.splice(productIndex, 1);
  } else {
    favorites.push(product);
  }

  updateFavoritesInLocalStorage();
  updateFavoriteIcon(product.id);
  updateCounterFavorites();
};

// Función para actualizar el ícono de favorito de un producto
const updateFavoriteIcon = (productId) => {
  const productCard = document.querySelector(`.card-product[data-product-id="${productId}"]`);
  const favoriteButton = productCard.querySelector('.btn-favorite');
  const favoriteIcon = favoriteButton.querySelector('i');

  if (favorites.some((favProduct) => favProduct.id === productId)) {
    favoriteButton.classList.add('active');
    favoriteIcon.classList.remove('far');
    favoriteIcon.classList.add('fas');
  } else {
    favoriteButton.classList.remove('active');
    favoriteIcon.classList.remove('fas');
    favoriteIcon.classList.add('far');
  }
};

// Función para actualizar el contador de favoritos
const updateCounterFavorites = () => {
  counterFavorites.textContent = favorites.length;
};

// Agrega un event listener a cada botón de favorito
btnsFavorite.forEach((btnFavorite) => {
  btnFavorite.addEventListener('click', () => {
    const productCard = btnFavorite.closest('.card-product');
    const productId = parseInt(productCard.dataset.productId, 10);
    const product = productsList.find((product) => product.id === productId);

    toggleFavorite(product);
  });
});

// Carga los favoritos desde el localStorage cuando se carga la página
loadFavoritesFromLocalStorage();

// Actualiza el contador de favoritos cuando se carga la página
updateCounterFavorites();

// Selecciona el contenedor donde se mostrarán los productos
const productsContainer = document.querySelector('.container-products');

// Función para renderizar los productos
const renderProducts = () => {
  productsContainer.innerHTML = '';

  const selectedProductType = document.getElementById('product-type').value;
  const selectedPriceRange = document.getElementById('price-range').value;

  const filteredProducts = productsList.filter((product) => {
    // Filtrar por tipo de producto
    if (selectedProductType !== 'all' && product.type !== selectedProductType) {
      return false;
    }

    // Filtrar por rango de precios
    if (selectedPriceRange !== 'all') {
      const [minPrice, maxPrice] = selectedPriceRange.split('-');
      const productPrice = parseFloat(product.price.replace('$', ''));
      if (productPrice < parseFloat(minPrice) || productPrice > parseFloat(maxPrice)) {
        return false;
      }
    }

    return true;
  });

  filteredProducts.forEach((product) => {
    const productCard = document.createElement('div');
    productCard.classList.add('card-product');
    productCard.dataset.productId = product.id;

    const favoriteButton = document.createElement('button');
    favoriteButton.classList.add('btn-favorite');
    if (favorites.some((favProduct) => favProduct.id === product.id)) {
      favoriteButton.classList.add('active');
    }

    const favoriteIcon = document.createElement('i');
    favoriteIcon.classList.add('fas', 'fa-heart');

    favoriteButton.appendChild(favoriteIcon);
    productCard.appendChild(favoriteButton);

    const productTitle = document.createElement('h3');
    productTitle.textContent = product.title;
    productCard.appendChild(productTitle);

    const productPrice = document.createElement('p');
    productPrice.textContent = `Price: ${product.price}`;
    productCard.appendChild(productPrice);

    const productImage = document.createElement('img');
    productImage.src = product.imageUrl;
    productImage.alt = product.title;
    productCard.appendChild(productImage);

    productsContainer.appendChild(productCard);
  });
};

// Agrega un event listener al botón de filtrar
document.getElementById('filter-button').addEventListener('click', renderProducts);
renderProducts();
// Obtener elementos del DOM
const filterForm = document.querySelector('#filter-form');
const typeSelect = document.querySelector('#type-select');
const priceRangeSelect = document.querySelector('#price-range-select');
const productContainer = document.querySelector('.container-products');

// Obtener todos los productos para mostrar inicialmente
const allProducts = document.querySelectorAll('.card-product');

// Agregar un evento de escucha al formulario de filtrado
filterForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Evitar que se recargue la página

  const selectedType = typeSelect.value;
  const selectedPriceRange = priceRangeSelect.value;

  // Filtrar los productos según el tipo y el rango de precios seleccionados
  const filteredProducts = Array.from(allProducts).filter((product) => {
    const productType = product.dataset.type;
    const productPrice = parseFloat(product.dataset.price);

    // Verificar si el producto coincide con los filtros seleccionados
    const typeMatch = selectedType === 'all' || selectedType === productType;
    const priceMatch = selectedPriceRange === 'all' || selectedPriceRange === getPriceRange(productPrice);

    return typeMatch && priceMatch;
  });

  // Mostrar solo los productos filtrados
  showFilteredProducts(filteredProducts);
});

// Función para mostrar los productos filtrados
function showFilteredProducts(filteredProducts) {
  // Ocultar todos los productos
  allProducts.forEach((product) => {
    product.style.display = 'none';
  });

  // Mostrar solo los productos filtrados
  filteredProducts.forEach((product) => {
    product.style.display = 'block';
  });
}

// Función para obtener el rango de precios de un producto
function getPriceRange(price) {
  if (price < 100) {
    return 'low';
  } else if (price >= 100 && price < 500) {
    return 'medium';
  } else {
    return 'high';
  }
}