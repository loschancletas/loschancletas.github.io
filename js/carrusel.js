var imagenes = [];
var cont = 0;
let totalLines = 0;

let autoSlideTimeout = null;
function carrousel(contenedor) {
  contenedor.addEventListener("click", (e) => {
    let atras = contenedor.querySelector(".atras"),
      adelante = contenedor.querySelector(".adelante"),
      img = contenedor.querySelector("img"),
      tgt = e.target;
    if (tgt == atras) {
      if (cont > 0) {
        img.src = imagenes[cont - 1];
        cont--;
      } else {
        img.src = imagenes[imagenes.length - 1];
        cont = imagenes.length - 1;
      }
    }
    if (tgt == adelante) {
      if (cont < imagenes.length - 1) {
        img.src = imagenes[cont + 1];
        cont++;
      } else {
        img.src = imagenes[0];
        cont = 0;
      }
    }
  });
}
function next() {
  let contenedor = document.querySelector(".contenedor");
  let img = contenedor.querySelector("img");
  img.style.marginTop = "0%";
  img.style.transition = "margin-left 3s linear";
  if (cont < imagenes.length - 1) {
    img.src = imagenes[cont + 1];
    cont++;
  } else {
    img.src = imagenes[0];
    cont = 0;
  }
  resetAutoSlide();
}

cargadatos();
document.addEventListener("DOMContentLoaded", () => {
  let contenedor = document.querySelector(".contenedor");
  contenedorHover();
  carrousel(contenedor);
});

function cargadatos() {
  fetch("/img/santiago/fotosSantiago.txt")
    .then((response) => response.text())
    .then((data) => {
      const lines = data.split(/\r?\n/).filter((line) => line.trim() !== "");
      let html = "";
      lines.forEach((line, index) => {
        if (index > 0 && esValidaInput(line)) {
          if (index == 1) {
            document.querySelector("img").src = line;
          }
          totalLines++;
          const prevLine = lines[index - 1];
          const nombre = prevLine.split(",")[0] || "Sin nombre";
          html += `
        <div class="slide">
              <a href="${line}" target="_blank" title="${nombre}" name="${nombre}">
              <img src="${line}" alt="pausa" />
              </a>
              <h3>${totalLines}</h3>
              </div>
          `;
          imagenes.push(line);
        }
      });
    })
    .catch((error) => console.error("Error al cargar el archivo:", error));
}
function esValidaInput(url) {
  const input = document.createElement("input");
  input.type = "url";
  input.value = url;
  return input.checkValidity();
}
function resetAutoSlide() {
  clearTimeout(autoSlideTimeout);
  setTimeout(() => {}, 1000);
  autoSlideTimeout = setTimeout(() => {
    next();
  }, 2000);
}
function contenedorHover() {
  let contenedor = document.querySelector("img");
  let texto = document.querySelector(".texto-flotante");
  contenedor.addEventListener("mouseenter", (e) => {
    texto.style.opacity = "1";
    clearTimeout(autoSlideTimeout);
  });

  contenedor.addEventListener("mouseleave", (e) => {
    texto.style.opacity = "0";
    resetAutoSlide();
  });
  // let contenedorpadre = document.querySelector(".contenedor");
  // contenedorpadre.addEventListener("mouseenter", (e) => {
  //   console.log("El mouse entró en el contenedor");
  //   contenedor.classList.add("activo");
  // });
}
