<template>
    <Loading v-if="loading"  />
    <div class="homepage">
      <TableList filter :data="visiblePokemons" >
            <template #Filter>
                <div class="homepage__select-wrapper">
                    <h5>Filter By Types</h5>
                    <select class="homepage__select-wrapper__custom-select" v-model="selectedType" @change="filterPokemonsByType">
                        <option value="">All</option>
                        <option v-for="(type, index ) in uniqueTypes" :key="index" :value="type">{{ type }}</option>
                      </select>
                </div>
            </template>
      </TableList>
    </div>
  </template>
  
  <script>
  import { defineComponent, ref, onMounted, watch, computed } from 'vue';
  import TableList from '../components/TableList.vue'
  import { useFetchPokemon } from '../composables/index.js'
  import Loading  from '../components/Loading.vue'

  
  export default defineComponent({
    components: {
      TableList,
      Loading,
    },
    setup(){

        const pokemons = ref([]);
        const selectedType = ref('');
        const visiblePokemons = ref([]);
        const pokemonTypes = ref([]);
        const pages = ref(10);
        const canLoadMore = ref(true);
        
        const { data, error, loading, fetchPokemons } = useFetchPokemon();

        const uniqueTypes = computed(() => {
            const typeSet = new Set();

            for (const pokemon of data.value) {
                for (const type of pokemon.types) {
                typeSet.add(type);
            }
            }

            return Array.from(typeSet);
        });


        const filterPokemons = () => {
            visiblePokemons.value = data.value.filter(
            (pokemon) => !selectedType.value || pokemon.types.includes(selectedType.value)
            );
        };

        const filterPokemonsByType = () => {
            filterPokemons();
        };

        const handleScroll = () => {
              const scrollPosition = window.innerHeight + window.scrollY;
              const contentHeight = document.body.offsetHeight;

              if (scrollPosition >= contentHeight && !loading.value) {
                  pages.value *= 2; // Double the value of pages
                  fetchMorePokemons();
              }
          };

          const fetchMorePokemons = () => {
              fetchPokemons(pages.value).then((newData) => {
                  pokemons.value = newData;
                  filterPokemons();
              });
          };


        onMounted(() => {
            fetchPokemons(10).then((data) => {
                pokemons.value = data;
                filterPokemons();
            });
            window.addEventListener('scroll', handleScroll);
        })

        watch(selectedType, () => {
            filterPokemons();
        });

        return {
            loading,
            error,
            visiblePokemons,
            selectedType,
            filterPokemonsByType,
            pokemonTypes,
            uniqueTypes
        }
    }    
  });
  </script>

<style lang="scss" scoped>

.homepage {
    

    &__select-wrapper {
        
        
         margin: 10px 0px;
         position: relative;
         width: 200px;

         &__custom-select {
            margin: 10px 0px;
             appearance: none;
            -webkit-appearance: none;
            border: 1px solid #ccc;
            border-radius: 4px;
            padding: 10px;
            width: 100%;
            font-size: 14px;
            background: #fff url('data:image/svg+xml;utf8,<svg fill="#000000" height="20" width="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>') no-repeat right 10px center;
            background-size: 20px 20px;
            cursor: pointer;
            text-align: center;
         }

         &__custom-select:focus{
            border-color: blue;
            outline: none;
         }
        
    }

}

</style>

