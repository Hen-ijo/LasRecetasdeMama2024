/* Imports */
import { data } from "./data.js";

/* Variables */
const containerAllDinners = document.getElementById("container-all-lunches");
const loader6 = document.getElementById("loader5");
const messageEmptyDataAllDinners = document.getElementById("messageAllLunches");
const searchInput = document.getElementById("searchInput1");
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

      const button = document.createElement("a");
      button.classList.add("btn-product");
      button.href = product.link;
      button.textContent = "Comprar";

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

// Comportamiento del input al hacer la busqueda
searchInput.addEventListener("input", () => {
  displayLoader(true);
  setTimeout(() => {
    const searchTerm = searchInput.value.trim();
    filterProducts(searchTerm);
    displayLoader(false);
  }, 500);
});

// Mostrar las comidas inicialmente despues de cargar los datos
setTimeout(() => {
  if (data.allDinners && data.allDinners.length > 0) {
    renderProducts(data.allDinners);
    displayLoader(false);
  } else {
    displayLoader(false);
    displayMessage(true);
  }
}, 2000);
