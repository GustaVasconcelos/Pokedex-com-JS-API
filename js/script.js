
const idPokemon = document.querySelector('#idPokemon')

const pesquisar = document.querySelector('#btnPesquisar')
const pesquisarResultado = document.querySelector('#pokemonResultado')

let pokemonQuantidades = 1154

fetch('https://pokeapi.co/api/v2/pokemon?limit='+pokemonQuantidades)
.then(response => 
   response.json()
)
.then(allpokemon => {
    
    var pokemons = []
    allpokemon.results.map((val) =>{

        

        fetch(val.url)
        .then(response => response.json())
        .then(imgsPokemon => {
            
            pokemons.push({nome:val.name,imagem:imgsPokemon.sprites.front_default,habilidades:[imgsPokemon.abilities],movimentos:[imgsPokemon.moves]})
            
            if(pokemons.length == pokemonQuantidades){
                

                var pokedexBox = document.querySelector('.pokedex-box')
                pokedexBox.innerHTML = ""


                pokemons.map((val) =>{
                    
                    pokedexBox.innerHTML += `
                    
                    <div class="card-pokemon">
                        <img src="${val.imagem}" alt="">
                        <p>${val.nome}</p>
                    </div>
                    
                    `
                })
                
                pesquisar.addEventListener('click', () =>{
                    console.log(pokemons[idPokemon.value - 1])
                    if(idPokemon.value == ''){
                        pesquisarResultado.innerHTML = `
                        
                        <div class="card-pokemon">
                            <p>Sem valores</p>
                        </div>
                        
                        `
                    }else if(idPokemon.value > pokemonQuantidades || idPokemon.value < 1 ){
                        pesquisarResultado.innerHTML = `
                        
                        <div class="card-pokemon">
                            <p>Pokemon não encontrado</p>
                        </div>
                        `
                    }
                    else{
                        
                        pesquisarResultado.innerHTML = `
                        
                        <div class="card-resultado">
                            <div class="card-resultado-dados">
        
                                <img src="${pokemons[idPokemon.value - 1].imagem}" alt="">
                                <p>${pokemons[idPokemon.value - 1].nome}</p>
        
                            </div>
                            <div class="card-resultado-dados2">
                                <p>Habilidade:</p>
                                <div class="abilitys">

                                </div>
        
                            </div>
                            <div class="card-resultado-dados3">
                                <p>Ataques: </p>
                                <div class="moves">

        
        
                                </div>
                            </div>
                        </div>

                        
                        `
                        const ability = document.querySelector('.abilitys')
                        const moves = document.querySelector('.moves')
                        if(pokemons[idPokemon.value - 1].habilidades[0].length == 0){
                            moves.innerHTML += `
                            
                                <p>Sem informações</p>
                            
                            `
                        }else{

                            for(let i = 0; i < pokemons[idPokemon.value - 1].habilidades[0].length; i++){
                                ability.innerHTML += `
                                
                                    <p>${pokemons[idPokemon.value - 1].habilidades[0][i].ability.name}</p>
                                
                                `
                            }
                        }

                        if(pokemons[idPokemon.value - 1].movimentos[0].length == 0){
                            moves.innerHTML += `
                            
                                <p>Sem informações</p>
                            
                            `
                        }else{

                            for(let i = 0; i < pokemons[idPokemon.value - 1].movimentos[0].length; i++){
                                moves.innerHTML += `
                                
                                    <p>${pokemons[idPokemon.value - 1].movimentos[0][i].move.name}</p>
                                
                                `
                            }
                        }

                    }

                    
                })
            }
        })

    })

})



