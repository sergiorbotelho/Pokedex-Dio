const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const c = (el) => document.querySelector(el);
const backgroundModal = document.querySelector('.top')
c('button').addEventListener('click', (e) => {
    // e.preventDefault()
    c('.modal-area').style.display = 'none'
    c('.modal-area .modal').style.display = 'none'
    backgroundModal.classList.remove(colors);
})

c('.backdrop').addEventListener('click', () => {

    c('.modal-area').style.display = 'none'
    c('.modal-area .modal').style.display = 'none'
    backgroundModal.classList.remove(colors);
})

const maxRecords = 151
let limit = 10
let offset = 0;
let cont = 0;
let listPoke = [];
let colors = ``;
function convertPokemonToLi(pokemon) {
    return `    
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>

    `

}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml

        pokemons.map((item) => {
            listPoke.push(item)
        })

        console.log(listPoke);

        let domPoke = pokemonList.children;
        console.log(domPoke);


        for (let i = 0; i < listPoke.length; i++) {

            domPoke[i].addEventListener('click', () => {

                c('.modal-area').style.display = 'flex'
                c('.modal-area .modal').style.display = 'flex';
                c('.img').setAttribute('src', listPoke[i].photo)
                c('.modal span').innerHTML = `#${listPoke[i].number}`
                colors = listPoke[i].type;
                backgroundModal.classList.add(listPoke[i].type);

            })



        }

    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit


    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)



    }

})






