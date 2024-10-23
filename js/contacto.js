/* Contact Form */
const form = document.getElementById("contact-form");
const formButton = document.getElementById("form-button");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const message = document.getElementById("message");
const nameError = document.getElementById("name-error");
const firstCharError = document.getElementById("first-char-error");
const emailError = document.getElementById("email-error");
const incompleteNameError = document.getElementById("incomplete-name-error");
const incompleteEmailError = document.getElementById("incomplete-email-error");
const incompleteMessageError = document.getElementById(
  "incomplete-message-error"
);
const modal = document.getElementById("gracias");

// Expresiones regulares
const nameRegex = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü][A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]*$/;
const firstCharRegex = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü]/;
const emailRegex =
  /^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/;

// Validación del estado de los campos
const checkFormValidity = () => {
  const nameValue = nameInput.value.trim();
  const emailValue = emailInput.value.trim();
  const messageValue = message.value.trim();

  const isNameValid = nameRegex.test(nameValue);
  const isEmailValid = emailRegex.test(emailValue);
  const isMessageValid = messageValue !== "";

  // Habilitar el boton Enviar del formulario
  if (isNameValid && isEmailValid && isMessageValid) {
    formButton.classList.add("active");
  } else {
    formButton.classList.remove("active");
  }
};

// Función debounce
const debounce = (fn, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

// Validación genérica
const validateInput = (input, regex, errorElement) => {
  const value = input.value.trim();
  if (value === "") {
    errorElement.classList.remove("active");
  } else if (!regex.test(value)) {
    errorElement.classList.add("active");
  } else {
    errorElement.classList.remove("active");
  }
};

// Validación del campo Nombre
nameInput.addEventListener(
  "input",
  debounce(() => {
    const nameValue = nameInput.value.trim();

    if (nameValue === "") {
      nameError.classList.remove("active");
      firstCharError.classList.remove("active");
    } else {
      if (!firstCharRegex.test(nameValue)) {
        firstCharError.classList.add("active");
      } else {
        firstCharError.classList.remove("active");
      }

      validateInput(nameInput, nameRegex, nameError);
    }

    checkFormValidity();
  }, 500)
);

// Validación del campo Email
emailInput.addEventListener(
  "input",
  debounce(() => {
    validateInput(emailInput, emailRegex, emailError);
    checkFormValidity();
  }, 500)
);

// Validación del campo Message
message.addEventListener("input", checkFormValidity);

// Enviar Formulario
form.addEventListener("submit", (e) => {
  e.preventDefault();
  // Obtener valores de los campos
  const nameValue = nameInput.value.trim();
  const emailValue = emailInput.value.trim();
  const messageValue = message.value.trim();

  // Comprobar si los campos están vacíos
  const isNameEmpty = nameValue === "";
  const isEmailEmpty = emailValue === "";
  const isMessageEmpty = messageValue === "";

  // Comprobar si los campos son validos
  const isNameValid = nameRegex.test(nameValue);
  const isEmailValid = emailRegex.test(emailValue);

  if (isNameEmpty) {
    incompleteNameError.classList.add("active");
  } else {
    incompleteNameError.classList.remove("active");
  }

  if (isEmailEmpty) {
    incompleteEmailError.classList.add("active");
  } else {
    incompleteEmailError.classList.remove("active");
  }

  if (isMessageEmpty) {
    incompleteMessageError.classList.add("active");
  } else {
    incompleteMessageError.classList.remove("active");
  }

  // Si todos los campos estan vacios no enviar el formulario
  if (isNameEmpty || isEmailEmpty || isMessageEmpty) {
    return;
  }

  // Si los campos son validos iniciar el proceso de envio
  if (isNameValid && isEmailValid) {
    const loader = document.getElementById("loader7");
    loader.style.display = "flex";

    fetch("https://formsubmit.co/ajax/lasrecetasdemama123@gmail.com", {
      method: "POST",
      body: new FormData(e.target),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then(() => {
        modal.classList.add("active");
        form.reset();
      })
      .catch((err) => {
        const message =
          err.statusText || "Ocurrió un error, intente nuevamente";
        Swal.fire({
          icon: "error",
          title: `Error ${err.status}`,
          text: message,
          confirmButtonText: "Aceptar",
        });
        form.reset();
      })
      .finally(() => {
        loader.style.display = "none";
        setTimeout(() => {
          modal.classList.remove("active");
        }, 2000);
      });
  } else {
    if (!isNameValid) nameError.classList.add("active");
    if (!isEmailValid) emailError.classList.add("active");
  }
});
/* Contact Form */

/*
emailjs.init("service_0vapwx9");

document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    document.getElementById("loader7").classList.remove("none");

    const formData = new FormData(event.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", data).then(
      (response) => {
        console.log("SUCCESS!", response.status, response.text);
        document.getElementById("loader7").classList.add("none");
        Swal.fire({
          title: "Mensaje enviado!",
          text: "Tu mensaje ha sido enviado correctamente.",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        event.target.reset();
      },
      (error) => {
        console.error("FAILED...", error);
        document.getElementById("loader7").classList.add("none");
        Swal.fire({
          title: "Error!",
          text: "Hubo un problema al enviar tu mensaje.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    );
  });
*/
