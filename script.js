///Seletores

const pokemonName = document.querySelector(".pokemon__name");
const pokemonNumber = document.querySelector(".pokemon__number");
const pokemonImage = document.querySelector(".pokemon__image");
const form = document.querySelector(".form");
const input = document.querySelector(".input__search");
const buttonPrev = document.querySelector(".btn-prev");
const buttonNext = document.querySelector(".btn-next");

///Variaveis
let searchPokemon = 1;

///Chamada da API
const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if(APIResponse.status === 200) {
    const data = await APIResponse.json()
    return data;
  }
}

///Renderizar Pokemon
const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = "Loading...";
  pokemonNumber.innerHTML = "";

  const data = await fetchPokemon(pokemon);
  
    if(data){
      pokemonImage.style.display = "block";
      pokemonName.innerHTML = data.name;
      pokemonNumber.innerHTML = data.id;
      pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
      
      input.value = '';
      searchPokemon = data.id;
    } else {
      pokemonImage.style.display = "none";
      pokemonName.innerHTML = "Not found 404";
      pokemonNumber.innerHTML = "";
    }
}

///Procurar Pokemon

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
}
)

///Botão Prev

buttonPrev.addEventListener('click', () => {
  if(searchPokemon > 1)
  searchPokemon--
  renderPokemon(searchPokemon);
})

///Botão Next

buttonNext.addEventListener('click', () => {
  searchPokemon++
  renderPokemon(searchPokemon);
})

///Run do programa

renderPokemon(searchPokemon)