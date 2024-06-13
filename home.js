// Selecciona el contenedor donde se mostrarán los productos favoritos
const favoritesContainer = document.querySelector('.container-products');

// Recupera los favoritos del localStorage, si no hay favoritos, inicializa como un array vacío
const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Función para renderizar los productos favoritos
const renderFavorites = () => {
  // Limpia el contenido del contenedor de productos favoritos
  favoritesContainer.innerHTML = '';

  // Recorre cada producto favorito y lo agrega al contenedor
  favorites.forEach(favorite => {
    // Crea un contenedor para la tarjeta del producto
    const productCard = document.createElement('div');
    productCard.classList.add('card-product');

    // Crea un contenedor para la imagen del producto
    const containerImg = document.createElement('div');
    containerImg.classList.add('container-img');
    // Crea el elemento de imagen y asigna la URL y el texto alternativo
    const img = document.createElement('img');
    img.src = favorite.imageUrl;
    img.alt = 'imagen Producto';
    // Agrega la imagen al contenedor de imagen
    containerImg.appendChild(img);
    // Agrega el contenedor de imagen a la tarjeta del producto
    productCard.appendChild(containerImg);

    // Crea un contenedor para el contenido de la tarjeta del producto
    const contentCardProduct = document.createElement('div');
    contentCardProduct.classList.add('content-card-product');
    // Asigna el ID del producto al contenedor de contenido
    contentCardProduct.dataset.productId = favorite.id;

    // Crea el elemento de título y le asigna el título del producto
    const title = document.createElement('h3');
    title.textContent = favorite.title;
    // Agrega el título al contenedor de contenido
    contentCardProduct.appendChild(title);

    // Crea el elemento de descripción (puedes reemplazar el texto con la descripción real)
    const description = document.createElement('p');
    description.textContent = 'Descripción del producto'; // Reemplaza con la descripción real
    // Agrega la descripción al contenedor de contenido
    contentCardProduct.appendChild(description);

    // Crea el contenedor para el pie de la tarjeta del producto
    const footerCardProduct = document.createElement('div');
    footerCardProduct.classList.add('footer-card-product');

    // Crea el elemento de precio y le asigna el precio del producto
    const price = document.createElement('span');
    price.classList.add('price');
    price.textContent = favorite.price;
    // Agrega el precio al pie de la tarjeta
    footerCardProduct.appendChild(price);

    // Crea el contenedor para los botones de la tarjeta del producto
    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('container-buttons-card');

    // Crea el botón de favorito y sus íconos (regular y activo)
    const favoriteButton = document.createElement('button');
    favoriteButton.classList.add('favorite');
    const favoriteRegularIcon = document.createElement('i');
    favoriteRegularIcon.classList.add('fa-regular', 'fa-heart', 'active');
    favoriteRegularIcon.id = 'favorite-regular';
    const favoriteActiveIcon = document.createElement('i');
    favoriteActiveIcon.classList.add('fa-solid', 'fa-heart', 'active');
    favoriteActiveIcon.id = 'added-favorite';
    // Agrega los íconos al botón de favorito
    favoriteButton.appendChild(favoriteRegularIcon);
    favoriteButton.appendChild(favoriteActiveIcon);
    // Agrega el botón de favorito al contenedor de botones
    buttonsContainer.appendChild(favoriteButton);



    // Agrega el contenedor de botones al pie de la tarjeta del producto
    footerCardProduct.appendChild(buttonsContainer);
    // Agrega el pie de la tarjeta al contenedor de contenido
    contentCardProduct.appendChild(footerCardProduct);
    // Agrega el contenedor de contenido a la tarjeta del producto
    productCard.appendChild(contentCardProduct);

    // Agrega la tarjeta del producto al contenedor de productos favoritos
    favoritesContainer.appendChild(productCard);
  });
};

// Llama a la función para renderizar los productos favoritos
renderFavorites();
