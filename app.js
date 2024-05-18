const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

document.getElementById("signUpButton").addEventListener("click", function(event) {
  event.preventDefault();

  var name = document.querySelector('input[placeholder="Nombre"]').value;
  var email = document.getElementById("signUpEmail").value;
  var password = document.getElementById("signUpPassword").value;

  if (name && email && password) {
    alert("Registro completado exitosamente");
    // Aquí puedes agregar el código para guardar los datos del usuario
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
  } else {
    alert("Por favor, completa todos los campos");
  }
});

document.getElementById("signInButton").addEventListener("click", function(event) {
  event.preventDefault();
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  // Verificar que los datos ingresados coinciden con los almacenados en Local Storage
  if (localStorage.getItem("email") === email && localStorage.getItem("password") === password) {
    alert("Inicio de sesión exitoso");
    // Guardar la información de inicio de sesión en el Local Storage
    localStorage.setItem("isLoggedIn", true);
    // Redirigir al usuario a la página home.html después de un breve retraso
    setTimeout(function() {
      window.location.href = "/home.html";
    }, 1000); // Redirige después de 2 segundos

  } else {
    alert("Correo electrónico o contraseña incorrectos. Por favor, inténtalo de nuevo.");
  }
});



function showModal(modalId) {
  var modal = document.getElementById(modalId);
  var span = modal.querySelector(".close");

  modal.style.display = "block";

  span.onclick = function() {
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}

function closeModal(modalId) {
  var modal = document.getElementById(modalId);
  modal.style.display = "none";
}