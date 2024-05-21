const favoritesContainer = document.querySelector('.container-products');
const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

const renderFavorites = () => {
  favoritesContainer.innerHTML = '';
  favorites.forEach(favorite => {
    const productCard = document.createElement('div');
    productCard.classList.add('card-product');

    const containerImg = document.createElement('div');
    containerImg.classList.add('container-img');
    const img = document.createElement('img');
    img.src = 'https://via.placeholder.com/300x200'; // Reemplaza con la URL de la imagen real
    img.alt = 'imagen Producto';
    containerImg.appendChild(img);
    productCard.appendChild(containerImg);

    const contentCardProduct = document.createElement('div');
    contentCardProduct.classList.add('content-card-product');
    contentCardProduct.dataset.productId = favorite.id;

    const title = document.createElement('h3');
    title.textContent = favorite.title;
    contentCardProduct.appendChild(title);

    const description = document.createElement('p');
    description.textContent = 'Descripción del producto'; // Reemplaza con la descripción real
    contentCardProduct.appendChild(description);

    const footerCardProduct = document.createElement('div');
    footerCardProduct.classList.add('footer-card-product');

    const price = document.createElement('span');
    price.classList.add('price');
    price.textContent = favorite.price;
    footerCardProduct.appendChild(price);

    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('container-buttons-card');

    const favoriteButton = document.createElement('button');
    favoriteButton.classList.add('favorite');
    const favoriteRegularIcon = document.createElement('i');
    favoriteRegularIcon.classList.add('fa-regular', 'fa-heart', 'active');
    favoriteRegularIcon.id = 'favorite-regular';
    const favoriteActiveIcon = document.createElement('i');
    favoriteActiveIcon.classList.add('fa-solid', 'fa-heart', 'active');
    favoriteActiveIcon.id = 'added-favorite';
    favoriteButton.appendChild(favoriteRegularIcon);
    favoriteButton.appendChild(favoriteActiveIcon);
    buttonsContainer.appendChild(favoriteButton);

    const cartButton = document.createElement('button');
    cartButton.classList.add('cart');
    const cartIcon = document.createElement('i');
    cartIcon.classList.add('fa-solid', 'fa-bag-shopping');
    cartButton.appendChild(cartIcon);
    buttonsContainer.appendChild(cartButton);

    footerCardProduct.appendChild(buttonsContainer);
    contentCardProduct.appendChild(footerCardProduct);
    productCard.appendChild(contentCardProduct);

    favoritesContainer.appendChild(productCard);
  });
};

renderFavorites();