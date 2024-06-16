// Selecciona el contenedor donde se mostrarán los favoritos
const favoritesContainer = document.querySelector('.container-products');

// Array de productos (departamentos)
const products = [
  {
    id: 1,
    imageUrl: "https://images.unsplash.com/photo-1603003568133-55b07aaf1860?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    province: "Pichincha-Ecuador",
    city: "Quito",
    description: "Renta Apartamento de 250 m² a Super Buen Precio en Miravalle 4",
    street: "Calle numero 28c",
    year: "Año de construccion: 2007",
    price: "$1500"
  },
  {
    id: 2,
    imageUrl: "https://media.istockphoto.com/id/2133653807/es/foto/foto-de-la-ciudad-de-benidorm-en-espa%C3%B1a-en-verano-que-muestra-el-frente-de-playa-y-los.jpg?s=2048x2048&w=is&k=20&c=soT10PL2yU1yhKM_aLheeDLVWbioR-Ps1Hk2YkqaBhM=",
    province: "Guayas-Ecuador",
    city: "Samborondon",
    description: "Departamento en Alquiler en Riverside Piso 1, con 115 m²",
    street: "Calle numero: ",
    year: "Año de construccion: 2024",
    price: "$1500"
  },
  {
    id: 3,
    imageUrl: "https://img.freepik.com/foto-gratis/arquitectura-moderna-apartamentos_1268-14696.jpg?t=st=1718413983~exp=1718417583~hmac=3a27ff2a37f5eb54c674071ea9827195a9dbc4d0dc258f2aaf0d2414b00a846b&w=996",
    province: "Azuay-Ecuador",
    city: "Cuenca",
    description: "Departamento amoblado en renta. Con 140 m²",
    street: "Calle numero: 3142C",
    year: "Año de construccion: ",
    price: "$650"
  },
  {
    id: 4,
    imageUrl: "https://img.freepik.com/foto-gratis/rascacielos-oficinas-distrito-negocios_107420-95735.jpg?t=st=1718414146~exp=1718417746~hmac=21428eab16228a85a45ed579fae326afcc03eaeeee128621fee62279bfb27ab9&w=996",
    province: "Manabi-Ecuador",
    city: "Manta",
    description: "Ubicado en un edificio dentro de la urbanización Pedro Balda C. en el centro de Manta, en primera línea al mar, con fácil y rápido acceso a las zonas turísticas, comerciales y playas de la ciudad.",
    street: "Calle numero",
    year: "Año de construccion: 2020",
    price: "$1600"
  },
  {
    id: 5,
    imageUrl: "https://img.freepik.com/foto-gratis/paisaje-analogico-ciudad-edificios_23-2149661457.jpg?t=st=1718414589~exp=1718418189~hmac=6ba154d416f49d67ae5b6f6d26587a090b94bdd3f047bf5355fbefb9932ba281&w=360",
    province: "Tungurahua-Ecuador",
    city: "Ambato",
    description: "Amplio Departamento en Arriendo Super Ubicacion con 265 m²",
    street: "Calle numero: 9137",
    year: "Año de construccion 2014",
    price: "$800"
  },
  {
    id: 6,
    imageUrl: "https://img.freepik.com/foto-gratis/tiro-vertical-edificio-blanco-cielo-despejado_181624-4575.jpg?t=st=1718414815~exp=1718418415~hmac=bfe0543bf9bd5b423d3b4af7fb61343031b81c2f47f558bf6c7c11e146ce99f6&w=360",
    province: "Pichincha-Ecuador",
    city: "Quito",
    description: "RENTO DEPARTAMENTO AMOBLADO con 95m²",
    street: "Calle numero: 134",
    year: "Año de construccion: 2014",
    price: "$460"
  }
];

// Función para renderizar los favoritos
const renderFavorites = () => {
  // Obtener los favoritos del localStorage
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  // Limpia el contenido del contenedor de favoritos
  favoritesContainer.innerHTML = '';

  // Filtra los productos favoritos y los renderiza
  const favoritesProducts = products.filter(product => favorites.includes(product.id.toString()));

  if (favoritesProducts.length === 0) {
    favoritesContainer.innerHTML = '<p>No tienes departamentos favoritos.</p>';
  } else {
    favoritesProducts.forEach(product => {
      const productCard = `
        <div class="card-product">
          <div class="container-img">
            <img src="${product.imageUrl}" alt="imagen Producto" />
          </div>
          <div class="content-card-product" data-product-id="${product.id}">
            <h3>${product.province}</h3>
            <h4>${product.city}</h4>
            <p>${product.description}</p>
            <p>${product.street}</p>
            <p>${product.year}</p>
            <div class="footer-card-product">
              <span class="price">${product.price}</span>
              <div class="container-buttons-card">
                <button class="favorite" data-id="${product.id}">
                  <i class="fa-solid fa-heart active" id="added-favorite-${product.id}"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      `;

      favoritesContainer.innerHTML += productCard;
    });
  }

  // Añadir event listeners a los botones de favoritos
  const favoriteButtons = document.querySelectorAll('.favorite');
  favoriteButtons.forEach(button => {
    button.addEventListener('click', removeFavorite);
  });
};

// Función para remover un favorito
const removeFavorite = (event) => {
  const button = event.currentTarget;
  const productId = button.dataset.id;

  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  favorites = favorites.filter(id => id !== productId);
  localStorage.setItem('favorites', JSON.stringify(favorites));

  // Re-renderizar los favoritos
  renderFavorites();
};
document.addEventListener('DOMContentLoaded', () => {
        const productsContainer = document.querySelector('.container-products');

        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        const showHTML = () => {
          productsContainer.innerHTML = '';

          favorites.forEach(product => {
            const productCard = `
              <div class="card-product">
                <div class="container-img">
                  <img src="${product.imageUrl}" alt="imagen Producto" />
                </div>
                <div class="content-card-product" data-product-id="${product.id}">
                  <h3>${product.province}</h3>
                  <h4>${product.city}</h4>
                  <p>${product.description}</p>
                  <p>${product.street}</p>
                  <p>${product.year}</p>
                  <div class="footer-card-product">
                    <span class="price">${product.price}</span>
                    <div class="container-buttons-card">
                      <button class="favorite">
                        <i class="fa-regular fa-heart" id="favorite-regular"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            `;

            productsContainer.innerHTML += productCard;
          });
        };

        showHTML();
      });

// Llama a la función para renderizar los favoritos
renderFavorites();