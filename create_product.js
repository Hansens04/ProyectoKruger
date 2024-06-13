// Shared Tailwind CSS classes
const inputClasses = "shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 dark:text-zinc-300 leading-tight focus:outline-none focus:shadow-outline";
const labelClasses = "block text-zinc-700 dark:text-zinc-300 text-sm font-bold mb-2";
const buttonClasses = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline";
const errorClasses = "text-red-500 text-xs italic";

// Create a new web component for the department form
class NewDepartment extends HTMLElement {
    connectedCallback() {
        this.render();
        this.querySelector('form').addEventListener('submit', this.handleSubmit.bind(this));
        this.querySelector('#image-input').addEventListener('change', this.handleImageChange);
        document.getElementById('clearStorage').addEventListener('click', this.clearLocalStorage);
    }

    render() {
        this.innerHTML = `
            <div class="bg-white dark:bg-zinc-800 min-h-screen flex flex-col items-center justify-center p-4">
                <h1 class="text-2xl font-bold text-zinc-800 dark:text-zinc-200 mb-4">Create a New Department</h1>
                <form id="product-form" class="w-full max-w-md" novalidate>
                    <div class="flex flex-wrap -mx-3 mb-6">
                        ${this.createInput("City", "city", "text", "Enter city", true)}
                        ${this.createInput("Street Name", "street-name", "text", "Enter street name", true)}
                        ${this.createInput("Street Number", "street-number", "number", "Enter street number", true)}
                        ${this.createInput("Area Size", "area-size", "number", "Enter area size", true)}
                        ${this.createSelect("Has AC", "has-ac", ["true", "false"], ["Yes", "No"], true)}
                        ${this.createInput("Year Built", "year-built", "number", "Enter year built", true)}
                        ${this.createInput("Rent Price", "rent-price", "number", "Enter rent price", true)}
                        ${this.createInput("Date Available", "date-available", "date", "", true)}
                        ${this.createFileInput("Image", "image-input", true)}
                    </div>
                    <div id="error-message" class="${errorClasses}"></div>
                    <button type="submit" class="${buttonClasses}">Create Department</button>
                </form>
            </div>
        `;
    }

    createInput(labelText, id, type, placeholder, required = false) {
        return `
            <div class="w-full px-3 mb-6">
                <label for="${id}" class="${labelClasses}">${labelText}</label>
                <input type="${type}" id="${id}" name="${id}" class="${inputClasses}" placeholder="${placeholder}" ${required ? 'required' : ''}>
            </div>
        `;
    }

    createSelect(labelText, id, values, options, required = false) {
        const optionsHtml = options.map((option, index) => `<option value="${values[index]}">${option}</option>`).join('');
        return `
            <div class="w-full px-3 mb-6">
                <label for="${id}" class="${labelClasses}">${labelText}</label>
                <select id="${id}" name="${id}" class="${inputClasses}" ${required ? 'required' : ''}>
                    ${optionsHtml}
                </select>
            </div>
        `;
    }

    createFileInput(labelText, id, required = false) {
        return `
            <div class="w-full px-3 mb-6">
                <label for="${id}" class="${labelClasses}">${labelText}</label>
                <input type="file" id="${id}" name="${id}" class="${inputClasses}" ${required ? 'required' : ''}>
            </div>
        `;
    }

    handleSubmit(event) {
        event.preventDefault(); // Evita el envío del formulario

        // Crear un nuevo objeto de producto con los valores del formulario
        const newProduct = {
            city: document.getElementById('city').value,
            streetName: document.getElementById('street-name').value,
            streetNumber: document.getElementById('street-number').value,
            areaSize: document.getElementById('area-size').value,
            hasAC: document.getElementById('has-ac').value === 'true',
            yearBuilt: document.getElementById('year-built').value,
            rentPrice: document.getElementById('rent-price').value,
            dateAvailable: document.getElementById('date-available').value,
            imageUrl: localStorage.getItem('productImageUrl') // Obtener la URL de la imagen almacenada en localStorage
        };

        // Validar el producto
        if (this.validateProduct(newProduct)) {
            // Añadir el nuevo producto a la lista de productos
            products.push(newProduct);
            // Guardar los productos actualizados en el localStorage
            localStorage.setItem('products', JSON.stringify(products));
            // Renderizar los productos actualizados
            renderProducts();
            // Restablecer el formulario
            this.querySelector('form').reset();
        } else {
            // Mostrar una alerta si algún campo del formulario está vacío
            this.querySelector('#error-message').textContent = 'Por favor completa todos los campos.';
        }
    }

    validateProduct(product) {
        // Comprobar que todos los campos obligatorios están llenos
        return (
            product.city &&
            product.streetName &&
            product.streetNumber &&
            product.areaSize &&
            product.yearBuilt &&
            product.rentPrice &&
            product.dateAvailable &&
            product.imageUrl
        );
    }

    handleImageChange(event) {
        const file = event.target.files[0];
        if (!file) return; // No se seleccionó ningún archivo

        const reader = new FileReader();
        reader.onload = function(event) {
            const imageUrl = event.target.result;
            // Almacenar la URL de la imagen en el localStorage
            localStorage.setItem('productImageUrl', imageUrl);
        };
        reader.readAsDataURL(file);
    }

    clearLocalStorage() {
        // Limpiar el localStorage
        localStorage.clear();
        // Aquí puedes agregar cualquier otra lógica que desees después de limpiar el localStorage
        console.log('¡LocalStorage limpiado!');
        // Actualizar la visualización de los productos
        renderProducts();
    }
}

customElements.define('new-department', NewDepartment);

// Selecciona el formulario y el contenedor donde se mostrarán los productos
const productsContainer = document.querySelector('.container-products');

// Recupera los productos del localStorage, si no hay productos, inicializa como un array vacío
let products = JSON.parse(localStorage.getItem('products')) || [];

// Función para renderizar los productos
const renderProducts = () => {
    // Vacía el contenedor de productos
    productsContainer.innerHTML = '';

    // Iterar sobre cada producto y crear una tarjeta de producto
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('card-product', 'border', 'p-3', 'm-2', 'rounded', 'shadow-md');

        const contentCardProduct = document.createElement('div');
        contentCardProduct.classList.add('content-card-product');

        // Crear y añadir el título de la tarjeta (city, street name, and street number)
        const title = document.createElement('h3');
        title.classList.add('font-bold', 'text-xl', 'mb-2');
        title.textContent = `${product.city}, ${product.streetName} ${product.streetNumber}`;
        contentCardProduct.appendChild(title);

        // Crear y añadir la imagen del producto
        const image = document.createElement('img');
        image.src = product.imageUrl; // Utiliza la URL de la imagen almacenada en el producto
        image.classList.add('w-50', 'h-50', 'object-cover', 'mb-4'); // Ajustar el tamaño de la imagen
        contentCardProduct.appendChild(image);

        // Crear y añadir la descripción del producto
        const description = document.createElement('p');
        description.textContent = `
          Area Size: ${product.areaSize} sqm
          Has AC: ${product.hasAC ? 'Yes' : 'No'}
          Year Built: ${product.yearBuilt}
          Rent Price: $${product.rentPrice}
          Date Available: ${new Date(product.dateAvailable).toLocaleDateString('es-ES')}
        `;
        contentCardProduct.appendChild(description);

        // Añadir la tarjeta de producto al contenedor de productos
        productCard.appendChild(contentCardProduct);
        productsContainer.appendChild(productCard);
    });
};

// Renderiza los productos al cargar la página
renderProducts();