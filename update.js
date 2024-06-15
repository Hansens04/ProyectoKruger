document.addEventListener('DOMContentLoaded', () => {
  const updateForm = document.getElementById('updateForm');
  const updateButton = document.getElementById('updateButton');

  const updateEmail = document.getElementById('updateEmail');
  const currentPassword = document.getElementById('currentPassword');
  const newPassword = document.getElementById('newPassword');
  const confirmPassword = document.getElementById('confirmPassword');

  const updateEmailError = document.getElementById('updateEmailError');
  const currentPasswordError = document.getElementById('currentPasswordError');
  const newPasswordError = document.getElementById('newPasswordError');
  const confirmPasswordError = document.getElementById('confirmPasswordError');
  const validationMessage = document.getElementById('validationMessage');

  updateButton.addEventListener('click', (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del botón
    let valid = true;

    // Validaciones de campos...
    if (updateEmail.value === '') {
      updateEmailError.style.display = 'block';
      valid = false;
    } else {
      updateEmailError.style.display = 'none';
    }

    if (currentPassword.value === '') {
      currentPasswordError.style.display = 'block';
      valid = false;
    } else {
      currentPasswordError.style.display = 'none';
    }

    if (newPassword.value === '') {
      newPasswordError.style.display = 'block';
      valid = false;
    } else {
      newPasswordError.style.display = 'none';
    }

    if (confirmPassword.value !== newPassword.value) {
      confirmPasswordError.style.display = 'block';
      valid = false;
    } else {
      confirmPasswordError.style.display = 'none';
    }

    if (valid) {
      // Obtener usuarios del localStorage
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const storedUser = users.find(user => user.email === updateEmail.value);

      if (storedUser && storedUser.password === currentPassword.value) {
        if (validatePassword(newPassword.value)) {
          // Actualizar la contraseña del usuario
          storedUser.password = newPassword.value;
          // Guardar los usuarios actualizados en localStorage
          localStorage.setItem('users', JSON.stringify(users));
          alert('Datos actualizados exitosamente');
          // Limpiar los campos del formulario
          updateForm.reset();
        } else {
          validationMessage.textContent = 'La nueva contraseña no cumple con los requisitos';
          validationMessage.style.display = 'block';
        }
      } else {
        alert('Correo electrónico o contraseña actual incorrectos');
      }
    }
  });

  function validatePassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecialChars = /[!@#\$%\^\&*\)\(+=._-]/.test(password);
  
    if (password.length < minLength) {
      validationMessage.textContent = 'La contraseña debe tener al menos ' + minLength + ' caracteres';
      validationMessage.style.display = 'block';
      return false;
    }
    if (!hasUpperCase) {
      validationMessage.textContent = 'La contraseña debe tener al menos una letra mayúscula';
      validationMessage.style.display = 'block';
      return false;
    }
    if (!hasLowerCase) {
      validationMessage.textContent = 'La contraseña debe tener al menos una letra minúscula';
      validationMessage.style.display = 'block';
      return false;
    }
    if (!hasNumbers) {
      validationMessage.textContent = 'La contraseña debe tener al menos un número';
      validationMessage.style.display = 'block';
      return false;
    }
    if (!hasSpecialChars) {
      validationMessage.textContent = 'La contraseña debe tener al menos un carácter especial';
      validationMessage.style.display = 'block';
      return false;
    }
  
    validationMessage.style.display = 'none';
    return true;
  }
});

