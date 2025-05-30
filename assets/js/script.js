const urlDBZ = "https://dragonball-api.com/api/characters";
const boton_mostrar = document.getElementById("btn-mostrar");
const info = document.getElementById("contenedor-info");

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


boton_mostrar.addEventListener("click", async () => {
    const personajes = await fetchInfo(urlDBZ);
    const datapersonaje = personajes.items;

    console.log(datapersonaje);

    datapersonaje.forEach((personaje) => {
        info.innerHTML += `
        <div class="col-3" data-id=${personaje.id}>
                <img 
                class="card-img-top"    
                src=${personaje.image}
                />
                <h2>${personaje.name}</h2>
                <p>${personaje.race} / ${personaje.gender}</p>
                <button class="btn-conocer-mas"> Conocer Más</button>
        </div>

        `;
        
    });
})

