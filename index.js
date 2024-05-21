// Selecciona los elementos del DOM y los asigna a variables
const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

// Agrega un event listener al botón "Sign Up" que agrega la clase "right-panel-active"
// al elemento "container", lo cual cambia la vista a la sección de registro
signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

// Agrega un event listener al botón "Sign In" que remueve la clase "right-panel-active"
// del elemento "container", lo cual cambia la vista a la sección de inicio de sesión
signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

// Función para calcular la edad a partir de la fecha de nacimiento
function calculateAge(birthdate) {
  const today = new Date();
  const birthDate = new Date(birthdate);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

// Agrega un event listener al botón "Sign Up" del formulario de registro
document.getElementById("signUpButton").addEventListener("click", function(event) {
  // Previene el comportamiento predeterminado del formulario
  event.preventDefault();

  // Obtiene los valores de los campos de entrada
  var primernombre = document.getElementById("signUpfirst").value;
  var apellido = document.getElementById("signUplastname").value;
  var email = document.getElementById("signUpEmail").value;
  var fechaNacimiento = document.getElementById("singUpdate").value;
  var password = document.getElementById("signUpPassword").value;

  // Verifica que todos los campos estén llenos
  if (primernombre && apellido && email && fechaNacimiento && password) {
    // Verifica si la edad es mayor o igual a 18 años
    if (calculateAge(fechaNacimiento) >= 18) {
      // Muestra una alerta de "Registro completado exitosamente"
      alert("Registro completado exitosamente");
      // Guarda los datos en el localStorage
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
    } else {
      // Muestra una alerta de "Debes ser mayor de 18 años para registrarte"
      alert("Debes ser mayor de 18 años para registrarte");
    }
  } else {
    // Muestra una alerta de "Por favor, completa todos los campos"
    alert("Por favor, completa todos los campos");
  }
});

// Agrega un event listener al botón "Sign In" del formulario de inicio de sesión
document.getElementById("signInButton").addEventListener("click", function(event) {
  // Previene el comportamiento predeterminado del formulario
  event.preventDefault();
  // Obtiene los valores de los campos de correo electrónico y contraseña
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  // Verifica que los valores ingresados coincidan con los almacenados en el localStorage
  if (localStorage.getItem("email") === email && localStorage.getItem("password") === password) {
    // Muestra una alerta de "Inicio de sesión exitoso"
    alert("Inicio de sesión exitoso");
    // Guarda un indicador de inicio de sesión en el localStorage
    localStorage.setItem("isLoggedIn", true);
    // Redirige al usuario a la página "home.html" después de 1 segundo
    setTimeout(function() {
      window.location.href = "/home.html";
    }, 1000);
  } else {
    // Muestra una alerta de "Correo electrónico o contraseña incorrectos"
    alert("Correo electrónico o contraseña incorrectos. Por favor, inténtalo de nuevo.");
  }
});

// Función para mostrar un modal (ventana emergente)
function showModal(modalId) {
  // Selecciona el elemento modal y el botón de cierre
  var modal = document.getElementById(modalId);
  var span = modal.querySelector(".close");

  // Muestra el modal
  modal.style.display = "block";

  // Agrega un event listener al botón de cierre del modal
  span.onclick = function() {
    modal.style.display = "none";
  }

  // Agrega un event listener al documento para cerrar el modal al hacer clic fuera de él
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}

// Función para cerrar un modal
function closeModal(modalId) {
  // Selecciona el elemento modal y lo oculta
  var modal = document.getElementById(modalId);
  modal.style.display = "none";
}
