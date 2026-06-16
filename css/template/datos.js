let totalLines = 0;
let cantidadSlides = 1;
let autoSlideTimeout = null;
window.onload = function () {
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
          // Mostrar enlace en el DOM
          html += `
          <li id="slide${totalLines}">
            <a href="${line}" target="_blank" title="${totalLines}" name="${totalLines}">
              <img src="${line}" alt="icono" />
              </a>
              </li>
              `;
          // <h1>${totalLines}</h1>
          if (totalLines < 9) {
            if (totalLines === 1) {
              menu += selectMenu(totalLines);
            } else {
              menu += `
            <li>
               <a href="#slide${totalLines}" title="${nombre}" name="${nombre}">
               ${totalLines}</a>
            </li>
          `;
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
      if (selectedText <= 4) {
        inicio = 1;
      } else {
        inicio = selectedText - 3;
        cantidadtotal = selectedText + 4;
        if (selectedText > totalLines - 4) {
          selectedText = totalLines - 4;
          cantidadtotal = totalLines;
          inicio = totalLines - 7;
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
function esValidaInput(url) {
  const input = document.createElement("input");
  input.type = "url";
  input.value = url;
  return input.checkValidity();
}
function resetAutoSlide() {
  if (cantidadSlides <= totalLines) {
    clearTimeout(autoSlideTimeout);
  } else {
    cantidadSlides = 0;
    console.log(
      "cantidadSlides: " + cantidadSlides + " totallines: " + totalLines,
    );
    // cargadatos();
    // seleccionarMenu();
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
