/*

const header = document.getElementById('pagination')
const charactList = document.getElementById('character-list')
const prevpage = document.getElementById('prev-page')
const nextpage = document.getElementById('next-page')
const character = document.createElement('li')
charactList.appendChild(character)


    fetch(' https://rickandmortyapi.com/api/character/?page=1')
    .then((response) => {
        if (!response.ok) {
            throw new Error('La solicitud no ha sido exitosa')
        }
        return response.json()
    })
    .then((data) => {
        console.log(data)
    })
*/



    const apiEndpoint = "https://rickandmortyapi.com/api/character";
    let currentPage = 1;
    
    // Seleccionar elementos del DOM
    const characterList = document.getElementById("character-list");
    const prevPageBtn = document.getElementById("prev-page");
    const nextPageBtn = document.getElementById("next-page");
    
    // Función para obtener datos de una página específica
    function getCharacters(page) {
      return fetch(`${apiEndpoint}/?page=${page}`)
        .then(response => {
          if (!response.ok) throw new Error("Error en la respuesta de la API");
          return response.json();
        })
        .then(data => data)
        .catch(error => console.error("Error al obtener los datos:", error));
    }
    
    // Función para renderizar los personajes en la página
    function renderCharacters(characters) {
      // Limpiar la lista actual
      characterList.innerHTML = "";
      
      characters.forEach(character => {
        const characterCard = document.createElement("div");
        characterCard.classList.add("character-card");
        
        characterCard.innerHTML = `
          <img src="${character.image}" alt="${character.name}">
          <h3> Name: ${character.name}</h3>
          <p>  Especie: ${character.species}</p>
        `;
        
        characterList.appendChild(characterCard);
      });
    }
    
    // Función para actualizar la interfaz en función de la página actual
    function updatePage(page) {
      getCharacters(page).then(data => {
        renderCharacters(data.results);
        prevPageBtn.disabled = page === 1;
        nextPageBtn.disabled = !data.info.next;
      });
    }
    
    // Función para manejar el cambio de página
    function changePage(step) {
      currentPage += step;
      updatePage(currentPage);
    }
    
    // Asignar funciones a los botones de paginación
    prevPageBtn.onclick = () => changePage(-1);
    nextPageBtn.onclick = () => changePage(1);
    
    // Cargar la primera página al iniciar
    updatePage(currentPage);
