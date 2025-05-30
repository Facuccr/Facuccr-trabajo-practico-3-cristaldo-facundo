const urlDBZ = "https://dragonball-api.com/api/characters";
const boton_mostrar = document.getElementById("btn-mostrar");
const info = document.getElementById("contenedor-info");
const inputBusqueda = document.getElementById("input-busqueda");
const formBusqueda = document.getElementById("form-busqueda");
const resetBtn = document.getElementById("resetBtn");

//funcion para consultar la API
const fetchInfo = async (url) => {
  try {
    const respon = await fetch(url);

    if (!respon.ok) {
      throw new Error("Algo salió mal. Inténtelo más tarde :/");
    }

    const data = await respon.json();
    return data;
  } catch (error) {
    console.log("Ocurrió un error:", error);
  }
};
// obtiene informacion adicional de un personaje por su id
const conocerMas = async (id) => {
  try {
    const respon = await fetch(`${urlDBZ}/${id}`);

    if (!respon.ok) {
      throw new Error("Algo salió mal. Inténtelo más tarde :/");
    }

    const data = await respon.json();

    alert(data.description);
  } catch (error) {
    console.log("Ocurrió un error:", error);
  }
};

//boton para traer los personajes de la api 
boton_mostrar.addEventListener("click", async () => {
  const personajes = await fetchInfo(urlDBZ);
  const datapersonaje = personajes.items;

  console.log(datapersonaje);

  datapersonaje.forEach((personaje) => {
    info.innerHTML += `
        <div class="col-3 mb-4" data-id="${personaje.id}">
  <div class="card h-100">
    <img src="${personaje.image}" class="card-img-top fixed-img" />
    <div class="card-body d-flex flex-column">
      <h5 class="card-title">${personaje.name}</h5>
      <p class="card-text">${personaje.race} / ${personaje.gender}</p>
      <button class="btn btn-warning mt-auto btn-conocer-mas">Conocer Más</button>
    </div>
  </div>
</div>
    `;
  });
});

//funcion para la busqueda de los personajes
formBusqueda.addEventListener("submit", async (e) => {
    e.preventDefault(); 
    const nombre = inputBusqueda.value.trim().toLowerCase();

    if (nombre === "") return;

    const personajes = await fetchInfo(`${urlDBZ}?page=1`);
    const filtrados = personajes.items.filter(p =>
        p.name.toLowerCase().includes(nombre)
    );

    info.innerHTML = ""; 

    if (filtrados.length === 0) {
        info.innerHTML = `
            <div class="text-center text-danger">
                <p>No se encontraron personajes con ese nombre.</p>
            </div>
        `;
        return;
    }

    buscarPersonaje(filtrados); 
});
//limpia el campo de busqueda y borra los resultados 
resetBtn.addEventListener("click", async () => {
  inputBusqueda.value = "";
  info.innerHTML = "";
  page = 1;
  const personajes = await fetchInfo(`${urlDBZ}?page=${page}`);
buscarPersonaje(personajes.items);
});


const buscarPersonaje = (lista) => {
  lista.forEach((personaje) => {
    info.innerHTML += `
        <div class="col-3 mb-4" data-id="${personaje.id}">
          <div class="card h-100">
            <img src="${personaje.image}" class="card-img-top fixed-img" />
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${personaje.name}</h5>
              <p class="card-text">${personaje.race} / ${personaje.gender}</p>
              <button class="btn btn-warning mt-auto btn-conocer-mas">Conocer Más</button>
            </div>
          </div>
        </div>
        `;
  });
};

info.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-conocer-mas")) {
    const cardPadre = e.target.closest(".col-3");
    const id = cardPadre.dataset.id;
    conocerMas(id);
  }
});
