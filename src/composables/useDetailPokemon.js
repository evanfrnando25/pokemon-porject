import { ref } from 'vue';
import { request } from 'graphql-request';


const useDetailPokemon = () => {
  const data = ref([]),
  loading = ref(false),
  error = ref(null)

    const fetchPokemons = async (name) => {
      loading.value = true

      const query = `
       query GetPokemon($name: String!) {
          pokemon(name: $name) {
            image
            maxHP
            name
    		weight {
              minimum
              maximum
            }
    		height{
              minimum
              maximum
            }
    		classification
    		types
    		attacks {
              fast {
                name
                type
                damage
              }
              special {
                name
                type
                damage
              }
            }
    	    weaknesses
    		fleeRate
    		maxCP
    		  evolutions{
                image
                name
              }
            }
        }`;
  

      try {
          const response = await request ('https://graphql-pokemon2.vercel.app/', query, { name: name});
          data.value = response.pokemon
      } catch (error) {
        console.log(error)
      } finally {
        loading.value = false
      }

    }

  return {
    data,
    loading,
    error,
    fetchPokemons
  };
};

export default useDetailPokemon;