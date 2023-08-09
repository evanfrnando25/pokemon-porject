<template>
    <div>
      <ul>
        <h1>asda</h1>
        <img :src="pokemons.image" />
      </ul>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { request } from 'graphql-request';
  
  export default {
    props: ['pokemonName'],
    setup(props) {
      const pokemons = ref([]);
      console.log(props.pokemonName)
  
      const fetchPokemons = async (name) => {
        const query = `
        query GetPokemon($name: String!) {
          pokemon(name: $name) {
            id
            image
            maxHP
          }
        }`;
  
        try {
          const data = await request('https://graphql-pokemon2.vercel.app/', query, { name: props.pokemonName});
          pokemons.value = data.pokemon;
        } catch (error) {
          console.error('Error fetching Pokémon data:', error);
        }
      };

      

      
  
      console.log(props.id, 'test')
      console.log(props.name, 'test')
      onMounted(() => {
        fetchPokemons();
      });
  
      return {
        pokemons,
      };
    },
  };
  </script>