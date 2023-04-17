const buscarBtn = document.getElementById('buscar_Btn')
const prevBtn = document.getElementById('prev-button')
const nextBtn = document.getElementById('next-button')
const pokemonImage = document.getElementById('pokemon-image')
const pokemonEvolutionContainer1 = document.getElementById("pokemon-evolution-container-1");
const pokemonEvolutionContainer2 = document.getElementById("pokemon-evolution-container-2");
const pokemonEvolutionContainer3 = document.getElementById("pokemon-evolution-container-3");

let IDCounter = 1

let pokemonDataObject = {
    name: 'pikachu',
    id: 1,
    height: 'height',
    weight: 'weight',
    types: 'types',
    abilities: 'abilities',
    category: 'category',
    stats: {
        hp: 'stat',
        attack: 'stat',
        defense: 'stat',
        specialAttack: 'stat',
        specialDefense: 'stat',
        speed: 'stat'
    },
    imgUrl: 'sprites',
    egg_groups: 'egg_groups',
    habitat: 'habitat',
    generation: 'generation',
    evolution_chain: {
        evolution1: 'evolution1',
        evolution2: 'evolution2',
        evolution3: 'evolution3'
    }
}

let { name, id, height, weight, types, abilities, category, stats, imgUrl, egg_groups, habitat, generation, evolution_chain } = pokemonDataObject
let { hp, attack, defense, specialAttack, specialDefense, speed } = stats


const animations = () => {

    const pokemonCard = document.getElementById('pokemon-card')

    pokemonCard.classList.add('slide-in-elliptic-top-fwd')
    pokemonImage.classList.add('roll-in-left')

    setTimeout(() => {
        pokemonCard.classList.remove('slide-in-elliptic-top-fwd')
        pokemonImage.classList.remove('roll-in-left')

    }, 1500)
}

const setColors = (type1) => {
    const pokemonTypeCard1 = document.getElementById('pokemon-type1-card')
    const navbar = document.getElementById('navbar')
    const stat_bars = document.querySelectorAll('.stat-bar')
    const arrowButtons = document.querySelectorAll('.arrow-buttons ')

    navbar.style.background = `var(--${type1})`
    pokemonTypeCard1.style.background = `var(--${type1})`
    pokemonImage.style.filter = `drop-shadow(-20px 5px 50px var(--${type1}))`

    arrowButtons.forEach(button => {
        button.addEventListener('mouseover', () => button.style.color = `var(--${type1})`)
        button.addEventListener('mouseout', () => button.style.color = 'white')
    })

    stat_bars.forEach(bar => {
        bar.style.background = `var(--${type1})`
    })
}

const setSPokemonData = (name, id, height, weight, types, imgUrl, category, abilities, egg_groups, habitat, generation) => {

    const pokemonName = document.getElementById('pokemon-name')
    const pokemonID = document.getElementById('pokemon-id')
    const pokemonHeight = document.getElementById('pokemon-height')
    const pokemonWeight = document.getElementById('pokemon-weight')
    const pokemonAbilities = document.getElementById('pokemon-abilities')
    const pokemonEggGroups = document.getElementById('pokemon-eggGroups')
    const pokemonHabitat = document.getElementById('pokemon-habitat')
    const pokemonGeneration = document.getElementById('pokemon-generation')
    const pokemonCategory = document.getElementById('pokemon-category')
    const pokemonType1 = document.getElementById('pokemon-type1')
    const pokemonType2 = document.getElementById('pokemon-type2')
    const pokemonTypeCard2 = document.getElementById('pokemon-type2-card')


    pokemonImage.src = imgUrl
    pokemonName.textContent = name.charAt(0).toUpperCase() + name.slice(1);
    pokemonCategory.textContent = `Category: ${category}`
    pokemonID.textContent = `ID: ${id}`
    pokemonHeight.textContent = `Height: ${height / 10}m`
    pokemonWeight.textContent = `Weight: ${(weight / 4.54).toFixed(1)} lbs`
    pokemonAbilities.textContent = abilities[1] ? `Abilities: ${abilities[0].ability.name}, ${abilities[1].ability.name}` : `Ability: ${abilities[0].ability.name}`
    pokemonEggGroups.textContent = egg_groups[1] ? `Egg Groups: ${egg_groups[0].name}, ${egg_groups[1].name}` : egg_groups[0] ? `Egg Group: ${egg_groups[0].name}` : `Egg Group: unknown`
    pokemonHabitat.textContent = habitat ? `Habitat: ${habitat.name}` : `Habitat: unknown`
    pokemonGeneration.textContent = `Generation: ${generation.name}`

    pokemonType1.textContent = types[0].type.name
    setColors(types[0].type.name)

    if (types[1]) {
        pokemonType2.textContent = types[1].type.name
        pokemonTypeCard2.style.background = `var(--${types[1].type.name})`
        pokemonTypeCard2.classList.remove('hidden')
    } else {
        pokemonTypeCard2.classList.add('hidden')
    }

    animations()
}


const setPokemonStatsBars = (hp, attack, defense, specialAttack, specialDefense, speed) => {

    const hpBar = document.getElementById("hp-bar");
    const attackBar = document.getElementById("attack-bar");
    const defenseBar = document.getElementById("defense-bar");
    const specialAttackBar = document.getElementById("special-attack-bar");
    const specialDefenseBar = document.getElementById("special-defense-bar");
    const speedBar = document.getElementById("speed-bar");

    hpBar.style.width = `${hp}%`
    attackBar.style.width = `${attack}%`
    defenseBar.style.width = `${defense}%`
    specialAttackBar.style.width = `${specialAttack}%`
    specialDefenseBar.style.width = `${specialDefense}%`
    speedBar.style.width = `${speed}%`

    hpBar.textContent = hp
    attackBar.textContent = attack
    defenseBar.textContent = defense
    specialAttackBar.textContent = specialAttack
    specialDefenseBar.textContent = specialDefense
    speedBar.textContent = speed
}

const getEvolutionImage = async (nameEvolution) => {
    const urlEvolution = `https://pokeapi.co/api/v2/pokemon/${nameEvolution}`
    const response = await fetch(urlEvolution)
    const dataEvolution = await response.json()

    return dataEvolution.sprites.other['official-artwork'].front_default
}

const getEvolutionData = async (evolution_chain) => {

    const nameEvolution1 = evolution_chain.species.name

    const imgEvolution1 = await getEvolutionImage(nameEvolution1)

    if (evolution_chain['evolves_to'].length === 0) {
        setPokemonEvolution(nameEvolution1, imgEvolution1)
    }
    else if (evolution_chain['evolves_to'].length > 0 && evolution_chain['evolves_to'][0]['evolves_to'].length > 0) {

        const nameEvolution2 = evolution_chain.evolves_to[0].species.name
        const nameEvolution3 = evolution_chain.evolves_to[0].evolves_to[0].species.name

        const imgEvolution2 = await getEvolutionImage(nameEvolution2)
        const imgEvolution3 = await getEvolutionImage(nameEvolution3)

        setPokemonEvolution(nameEvolution1, imgEvolution1, nameEvolution2, imgEvolution2, nameEvolution3, imgEvolution3)
    }
    else if (evolution_chain['evolves_to'].length > 0 && evolution_chain['evolves_to'][0]['evolves_to'].length === 0) {

        const nameEvolution2 = evolution_chain.evolves_to[0].species.name
        const imgEvolution2 = await getEvolutionImage(nameEvolution2)

        setPokemonEvolution(nameEvolution1, imgEvolution1, nameEvolution2, imgEvolution2)
    }
}

const setPokemonEvolution = (nameEvolution1, imgEvolution1, nameEvolution2, imgEvolution2, nameEvolution3, imgEvolution3) => {

    const pokemonEvolutionName1 = document.getElementById("pokemon-evolution-name-1");
    const pokemonEvolutionName2 = document.getElementById("pokemon-evolution-name-2");
    const pokemonEvolutionName3 = document.getElementById("pokemon-evolution-name-3");
    const pokemonEvolutionImage1 = document.getElementById("pokemon-evolution-image-1");
    const pokemonEvolutionImage2 = document.getElementById("pokemon-evolution-image-2");
    const pokemonEvolutionImage3 = document.getElementById("pokemon-evolution-image-3");

    pokemonEvolutionName1.textContent = nameEvolution1.charAt(0).toUpperCase() + nameEvolution1.slice(1);
    pokemonEvolutionImage1.src = imgEvolution1

    if (nameEvolution2 && nameEvolution3) {
        pokemonEvolutionName2.textContent = nameEvolution2.charAt(0).toUpperCase() + nameEvolution2.slice(1);
        pokemonEvolutionName3.textContent = nameEvolution3.charAt(0).toUpperCase() + nameEvolution3.slice(1);
        pokemonEvolutionImage2.src = imgEvolution2
        pokemonEvolutionImage3.src = imgEvolution3
        pokemonEvolutionContainer2.classList.remove('hidden')
        pokemonEvolutionContainer3.classList.remove('hidden')
    }
    else if (nameEvolution2 && !nameEvolution3) {
        pokemonEvolutionName2.textContent = nameEvolution2.charAt(0).toUpperCase() + nameEvolution2.slice(1);
        pokemonEvolutionImage2.src = imgEvolution2
        pokemonEvolutionContainer2.classList.remove('hidden')
    }
}

const getData = async (pokemon) => {

    try {
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
        const response = await fetch(url)
        const data = await response.json()

        const speciesUrl = data.species.url
        const response2 = await fetch(speciesUrl)
        const dataSpecies = await response2.json()

        const evolutionURL = dataSpecies.evolution_chain.url
        const responseEvolution = await fetch(evolutionURL)
        const dataEvolution = await responseEvolution.json()

        name = data.name
        id = data.id
        height = data.height
        weight = data.weight
        types = data.types
        abilities = data.abilities
        imgUrl = data.sprites.other['official-artwork'].front_default
        category = dataSpecies.genera[7] ? dataSpecies.genera[7].genus : dataSpecies.genera[0].genus
        egg_groups = dataSpecies.egg_groups
        habitat = dataSpecies.habitat
        generation = dataSpecies.generation
        evolution_chain = dataEvolution.chain

        hp = data.stats[0].base_stat
        attack = data.stats[1].base_stat
        defense = data.stats[2].base_stat
        specialAttack = data.stats[3].base_stat
        specialDefense = data.stats[4].base_stat
        speed = data.stats[5].base_stat

        IDCounter = id
        IDCounter === 1 ? prevBtn.classList.add('hidden') : prevBtn.classList.remove('hidden')
        IDCounter === 1008 ? nextBtn.classList.add('hidden') : nextBtn.classList.remove('hidden')

        setSPokemonData(name, id, height, weight, types, imgUrl, category, abilities, egg_groups, habitat, generation)
        setPokemonStatsBars(hp, attack, defense, specialAttack, specialDefense, speed)
        getEvolutionData(evolution_chain)
    }
    catch (error) {
        console.log(error)
        alert(error)
    }
}


buscarBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const searchPokemon = document.getElementById('search_pokemon').value.toLowerCase()
    pokemonEvolutionContainer2.classList.add('hidden')
    pokemonEvolutionContainer3.classList.add('hidden')

    getData(searchPokemon)
    document.getElementById('search_pokemon').value = ''
})

nextBtn.addEventListener('click', () => {
    pokemonEvolutionContainer2.classList.add('hidden')
    pokemonEvolutionContainer3.classList.add('hidden')

    IDCounter = IDCounter + 1
    getData(IDCounter)
})

prevBtn.addEventListener('click', () => {
    pokemonEvolutionContainer2.classList.add('hidden')
    pokemonEvolutionContainer3.classList.add('hidden')

    IDCounter = IDCounter - 1
    getData(IDCounter)

})


const evolutionButtons = (evolution) => {
    getData(evolution)
}

pokemonEvolutionContainer1.addEventListener('click', () => { evolutionButtons(evolution_chain.species.name) })
pokemonEvolutionContainer2.addEventListener('click', () => { evolutionButtons(evolution_chain.evolves_to[0].species.name) })
pokemonEvolutionContainer3.addEventListener('click', () => { evolutionButtons(evolution_chain.evolves_to[0].evolves_to[0].species.name) })

getData(1)

if (IDCounter === 1) prevBtn.classList.add('hidden')
if (IDCounter === 1008) nextBtn.classList.add('hidden')


