const btnsFavorite = document.querySelectorAll('.favorite');
const products = document.querySelectorAll('.card-product');
const counterFavorites = document.querySelector('.counter-favorite');
let favorites = [];

const updateFavoritesInLocalStorage = () => {
  localStorage.setItem('favorites', JSON.stringify(favorites));
};

const loadFavoritesFromLocalStorage = () => {
  const storedFavorites = localStorage.getItem('favorites');
  if (storedFavorites) {
    favorites = JSON.parse(storedFavorites);
  }
};

const toggleFavorite = product => {
  const index = favorites.findIndex(element => element.id === product.id);
  if (index > -1) {
    favorites.splice(index, 1);
    updateFavoritesInLocalStorage();
  } else {
    favorites.push(product);
    updateFavoritesInLocalStorage();
  }
  updateFavoriteIcon(product.id);
  updateCounterFavorites();
};

const updateFavoriteIcon = productId => {
  const card = document.querySelector(`.content-card-product[data-product-id="${productId}"]`);
  const favoriteButton = card.querySelector('.favorite');
  const favoriteActiveButton = card.querySelector('#added-favorite');
  const favoriteRegularIcon = card.querySelector('#favorite-regular');
  const isFavorite = favorites.some(favorite => favorite.id === productId);

  favoriteButton.classList.toggle('favorite-active', isFavorite);
  favoriteRegularIcon.classList.toggle('active', isFavorite);
  favoriteActiveButton.classList.toggle('active', isFavorite);
};

const updateCounterFavorites = () => {
  counterFavorites.textContent = favorites.length;
};

btnsFavorite.forEach(button => {
  button.addEventListener('click', e => {
    const card = e.target.closest('.content-card-product');
    const product = {
      id: card.dataset.productId,
      title: card.querySelector('h3').textContent,
      price: card.querySelector('.price').textContent,
    };
    toggleFavorite(product);
    updateFavoriteIcon(product.id);
  });
});

loadFavoritesFromLocalStorage();
updateCounterFavorites();