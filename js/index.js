/* Imports */
import { data } from "./data.js";

/* Variables */
const containerBestProducts = document.getElementById("container-products");
const galleryContainer = document.getElementById("gallery");
const containerSpecialProducts = document.getElementById(
  "container-special-products"
);
const containerBlogs = document.getElementById("container-blogs");
const loader1 = document.getElementById("loader1");
const loader2 = document.getElementById("loader2");
const loader3 = document.getElementById("loader3");
const loader4 = document.getElementById("loader4");
const messageEmptyDataBestProducts = document.getElementById(
  "messageBestProducts"
);
const messageEmptyDataGallery = document.getElementById("messageGallery");
const messageEmptyDataSpecialProducts = document.getElementById(
  "messageSpecialProducts"
);
const messageEmptyDataReview = document.getElementById("messageReview");

let selectedProducts = [];
/* Variables */

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

/* Best Products */
setTimeout(() => {
  loader1.style.display = "none";

  if (data.bestProducts && data.bestProducts.length > 0) {
    data.bestProducts.forEach((product) => {
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
      containerBestProducts.appendChild(productCard);
    });
  } else {
    messageEmptyDataBestProducts.style.display = "block";
  }

  loader1.style.display = "none";
  containerBestProducts.style.display = "grid";
}, 2000);
/* Best Products */

/* Galeria de imagenes */
setTimeout(() => {
  loader2.style.display = "none";

  if (data.gallery && data.gallery.length > 0) {
    data.gallery.forEach((item) => {
      const imgElement = document.createElement("img");
      imgElement.src = item.imgGalleryPath;
      imgElement.alt = item.imgGalleryAlt;
      galleryContainer.appendChild(imgElement);
    });
  } else {
    messageEmptyDataGallery.style.display = "block";
  }

  loader2.style.display = "none";
  galleryContainer.style.display = "grid";
}, 2000);
/* Galeria de imagenes */

/* Special Products */
setTimeout(() => {
  loader3.style.display = "none";

  if (data.specialProducts && data.specialProducts.length > 0) {
    data.specialProducts.forEach((product) => {
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
      containerSpecialProducts.appendChild(productCard);
    });
  } else {
    messageEmptyDataSpecialProducts.style.display = "block";
  }

  loader3.style.display = "none";
  containerSpecialProducts.style.display = "grid";
}, 2000);
/* Special Products */

/* Reviews */
setTimeout(() => {
  loader4.style.display = "none";

  if (data.reviews && data.reviews.length > 0) {
    data.reviews.forEach((review) => {
      const cardBlog = document.createElement("div");
      cardBlog.classList.add("card-blog");

      const containerImg = document.createElement("div");
      containerImg.classList.add("container-img");

      const img = document.createElement("img");
      img.src = review.imgReviewPath;
      img.alt = review.imgAlt;

      containerImg.appendChild(img);

      const contentBlog = document.createElement("div");
      contentBlog.classList.add("content-blog");

      const title = document.createElement("h3");
      title.textContent = review.title;
      contentBlog.appendChild(title);

      const description = document.createElement("p");
      description.textContent = review.description;

      contentBlog.appendChild(description);
      cardBlog.appendChild(containerImg);
      cardBlog.appendChild(contentBlog);
      containerBlogs.appendChild(cardBlog);
    });
  } else {
    messageEmptyDataReview.style.display = "block";
  }

  loader4.style.display = "none";
  containerBlogs.style.display = "grid";
}, 2000);
/* Reviews */
