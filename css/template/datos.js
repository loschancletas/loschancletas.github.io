let totalLines = 0;
let cantidadSlides = 1;
let autoSlideTimeout = null;
let moviltotalLines = 10;
window.onload = function () {
  // detectarDispositivo();
  cargadatos();
  reproductor.volume = 0.25;
  resetAutoSlide();
};
function cargadatos() {
  fetch("fotosOporto.txt")
    .then((response) => response.text())
    .then((data) => {
      const lines = data.split(/\r?\n/).filter((line) => line.trim() !== "");
      let html = "";
      let menu = "";
      lines.forEach((line, index) => {
        if (index > 0 && esValidaInput(line)) {
          totalLines++;
          const prevLine = lines[index - 1];
          const nombre = prevLine.split(",")[0] || "Sin nombre";
          html += cargaImage(totalLines, line);
          if (totalLines < moviltotalLines) {
            if (totalLines === 1) {
              menu += selectMenu(totalLines);
            } else {
              menu += cargaMenu(totalLines, nombre);
            }
          }
        }
      });
      document.querySelector(".slider").innerHTML = html;
      document.querySelector(".menu").innerHTML = menu;
      // seleccionarMenu();
    })
    .catch((error) => console.error("Error al cargar el archivo:", error));
}
function cargaImage(total, refImage) {
  let html = `
    <li id="slide${total}">
      <a href="${refImage}" target="_blank" title="${total}" name="${total}">
      <img src="${refImage}" alt="icono" />
      </a>
    </li>
  `;
  // <h1>${totalLines}</h1>
  return html;
}
function cargaMenu(total, titulo) {
  let menu = `
    <li>
      <a href="#slide${total}" title="${titulo}" name="${titulo}">
      ${total}</a>
    </li>
  `;
  return menu;
}
function selectMenu(text) {
  cantidadSlides = text;
  // reproductor.play();
  return `<li>
    <a href="#slide${text}" style="color: orange; font-weight: bold; background-color: white; scale: 1.4;">${text}</a>
    </li>
  `;
}
function seleccionarMenu() {
  const menuItems = document.querySelectorAll(".menu li a");
  let menu = "";
  menuItems.forEach((item) => {
    item.addEventListener("click", () => {
      let selectedText = parseInt(item.textContent);
      let cantidadtotal = menuItems.length;
      let seleccion = selectedText;
      let inicio = 0;
      if (moviltotalLines === 6) {
        if (selectedText <= 3) {
          inicio = 1;
        } else {
          inicio = selectedText - 2;
          cantidadtotal = selectedText + 2;
          if (selectedText > totalLines - 3) {
            selectedText = totalLines - 3;
            cantidadtotal = totalLines;
            inicio = totalLines - 4;
          }
        }
      } else {
        if (selectedText <= 5) {
          inicio = 1;
        } else {
          inicio = selectedText - 4;
          cantidadtotal = selectedText + 4;
          if (selectedText > totalLines - 4) {
            selectedText = totalLines - 4;
            cantidadtotal = totalLines;
            inicio = totalLines - 7;
          }
        }
      }
      for (let i = inicio; i <= cantidadtotal; i++) {
        if (i === seleccion) {
          menu += selectMenu(i);
        } else {
          menu += cargaMenu(i, i);
        }
      }
      document.querySelector(".menu").innerHTML = menu;
      resetAutoSlide();
    });
  });
}
function esValidaInput(url) {
  const input = document.createElement("input");
  input.type = "url";
  input.value = url;
  return input.checkValidity();
}
function resetAutoSlide() {
  esMovil();
  if (cantidadSlides <= totalLines) {
    clearTimeout(autoSlideTimeout);
  } else {
    cantidadSlides = 0;
    console.log(
      "cantidadSlides: " +
        cantidadSlides +
        " totallines: " +
        totalLines +
        " moviltotalLines :" +
        moviltotalLines,
    );
  }
  seleccionarMenu();
  autoSlideTimeout = setTimeout(() => {
    const menuItems = document.querySelectorAll(".menu li a");
    menuItems.forEach((elemento, index, array) => {
      if (elemento.style.color === "orange") {
        let actual = parseInt(elemento.textContent);
        let siguienteelemento = null;
        if (actual >= totalLines) {
          // console.log("pause");
          // reproductor.pause();
          if (totalLines > 9) {
            // seleccionarMenu();
            const btnStop = document.getElementById("btnStop");
            btnStop.click();
            // selectMenu(1);
          }
          siguienteelemento = menuItems[0];
          // resetAutoSlide;
        } else if (actual === 1) {
          siguienteelemento = menuItems[1];
          seleccionarMenu();
          // siguienteelemento.click();
        } else {
          siguienteelemento = array[index + 1];
          // siguienteelemento.click();
        }
        if (cantidadSlides === 0) {
          console.log(cantidadSlides);
          // clearTimeout(autoSlideTimeout);
          // totalLines = 1;
        } else {
          siguienteelemento.click();
        }
        seleccionarMenu();
      }
    });
  }, 3000);
}
function siguienteSlide() {
  const elemento = menuItems[cantidadSlides];
  elemento.addEventListener("click", (e) => {
    // e.preventDefault(); // Evitar el comportamiento por defecto del enlace
    console.log("siguiente: " + menuItems[cantidadSlides - 1].textContent);
    // seleccionarMenu();
  });
  // const selectedMenuItem = menuItems[cantidadSlides - 1].textContent;
  // console.log(menuItems[cantidadSlides].textContent + " - " + cantidadSlides);
  // if (selectedMenuItem) {
  //   // selectedMenuItem.style.backgroundColor = "white";
  // }
}
function next() {
  const selectedSlide = document.querySelector(
    ".slider-track li:nth-child(" + (cantidadSlides + 1) + ")",
  );
  const menuItems = document.querySelectorAll(".menu li a");
  const selectedMenuItem = menuItems[cantidadSlides];
  if (selectedMenuItem) {
    selectedMenuItem.style.backgroundColor = "white";
  }
  console.log(cantidadSlides);
  if (selectedSlide) {
    cantidadSlides++;
    resetAutoSlide();
  }
}

function seleccionarMenu2() {
  const menuItems = document.querySelectorAll(".menu li a");
  let menu = "";
  menuItems.forEach((item) => {
    item.addEventListener("click", () => {
      let selectedText = parseInt(item.textContent);
      let cantidadtotal = menuItems.length;
      let seleccion = selectedText;
      let inicio = 0;
      if (selectedText <= 3) {
        //(moviltotalLines-3)
        inicio = 1;
      } else {
        inicio = selectedText - 2; //(moviltotalLines-4)
        cantidadtotal = selectedText + 2; //(moviltotalLines-4)
        if (selectedText > totalLines - 3) {
          //(moviltotalLines-3)
          selectedText = totalLines - 3; //(moviltotalLines-3)
          cantidadtotal = totalLines;
          inicio = totalLines - 4; //(moviltotalLines-2)
        }
      }

      for (let i = inicio; i <= cantidadtotal; i++) {
        if (i === seleccion) {
          menu += selectMenu(i);
        } else {
          menu += `<li><a href="#slide${i}">${i}</a></li>`;
        }
      }
      document.querySelector(".menu").innerHTML = menu;
      resetAutoSlide();
    });
  });
}
function detectarDispositivo() {
  const ancho = window.innerWidth;
  const esMovil = ancho < 768; // Umbral común para móviles
  const esAndroid = /Android/i.test(navigator.userAgent);
  const esiOS = /iPhone|iPad|iPod/i.test(navigator.platform);

  if (esMovil) {
    console.log("Vista móvil activa. Android:", esAndroid, "iOS:", esiOS);
    // Aplicar lógica específica para móvil
    moviltotalLines = 6;
    seleccionarMenu();
  } else {
    moviltotalLines = 10;
    seleccionarMenu();
  }
}

window.addEventListener("resize", detectarDispositivo());
function esMovil() {
  if (window.matchMedia("(max-width: 768px)").matches) {
    console.log("Es un dispositivo móvil o tablet pequeña");
    moviltotalLines = 6;
  } else {
    moviltotalLines = 10;
  }
}
