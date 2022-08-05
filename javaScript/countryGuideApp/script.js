// Se definen dos variables donde se guardarán los elementos llamados por id
let searchBtn = document.getElementById('search-btn');
let countryInp = document.getElementById('country-inp');

// Se escucha el evento del boton
searchBtn.addEventListener('click', () => {
    // Se obtiene el nombre del pais que digita el usuario
    let countryName = countryInp.value;
    // Utilizamos la API y le enviamos el nombre del pais para completar la URL
    let finalURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true
    `;

    // Generamos una respuesta donde se almacenan todos los datos y utilizamos la URL
    fetch(finalURL)
    .then((response) => response.json())
    .then((data) => {
        // Prueba para saber donde estan ubicados los datos y los mostramos en consola
        // console.log(data[0]);
        // console.log(data[0].capital[0]);
        // console.log(data[0].flags.svg);
        // console.log(data[0].name.common);
        // console.log(data[0].continents[0]);
        // console.log(Object.keys(data[0].currencies)[0]);
        // console.log(data[0].currencies[Object.keys(data[0].currencies)].name);
        // console.log(Object.values(data[0].languages).toString().split(",").join(","));

        // Insertamos codigo html donde se mostraran los datos basicos del pais
        // Tales como bandera, nombre, continente donde esta el pais, cantidad de poblacion, 
        // la moneda y los lenguajes comunes
        result.innerHTML = `
            <img src="${data[0].flags.svg}" class="flag-img">
            <h2>${data[0].name.common}</h2>
            <div class="wrapper">
                <div class="data-wrapper">
                    <h4>Capital:</h4>
                    <span>${data[0].capital[0]}</span>
                </div>
            </div>
            <div class="wrapper">
                <div class="data-wrapper">
                    <h4>Continent:</h4>
                    <span>${data[0].continents[0]}</span>
                </div>
            </div>
            <div class="wrapper">
                <div class="data-wrapper">
                    <h4>Population:</h4>
                    <span>${data[0].population}</span>
                </div>
            </div>
            <div class="wrapper">
                <div class="data-wrapper">
                    <h4>Currency:</h4>
                    <span>${data[0].currencies[Object.keys(data[0].currencies)].name} - ${Object.keys(data[0].currencies)}</span>
                </div>
            </div>
            <div class="wrapper">
                <div class="data-wrapper">
                    <h4>Common Languages:</h4>
                    <span>${Object.values(data[0].languages).toString().split(",").join(",")}</span>
                </div>
            </div>
        `;
    // Evaluamos si no se ingresa nada y enviamos un mensaje y tambien si lo escrito no coincide
    }).catch(()=>{
        if(countryName.length == 0){
            result.innerHTML = `
                <h3>The input field cannot be empty</h3>
            `;
        } else {
            result.innerHTML = `
                <h3>Please enter a valid country name</h3>
            `;
        }
    });
});