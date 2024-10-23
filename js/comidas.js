/* Imports */
import { data } from "./data.js";

/* Variables */
const containerAllDinners = document.getElementById("container-all-lunches");
const loader6 = document.getElementById("loader5");
const messageEmptyDataAllDinners = document.getElementById("messageAllLunches");
const searchInput = document.getElementById("searchInput1");
let selectedProducts = [];
/* Variables */

// Mostrar/Ocultar Loader
const displayLoader = (show) => {
  loader6.style.display = show ? "flex" : "none";
  containerAllDinners.style.display = show ? "none" : "grid";
};

// Mostrar/Ocultar mensaje
const displayMessage = (show) => {
  messageEmptyDataAllDinners.style.display = show ? "block" : "none";
};

/* Función para enviar pedido por WhatsApp */
const redirectToWhatsApp = () => {
  const whatsappNumber = "541122553067";
  const productList = selectedProducts.map(
    (product) => `${product.title} - ${product.price}`
  );

  let formattedList = "";
  if (productList.length === 1) {
    formattedList = productList[0];
  } else if (productList.length === 2) {
    formattedList = productList.join(" y ");
  } else if (productList.length > 2) {
    formattedList =
      productList.slice(0, -1).join(", ") +
      " y " +
      productList[productList.length - 1];
  }

  const message = `Hola, me gustaría realizar el siguiente pedido:\n${formattedList}`;
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;

  window.open(whatsappLink, "_blank");
};

// Renderizar las comidas en el contenedor
const renderProducts = (products) => {
  containerAllDinners.innerHTML = ""; // Limpiar las comidas anteriores

  if (products.length > 0) {
    products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("card-product");

      const containerImg = document.createElement("div");
      containerImg.classList.add("container-img");

      const img = document.createElement("img");
      img.src = product.imgPath;
      img.alt = product.title;

      containerImg.appendChild(img);

      const contentCard = document.createElement("div");
      contentCard.classList.add("content-card-product");

      const title = document.createElement("h3");
      title.textContent = product.title;

      const price = document.createElement("p");
      price.classList.add("price");
      price.textContent = product.price;

      const button = document.createElement("button");
      button.classList.add("btn-product");
      button.textContent = "Comprar";
      button.onclick = () => {
        // Confirmación antes de agregar
        Swal.fire({
          title: `¿Desea agregar ${product.title} al pedido?`,
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Sí",
          cancelButtonText: "No",
        }).then((result) => {
          if (result.isConfirmed) {
            selectedProducts.push(product);

            // Mostrar mensaje de agregado
            Swal.fire({
              title: `${product.title} ha sido agregado a su pedido.`,
              icon: "success",
              confirmButtonText: "OK",
            }).then(() => {
              // Preguntar si quiere seguir agregando productos
              Swal.fire({
                title: "¿Desea agregar otro producto?",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Sí",
                cancelButtonText: "No",
              }).then((result) => {
                if (!result.isConfirmed) {
                  // Si no quiere continuar, preguntar si desea enviar el pedido
                  Swal.fire({
                    title: "¿Desea enviar su pedido por WhatsApp?",
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonText: "Sí",
                    cancelButtonText: "No",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      redirectToWhatsApp();
                    }
                  });
                }
              });
            });
          } else {
            return;
          }
        });
      };

      contentCard.appendChild(title);
      contentCard.appendChild(price);
      contentCard.appendChild(button);
      productCard.appendChild(containerImg);
      productCard.appendChild(contentCard);
      containerAllDinners.appendChild(productCard);
    });
    displayMessage(false);
  } else {
    displayMessage(true);
  }
};

// Filtrar las comidas en función del término de búsqueda
const filterProducts = (searchTerm) => {
  const filteredProducts = data.allDinners.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  renderProducts(filteredProducts);
};

// Comportamiento del input al hacer la búsqueda
searchInput.addEventListener("input", () => {
  displayLoader(true);
  setTimeout(() => {
    const searchTerm = searchInput.value.trim();
    filterProducts(searchTerm);
    displayLoader(false);
  }, 500);
});

// Mostrar las comidas inicialmente después de cargar los datos
setTimeout(() => {
  if (data.allDinners && data.allDinners.length > 0) {
    renderProducts(data.allDinners);
    displayLoader(false);
  } else {
    displayLoader(false);
    displayMessage(true);
  }
}, 2000);
