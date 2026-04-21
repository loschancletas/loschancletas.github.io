let miembro = {};
comprobarSeleccion();

async function comprobarSeleccion() {
  const ip = await getIp();
  if (isLocalStorageAvailable()) {
    const localStorage = window.localStorage;
    const rutas = JSON.parse(localStorage.getItem(ip));
    if (rutas) {
      let elementos = rutas.split(",");
      Object.keys(elementos.slice(0, -1)).forEach((key) => {
        document.getElementById(elementos[key]).checked = true;
      });
      guardarSeleccion();
    } else {
      miembro.miembroip = ip;
    }
  }
}

function guardarSeleccion() {
  const formulario = document.getElementById("formulario");
  var nombre = "";
  var contador = 0;
  document.getElementById("etiqueta").textContent = "<ul>Seleccionados:<br>";
  const seleccion = formulario
    .querySelectorAll("input[type='checkbox']")
    .forEach((checkbox) => {
      if (checkbox.checked) {
        nombre = checkbox.id;
        document.getElementById("etiqueta").textContent +=
          `<li><a href=#${nombre}>${nombre}</a></li>`;
      } else {
        contador += 1;
      }
    });
  document.getElementById("etiqueta").textContent += "</ul>";
  document.getElementById("etiqueta").style.display = "block";
  document.getElementById("etiqueta").innerHTML =
    document.getElementById("etiqueta").textContent;
  if (contador == 6) {
    document.getElementById("etiqueta").textContent = "Guardar selección";
  }
}

function guardarEnLocalStorage() {
  guardarLocalStorage();
  guardarSeleccion();
}

function guardarLocalStorage() {
  const formulario = document.getElementById("formulario");
  const datos = JSON.parse(localStorage.getItem(miembro.miembroip));
  let vacio = 0;
  if (miembro.miembroip != null) {
    miembro.datos = [];
    const seleccion = formulario
      .querySelectorAll("input[type='checkbox']")
      .forEach((checkbox) => {
        if (checkbox.checked) {
          vacio = 1;
          if (datos == null) {
            guardarTotal(checkbox.id);
          } else {
            if (datos.length > 0) {
              let elementos = datos.split(",");
              let existe = elementos.includes(checkbox.id);
              if (existe) {
                guardarRuta(checkbox.id);
              } else {
                guardarTotal(checkbox.id);
              }
            } else {
              localStorage.removeItem(miembro.miembroip);
            }
          }
        } else {
          if (datos) {
            if (datos.length > 0) {
              let elementos = datos.split(",");
              let existe = elementos.includes(checkbox.id);
              if (existe) {
                borrarRuta(checkbox.id);
              }
            }
          }
        }
      });
    if (vacio === 0) {
      console.log("borrado el usuario: " + miembro.miembroip);
      localStorage.removeItem(miembro.miembroip);
      miembro = {};
      alert("No has seleccionado ninguna opcion");
      getIp();
    } else {
      console.log("Datos guardados :" + miembro.datos);
      localStorage.setItem(miembro.miembroip, JSON.stringify(miembro.datos));
      alert("Guardadas las rutas seleccionadas");
    }
  } else {
    alert("No estas conectado");
    comprobarSeleccion();
  }
}
function borrarRuta(chruta) {
  let total = parseInt(localStorage.getItem("Total: " + chruta) || "0");
  console.log("borrado de " + chruta + " Total = " + total);
  if (total == 1) {
    localStorage.removeItem("Total: " + chruta);
  } else {
    total = total - 1;
    localStorage.getItem("Total: " + chruta, total);
  }
}
function guardarTotal(chruta) {
  const total = 1 + parseInt(localStorage.getItem("Total: " + chruta) || "0");
  var ruta = [chruta + ","];
  miembro.datos += ruta;
  localStorage.setItem("Total: " + chruta, total);
}
function guardarRuta(chruta) {
  const total = parseInt(localStorage.getItem("Total: " + chruta) || "0");
  var ruta = [chruta + ","];
  miembro.datos += ruta;
  localStorage.setItem("Total: " + chruta, total);
}

async function getIp() {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    miembro.miembroip = data.ip;
    return data.ip;
  } catch (error) {
    console.error("Error al obtener la IP:", error);
    return null;
  }
}

function guardarIp() {
  const localStorage = window.localStorage;
  try {
    const m = getIp();
    if (m) {
      const storedIP = localStorage.getItem("userIP");
      if (storedIP) {
        miembro.miembroip = storedIP;
        console.log("IP recuperada y eliminada de localStorage:", storedIP);
      } else {
        console.log("No se encontró 'userIP' en localStorage.");
        miembro.miembroip = null;
      }
    }
  } catch (error) {
    // Manejar errores específicos de localStorage (como Safari en modo privado)
    if (error.name === "SecurityError" || error.name === "QuotaExceededError") {
      console.warn("Acceso a localStorage bloqueado:", error);
    } else {
      console.error("Error inesperado:", error);
    }
    return null;
  }
}

function isLocalStorageAvailable() {
  try {
    const test = "__test__";
    window.localStorage.setItem(test, test);
    window.localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}
