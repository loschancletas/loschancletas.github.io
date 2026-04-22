mostrarSeleccion2();

function mostrarSeleccion() {
  // 1. Obtener el dato almacenado por su clave (ej. 'seleccion')
  for (let i = 0; i < localStorage.length; i++) {
    const clave = localStorage.key(i);
    const dato = localStorage.getItem(clave);
    console.log(clave + " => " + dato);
    document.getElementById("etiqueta").innerHTML += clave;
  }
  const datoGuardado = localStorage.getItem("seleccion");

  // 2. Verificar si existe el dato antes de procesarlo
  if (datoGuardado) {
    // 3. Convertir la cadena de texto a objeto (si se guardó como JSON)
    const seleccion = JSON.parse(datoGuardado);

    // 4. Mostrar la información en el DOM o consola
    console.log("Datos recuperados:", seleccion);
    document.querySelector("etiqueta").textContent = seleccion.nombre;
  } else {
    console.log("No hay datos seleccionados en localStorage.");
    //document.getElementById("etiqueta").innerText = "Sin seleccion";
    //    document.querySelector("etiqueta").textContent = "Sin selección";
  }
}

function mostrarSeleccion2() {
  const localStorage = window.localStorage;
  const etiqueta = document.getElementById("etiqueta");
  //localStorage.removeItem("etiqueta");
  if (localStorage.length < 1) {
    etiqueta.innerHTML = "Guardar selección";
    etiqueta.style.display = "block";
    //document.getElementById("etiqueta").textContent = "Guardar selección";
  } else {
    let contenidoHTML = "<ul>Seleccionados:<br>";
    //document.getElementById("etiqueta").textContent += "<ul>Seleccionados:<br>";
    for (let i = 0; i < localStorage.length; i++) {
      const clave = localStorage.key(i);
      const valor = localStorage.getItem(clave);
      console.log(`${clave}: ${valor}`);
      //contenidoHTML += `La clave "${clave}" contiene el valor: ${valor}<br>`;
      //if (valor === "true") {
      const botonborrar = `<button onclick="borrarElemento('${clave}')">borrar</button>`;
      const botonborra = `<button onclick="borrarElemento('${clave}')">borrar</button>`;
      contenidoHTML += `<li>${clave} ${valor} ${botonborrar}</li>`;
      //document.getElementById("etiqueta").textContent +=
      //  `<li>${clave} ${valor} ${botonborrar}</li>`;
      //document.getElementById(clave).checked = true;
      //+="\nclave: " + clave + ", valor: " + valor;
      //}
    }
    contenidoHTML += "</ul>";
    etiqueta.innerHTML = contenidoHTML;
    etiqueta.style.display = "block";
    /*document.getElementById("etiqueta").textContent += "</ul>";
    document.getElementById("etiqueta").style.display = "block";
    document.getElementById("etiqueta").innerHTML =
      document.getElementById("etiqueta").textContent;
    console.log(document.getElementById("etiqueta").textContent);*/
  }
}
function borrarElemento(elemento) {
  localStorage.removeItem(elemento);
  console.log(elemento);
  //alert("Elemento " + elemento + " Borrado");
  mostrarSeleccion2();
}
function guardar() {
  const miembro = {
    miembroIp: document.getElementById("direccionIp").value,
    ruta: document.getElementById("ruta").value,
    seleccion: document.getElementById("seleccion").value,
  };
  console.log(miembro);
  localStorage.setItem(miembro);
  //localStorage.setItem()
}
