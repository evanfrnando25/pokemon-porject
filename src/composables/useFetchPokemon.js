import { ref } from 'vue';
import { request } from 'graphql-request';


const useFetchPokemon = () => {
  const data = ref([]),
  loading = ref(false),
  error = ref(null)

    const fetchPokemons = async (first) => {
      loading.value = true

      const query = `{
        pokemons(first: ${first}) {
          id
          name
          image
          types
        }
      }`;

      try {
          const response = await request ('https://graphql-pokemon2.vercel.app/', query);
          data.value = response.pokemons
      } catch (error) {
        console.log(error)
      } finally {
        loading.value= false
      }

    }

  return {
    data,
    loading,
    error,
    fetchPokemons
  };
};

export default useFetchPokemon;