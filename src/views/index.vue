<template>
    <div class="container">
      <TableList :selectedType="selectedType" @change="filterPokemonsByType" :data="visiblePokemons" :pokemonTypes="pokemonTypes" />
    </div>
  </template>
  
  <script>
  import { defineComponent, ref, onMounted, watch } from 'vue';
  import PokemonList from '../components/PokemonList.vue';
  import TableList from '../components/TableList.vue'
  import { request } from 'graphql-request';

  
  export default defineComponent({
    components: {
      PokemonList,
      TableList
    },
    setup(){

        const pokemons = ref([]);
        const selectedType = ref('');
        const visiblePokemons = ref([]);
        const pokemonTypes = ref([]);

        const fetchPokemons = async (first) => {
            const query = `{
                pokemons(first: ${first}) {
                id
                name
                image
                types
                }
            }`;
  
            try {
                const data = await request('https://graphql-pokemon2.vercel.app/', query);
                pokemonTypes.value = [...new Set(data.pokemons.flatMap((pokemon) => pokemon.types))];
                return data.pokemons;
            } catch (error) {
                console.error('Error fetching Pokémon data:', error);
            }
        };

        const filterPokemons = () => {
            visiblePokemons.value = pokemons.value.filter(
            (pokemon) => !selectedType.value || pokemon.types.includes(selectedType.value)
            );
        };

        const filterPokemonsByType = () => {
            filterPokemons();
        };

        const goDetailPage = (pokemonName) => {
            router.push({ name: 'DetailPage', params: { pokemonName: pokemonName } });
        };

        onMounted(() => {
            fetchPokemons(10).then((data) => {
                pokemons.value = data;
                filterPokemons();
            });
        })

        watch(selectedType, () => {
            filterPokemons();
        });

        return {
            visiblePokemons,
            selectedType,
            filterPokemonsByType,
            pokemonTypes
        }
    }    
  });
  </script>

