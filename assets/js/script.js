const urlDBZ = "https://dragonball-api.com/api/characters";
const boton_mostrar = document.getElementById("btn-mostrar");
const info = document.getElementById("contenedor-info");

const inputBusqueda = document.getElementById("input-busqueda");
const formBusqueda = document.getElementById("form-busqueda");
const resetBtn = document.getElementById("resetBtn")
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
}
const conocerMas = async (id)=>{
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
}

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
      <button class="btn btn-primary mt-auto btn-conocer-mas">Conocer Más</button>
    </div>
  </div>
</div>


        `;
        
    });
})
formBusqueda.addEventListener("submit", async (e) => {
    e.preventDefault(); 
    const nombre = inputBusqueda.value.trim().toLowerCase();

    if (nombre === "") return;

    
    const personajes = await fetchInfo(`${urlDBZ}?page=1`);
    const filtrados = personajes.items.filter(p =>
        p.name.toLowerCase().includes(nombre)
    );

    
    info.innerHTML = "";
    filtrados.forEach((personaje) => {
        info.innerHTML += `
        <div class="col-3 mb-4" data-id=${personaje.id}>
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
resetBtn.addEventListener("click", async () => {
    inputBusqueda.value = "";           
    info.innerHTML = "";                
    page = 1;                          
    const personajes = await fetchInfo(`${urlDBZ}?page=${page}`); 
    renderPersonajes(personajes.items); 
});

const renderPersonajes = (lista) => {
    lista.forEach((personaje) => {
        info.innerHTML += `
        <div class="col-3 mb-4" data-id="${personaje.id}">
          <div class="card h-100">
            <img src="${personaje.image}" class="card-img-top fixed-img" />
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${personaje.name}</h5>
              <p class="card-text">${personaje.race} / ${personaje.gender}</p>
              <button class="btn btn-primary mt-auto btn-conocer-mas">Conocer Más</button>
            </div>
          </div>
        </div>
        `;
    });
};





info.addEventListener("click",(e)=>{
    if (e.target.classList.contains("btn-conocer-mas")) {
    const cardPadre =  e.target.closest(".col-3");
    const id = cardPadre.dataset.id
    conocerMas(id);
    }
})


