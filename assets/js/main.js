const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const c = (el) => document.querySelector(el);
const backgroundModal = document.querySelector('.top');
const about = document.querySelector('#about');
const baseStats = document.querySelector('#base-stats');



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
                c('.header h2').innerHTML = listPoke[i].name;
                backgroundModal.classList.add(listPoke[i].type);
                c('.height').innerHTML = listPoke[i].height
                c('.weight').innerHTML = listPoke[i].weight
                c('.abilities').innerHTML = listPoke[i].abilities.join(', ');
                c('.hp').innerHTML = listPoke[i].baseStats[0];
                c('.atack').innerHTML = listPoke[i].baseStats[2];
                c('.defense').innerHTML = listPoke[i].baseStats[4];
                c('.spAtack').innerHTML = listPoke[i].baseStats[6];
                c('.spDefense').innerHTML = listPoke[i].baseStats[8];
                c('.speed').innerHTML = listPoke[i].baseStats[10];

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


about.addEventListener('click', ()=>{
    c('.select1').classList.add('roxo');
    c('.select2').classList.remove('roxo');
    c('#about').style.color = '#000';
    c('#base-stats').style.color = '#DDD';
    c('.base-stats').classList.add('display-none');
    c('.about').classList.remove('display-none');
})
baseStats.addEventListener('click', ()=>{
    c('.select2').classList.add('roxo');
    c('.select1').classList.remove('roxo');
    c('#base-stats').style.color = '#000';
    c('#about').style.color = '#DDD';
    c('.about').classList.add('display-none');
    c('.base-stats').classList.remove('display-none');
})






