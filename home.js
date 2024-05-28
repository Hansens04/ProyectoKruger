// Selecciona todos los botones de favoritos en la página
const btnsFavorite = document.querySelectorAll('.favorite');

// Selecciona todas las tarjetas de producto en la página
const products = document.querySelectorAll('.card-product');

// Selecciona el contador de favoritos en la página
const counterFavorites = document.querySelector('.counter-favorite');

// Inicializa un array para almacenar los productos favoritos
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

// Función para agregar o quitar un producto de los favoritos
const toggleFavorite = product => {
  // Busca el índice del producto en el array de favoritos
  const index = favorites.findIndex(element => element.id === product.id);
  if (index > -1) {
    // Si el producto ya está en favoritos, lo elimina
    favorites.splice(index, 1);
    updateFavoritesInLocalStorage();
  } else {
    // Si el producto no está en favoritos, lo agrega
    favorites.push(product);
    updateFavoritesInLocalStorage();
  }
  // Actualiza el icono de favorito y el contador de favoritos
  updateFavoriteIcon(product.id);
  updateCounterFavorites();
};
$(document).on("ready",function() {
  // 0 = oculto, 1 = visible
  var menuState = 0;
  //if($(".mini-menu-options").is(":hidden")) {
    /* Agrega un listener del evento Click a btn-select */
    $(".btn-select").on("click",function() {
      if(menuState === 0) {
        $(".mini-menu-options").slideDown("slow");
        menuState = 1;
      } else {
        $(".mini-menu-options").slideUp("slow");
        menuState = 0;
      }
    });
  //}
  // Si el enlace actual (li) tiene mas de 1 hijo, es decir
  // su enlace (a) y ademas un submenu (ul)
  $(".mini-menu-options li").on("click", function() {
    var numHijos = $(this).children().length;
    if(numHijos < 2) {
      // esconde el menu
      $(".mini-menu-options").hide("fast");
      // obtiene el texto del elemento elegido
      var texto = $(this).text();
      // y lo agrega a la barra del menu
      $(".menu-select .menu-actual").text(texto);
    }
    menuState = 0; // reinicia la variable que controla el menu
  });
});

// Función para actualizar el icono de favorito de un producto
const updateFavoriteIcon = productId => {
  // Selecciona la tarjeta del producto correspondiente
  const card = document.querySelector(`.content-card-product[data-product-id="${productId}"]`);
  const favoriteButton = card.querySelector('.favorite');
  const favoriteActiveButton = card.querySelector('#added-favorite');
  const favoriteRegularIcon = card.querySelector('#favorite-regular');
  // Verifica si el producto está en favoritos
  const isFavorite = favorites.some(favorite => favorite.id === productId);

  // Actualiza las clases del icono según si el producto está en favoritos o no
  favoriteButton.classList.toggle('favorite-active', isFavorite);
  favoriteRegularIcon.classList.toggle('active', isFavorite);
  favoriteActiveButton.classList.toggle('active', isFavorite);
};

// Función para actualizar el contador de favoritos
const updateCounterFavorites = () => {
  counterFavorites.textContent = favorites.length;
};

// Añade un evento de clic a cada botón de favorito
btnsFavorite.forEach(button => {
  button.addEventListener('click', e => {
    // Encuentra la tarjeta del producto correspondiente
    const card = e.target.closest('.content-card-product');
    const productImage = card.parentElement.querySelector('.container-img img');
    // Crea un objeto de producto con la información de la tarjeta
    const product = {
      id: card.dataset.productId,
      title: card.querySelector('h3').textContent,
      price: card.querySelector('.price').textContent,
      imageUrl: productImage.src,
    };
    // Alterna el estado de favorito del producto
    toggleFavorite(product);
    updateFavoriteIcon(product.id);
  });
});

// Carga los favoritos desde el localStorage al iniciar la página
loadFavoritesFromLocalStorage();
// Actualiza el contador de favoritos al iniciar la página
updateCounterFavorites();
