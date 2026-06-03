let totalLines = 0;
let cantidadSlides = 1;
let autoSlideTimeout = null;
const mediaQuery = window.matchMedia("(max-width: 768px)");
// Escuchar cambios
mediaQuery.addEventListener("change", handleScreenChange);
// Ejecutar la función inicialmente para establecer el estado actual
window.onload = function () {
  cargadatos();
  handleScreenChange(mediaQuery);
  ocultaanterior();
};
// Función que se ejecuta cuando cambia la condición
function handleScreenChange(event) {
  if (event.matches) {
    console.log("Modo móvil (< 768px)");
    document.querySelector(".slider-track").style.marginLeft = `0%`;
    document.querySelector(".slider-track").style.marginTop =
      `${cantidadSlides * -100.63 + 100.63}%`;
    cargarbotonesmovil();
    resetAutoSlide2();
  } else {
    console.log("Modo escritorio (> 768px)");
    document.querySelector(".slider-track").style.marginTop = `0%`;
    document.querySelector(".slider-track").style.marginLeft =
      `${cantidadSlides * -100 + 100}%`;
    cargarbotones();
    resetAutoSlide();
  }
}
// Cargar datos desde archivo y mostrar
function cargadatos() {
  fetch("/js/fotosOporto.txt")
    .then((response) => response.text())
    .then((data) => {
      const lines = data.split(/\r?\n/).filter((line) => line.trim() !== "");
      let html = "";
      lines.forEach((line, index) => {
        if (index > 0 && esValidaInput(line)) {
          totalLines++;
          const prevLine = lines[index - 1];
          const nombre = prevLine.split(",")[0] || "Sin nombre";
          // Mostrar enlace en el DOM
          html += `
        <div class="slide">
              <a href="${line}" target="_blank" title="${nombre}" name="${nombre}">
              <img src="${line}" alt="icono" />
              </a>
              <h3>${totalLines}</h3>
              </div>
          `;
        }
      });
      document.querySelector(".slider-track").innerHTML = html;
    })
    .catch((error) => console.error("Error al cargar el archivo:", error));
}
function esValidaInput(url) {
  const input = document.createElement("input");
  input.type = "url";
  input.value = url;
  return input.checkValidity();
}
function prev() {
  const galleryContainer = document.querySelector(".slider-track");
  galleryContainer.style.marginLeft = `${cantidadSlides * -100 + 200}%`;
  console.log(cantidadSlides);
  if (cantidadSlides <= 2) {
    ocultaanterior();
  } else {
    mostraranterior();
  }
  mostrarsiguiente();
  cantidadSlides--;
  resetAutoSlide();
}
function next() {
  const galleryContainer = document.querySelector(".slider-track");
  galleryContainer.style.marginLeft = `${cantidadSlides * -100}%`;
  galleryContainer.style.transition = "margin-left 1s linear";

  if (cantidadSlides >= totalLines - 1) {
    ocultasiguiente();
  } else if (cantidadSlides <= 1) {
    ocultaanterior();
    resetAutoSlide();
  } else {
    mostrarsiguiente();
    resetAutoSlide();
  }
  cantidadSlides++;
  mostraranterior();
  document.getElementById("siguiente").style.backgroundColor = "white";
}
function resetAutoSlide() {
  clearTimeout(autoSlideTimeout);
  setTimeout(() => {
    document.getElementById("siguiente").style.backgroundColor = "green";
  }, 2000);
  autoSlideTimeout = setTimeout(() => {
    next();
  }, 3000);
}
function resetAutoSlide2() {
  clearTimeout(autoSlideTimeout);
  setTimeout(() => {
    document.getElementById("siguiente").style.backgroundColor = "green";
  }, 2000);
  autoSlideTimeout = setTimeout(() => {
    nextmovil();
  }, 3000);
}
function ocultasiguiente() {
  const siguienteBtn = document.getElementById("siguiente");
  siguienteBtn.style.visibility = "hidden";
  siguienteBtn.style.pointerEvents = "none";
}
function mostraranterior() {
  const anteriorBtn = document.getElementById("anterior");
  anteriorBtn.style.visibility = "visible";
  anteriorBtn.style.pointerEvents = "auto";
}
function mostrarsiguiente() {
  const siguienteBtn = document.getElementById("siguiente");
  siguienteBtn.style.visibility = "visible";
  siguienteBtn.style.pointerEvents = "auto";
  siguienteBtn.style.backgroundColor = "rgba(255, 255, 255, 0.7)";
}
function ocultaanterior() {
  const anteriorBtn = document.getElementById("anterior");
  if (anteriorBtn) {
    anteriorBtn.style.visibility = "hidden";
    anteriorBtn.style.pointerEvents = "none";
  }
}

function nextmovil() {
  const galleryContainer = document.querySelector(".slider-track");
  galleryContainer.style.marginTop = `${cantidadSlides * -100.63}%`;
  // galleryContainer.style.marginTop = `${cantidadSlides * -101.88}%`;
  galleryContainer.style.transition = "margin-top 1s linear";
  if (cantidadSlides >= totalLines - 1) {
    ocultasiguiente();
  } else if (cantidadSlides <= 2) {
    ocultaanterior();
    mostrarsiguiente();
    resetAutoSlide2();
  } else {
    mostrarsiguiente();
    resetAutoSlide2();
  }
  cantidadSlides++;
  mostraranterior();
}
function prevmovil() {
  const galleryContainer = document.querySelector(".slider-track");
  galleryContainer.style.marginTop = `${cantidadSlides * -100.63 + 100.63 * 2}%`;
  // galleryContainer.style.marginTop = `${cantidadSlides * -101.88 + 101.88 * 2}%`;
  if (cantidadSlides >= totalLines - 1) {
    ocultasiguiente();
  } else {
    mostrarsiguiente();
    resetAutoSlide2();
  }
  cantidadSlides--;
  mostraranterior();
}
function cargarbotonesmovil() {
  document.querySelector(".botones").innerHTML = `
          <button onclick="prevmovil()" id="anterior">↑</button>
          <button onclick="nextmovil()" id="siguiente">↓</button>
        `;
}
function cargarbotones() {
  document.querySelector(".botones").innerHTML = `
          <button onclick="prev()" id="anterior">&larr;</button>
          <button onclick="next()" id="siguiente">&rarr;</button>`;
}
