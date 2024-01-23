`use strict`;

/*---------------------------------------------------------------------------------------------------------*/

// Funcion Reiniciar Pokepedia
function reloadPage() {
  location.reload();
}

// Asociar la función al clic del botón
document.getElementById('reloadButton').addEventListener('click', reloadPage);

/*---------------------------------------------------------------------------------------------------------*/

// Definir la función writeMessage
const writeMessage = (message) => {
  console.log(message); // Puedes personalizar esto para que se ajuste a tu aplicación
};

// Función borrar todas las clases de tipos:
const deleteClassTypes = () => {
  tarjeta.classList.remove('darkTarjeta');
  tarjeta.classList.remove('dragonTarjeta');
  tarjeta.classList.remove('electricTarjeta');
  tarjeta.classList.remove('fairyTarjeta');
  tarjeta.classList.remove('fightingTarjeta');
  tarjeta.classList.remove('fireTarjeta');
  tarjeta.classList.remove('flyingTarjeta');
  tarjeta.classList.remove('ghostTarjeta');
  tarjeta.classList.remove('grassTarjeta');
  tarjeta.classList.remove('groundTarjeta');
  tarjeta.classList.remove('iceTarjeta');
  tarjeta.classList.remove('normalTarjeta');
  tarjeta.classList.remove('poisonTarjeta');
  tarjeta.classList.remove('psychicTarjeta');
  tarjeta.classList.remove('rockTarjeta');
  tarjeta.classList.remove('steelTarjeta');
  tarjeta.classList.remove('waterTarjeta');
  tarjeta.classList.remove('stellarTarjeta');
  tarjeta.classList.remove('bugTarjeta');
};

/*---------------------------------------------------------------------------------------------------------*/

// Variables
const gettingTheForm = document.querySelector(`form.search`);
/* console.log('gettingTheForm=', gettingTheForm); */

// Resto de tu código
const doSearch = async (e) => {
  // Cancelamos el evento por defecto del botón
  e.preventDefault();
  // Generamos una representación de JS de los valores que se envían desde el formulario.
  const inputFromForm = new FormData(e.target);
  /*   console.log('inputFromForm=', inputFromForm); */
  // Seleccionamos por id="query" los valores que se envian del input del formulario.
  let pokemonFromForm = inputFromForm.get(`query`);
  /*   console.log('pokemonFromForm=', pokemonFromForm); */
  // Convertimos a minúsculas
  pokemonFromForm = pokemonFromForm.toLowerCase();

  try {
    writeMessage(`Cargando datos de la API...`);

    const pokedex = document.getElementById('pokedex');
    const tarjeta = document.getElementById('tarjeta');

    /* const pokemonNameOrId = '36'; */
    const url = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonFromForm}`;

    // Hacemos la petición a la API
    const response = await fetch(url);

    if (response.ok) {
      // En caso de que la petición haya ido bien
      writeMessage(`Aquí tienes los datos de la API:`);
      const data = await response.json();
      console.log('data', data);

      // Obtenemos los elementos del DOM deseados

      const pokemonNameH1 = document.getElementById('pokemon-name-h1');
      const pokemonPWeightAndHeight = document.getElementById(
        'pokemon-weight-height'
      );

      const pokemonImageFront = document.getElementById('pokemonImageFront');
      const pokemonImageBack = document.getElementById('pokemonImageBack');

      const pokemonTypes = document.getElementById('types-container');

      const hpTableValue = document.getElementsByClassName('td-hp')[0];
      const attackTableValue = document.getElementsByClassName('td-attack')[0];
      const defenseTableValue =
        document.getElementsByClassName('td-defense')[0];
      const specialAttackTableValue =
        document.getElementsByClassName('td-special-attack')[0];
      const specialDefenseTableValue =
        document.getElementsByClassName('td-special-defense')[0];
      const speedTableValue = document.getElementsByClassName('td-speed')[0];

      // Ponemos como src de la imagen la url de imagen obtenida de la API
      pokemonImageFront.src = data.sprites.front_default;
      pokemonImageBack.src = data.sprites.back_default;
      // Actualiza el atributo src del elemento img con la URL de la imagen
      pokemonImageFront.alt = `Imagen frontal de ${data.name}`;
      pokemonImageBack.alt = `Imagen trasera de ${data.name}`;

      // Definir types
      pokemonTypes.innerHTML = data.types
        .map(
          (obj) => `<span class="type ${obj.type.name}">${obj.type.name}</span>`
        )
        .join('');
      // Definir backgrounds en función de los types
      deleteClassTypes();

      const tipoPrincipal = data.types[0].type.name;
      if (tipoPrincipal === 'dark') {
        tarjeta.classList.add('darkTarjeta');
      } else if (tipoPrincipal === 'dragon') {
        tarjeta.classList.add('dragonTarjeta');
      } else if (tipoPrincipal === 'electric') {
        tarjeta.classList.add('electricTarjeta');
      } else if (tipoPrincipal === 'fairy') {
        tarjeta.classList.add('fairyTarjeta');
      } else if (tipoPrincipal === 'fighting') {
        tarjeta.classList.add('fightingTarjeta');
      } else if (tipoPrincipal === 'fire') {
        tarjeta.classList.add('fireTarjeta');
      } else if (tipoPrincipal === 'flying') {
        tarjeta.classList.add('flyingTarjeta');
      } else if (tipoPrincipal === 'ghost') {
        tarjeta.classList.add('ghostTarjeta');
      } else if (tipoPrincipal === 'grass' || tipoPrincipal === 'bug') {
        tarjeta.classList.add('grassTarjeta');
      } else if (tipoPrincipal === 'ground') {
        tarjeta.classList.add('groundTarjeta');
      } else if (tipoPrincipal === 'ice') {
        tarjeta.classList.add('iceTarjeta');
      } else if (tipoPrincipal === 'normal') {
        tarjeta.classList.add('normalTarjeta');
      } else if (tipoPrincipal === 'poison') {
        tarjeta.classList.add('poisonTarjeta');
      } else if (tipoPrincipal === 'psychic') {
        tarjeta.classList.add('psychicTarjeta');
      } else if (tipoPrincipal === 'rock') {
        tarjeta.classList.add('rockTarjeta');
      } else if (tipoPrincipal === 'steel') {
        tarjeta.classList.add('steelTarjeta');
      } else if (tipoPrincipal === 'water') {
        tarjeta.classList.add('waterTarjeta');
      } else {
        tarjeta.classList.add('stellarTarjeta');
      }

      // Añadimos el texto deseado:
      pokemonNameH1.innerText =
        '#' +
        data.id +
        ' | ' +
        data.name.charAt(0).toUpperCase() +
        data.name.slice(1);
      pokemonPWeightAndHeight.innerText =
        'Weigh: ' + data.weight + ' | height: ' + data.height;
      hpTableValue.innerText = data.stats[0].base_stat;
      attackTableValue.innerText = data.stats[1].base_stat;
      defenseTableValue.innerText = data.stats[2].base_stat;
      specialAttackTableValue.innerText = data.stats[3].base_stat;
      specialDefenseTableValue.innerText = data.stats[4].base_stat;
      speedTableValue.innerText = data.stats[5].base_stat;

      // En caso de que una de las imágenes no exista:
      let isImgFrontOk = data.sprites.front_default;
      let isImgBackOk = data.sprites.back_default;
      if (!isImgFrontOk) {
        pokemonImageFront.classList.remove('show');
        pokemonImageFront.classList.add('doNotShow');
      } else {
        pokemonImageFront.classList.remove('doNotShow');
        pokemonImageFront.classList.add('show');
      }

      if (!isImgBackOk) {
        pokemonImageBack.classList.remove('show');
        pokemonImageBack.classList.add('doNotShow');
      } else {
        pokemonImageBack.classList.remove('doNotShow');
        pokemonImageBack.classList.add('show');
      }

      // Ocultamos la pokedex y hacemos visible la tarjeta con los datos del pokemon:
      pokedex.classList.remove('show');
      pokedex.classList.add('doNotShow');
      tarjeta.classList.remove('doNotShow');
      tarjeta.classList.add('show');
    } else {
      // En caso de que la petición haya ido mal
      writeMessage(`Hubo un error haciendo la petición`);
      deleteClassTypes();
      const pokedexBien = document.getElementById('pokedexGif');
      const pokedexError = document.getElementById('pokedexGifError');
      pokedexBien.classList.remove('show');
      pokedexBien.classList.add('doNotShow');
      pokedexError.classList.remove('doNotShow');
      pokedexError.classList.add('show');
      pokedex.classList.remove('doNotShow');
      pokedex.classList.add('show');
      tarjeta.classList.remove('show');
      tarjeta.classList.add('doNotShow');
    }
  } catch (error) {
    // En caso de que haya habido errores en el Try
    writeMessage(error.message);
  }
};

// Le añadimos un evento al formulario de que cuando se envíe ejecute la función doSearch
gettingTheForm.addEventListener(`submit`, doSearch);
