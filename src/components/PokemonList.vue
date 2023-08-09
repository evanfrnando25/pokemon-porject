<template>
    <div class="pokemonList">
      <div class="pokemonList__filter">
        <h1>List Pokemon</h1>
        <select v-model="selectedType" @change="filterPokemonsByType">
          <option value="">All</option>
          <option v-for="type in pokemonTypes" :key="type" :value="type">{{ type }}</option>
        </select>
      </div>
  
      <ul>
        <li v-for="pokemon in visiblePokemons" :key="pokemon.id">
          <img :src="pokemon.image" @click="goDetailPage(pokemon.name)" />
          {{ pokemon.attack }}
          {{ pokemon.name }}
          {{ pokemon.types }}
        </li>
      </ul>
      </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted, watch } from 'vue';
  import { request } from 'graphql-request';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const pokemons = ref([]);
  const selectedType = ref('');
  const batchSize = 10;
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
    fetchPokemons(batchSize).then((data) => {
      pokemons.value = data;
      filterPokemons();
    });
  });
  
  watch(selectedType, () => {
    filterPokemons();
  });
  
  </script>

<style lang="scss" scoped>
.pokemonList {
  padding: 50px;

  &__filter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 30px;
    

    select {
      position: relative;
      display: flex;
      width: 20em;
      height: 3em;
      border-radius: .25em;
      overflow: hidden;
      text-align: center;
    }

    select::after{
      content: '\25BC';
      position: absolute;
      top: 0;
      right: 0;
      padding: 1em;
      background-color: #34495e;
      transition: .25s all ease;
      pointer-events: none;
    }

    select:hover::after{
      color: red;
    }

  }

}
</style>
  