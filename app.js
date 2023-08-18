let pagina = 1;
const btmAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");
btnSiguiente.addEventListener('click',()=>{
    if(pagina<100){
        pagina += 1;
        cargarpeliculas()
    }

})
btmAnterior.addEventListener('click',()=>{
    pagina -= 1;
    cargarpeliculas()
})

const cargarpeliculas = async() =>{
    try{
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=c1d3d4c0da60f5f3efdc155fcca9b2e8&language=es-MX&page=${pagina}`)
        console.log(respuesta)

        if(respuesta.status === 200){
            const datos = await respuesta.json();

            let peliculas = '';
            datos.results.forEach(pelicula => {
                peliculas += `
                <div class="pelicula" id="pelicula">
                    <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                    <h3>${pelicula.title}</h3>
                </div>

                `;
            });
            document.getElementById('contenedor').innerHTML = peliculas;

        }else if(respuesta.status === 401){
            console.log("mal llave error 401!!"); 
        }else if(respuesta.status === 404){
            console.log("mPelicula no existe error 404!!"); 
        }else{
        }
    }catch(error){
        console.log(error)
    }
}

cargarpeliculas()