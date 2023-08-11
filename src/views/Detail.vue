<template>
    <Loading v-if="loading" />
    <div class="detail-pokemon"  :key="pokemonName">
        <div class="detail-pokemon__summary">
            <div class="detail-pokemon__summary__title">
              <h1> {{ data.name }}</h1>
              <Card>
                <template #content>
                      <img :src="data.image" />
                </template>
              </Card>
            </div>
            <div class="detail-pokemon__summary__evolution">
            <Card header>
              <template #header>
                <h3>Evolutions</h3>
              </template>
              <template #content v-if="data.evolutions">
                <Card v-for="items in data.evolutions" :key="items">
                    <template #content>
                      <div class="detail-pokemon__summary__evolution__card" @click="goDetailPage(items.name)">
                         <img :src="items.image" />
                         <h5> {{ items.name }} </h5>
                      </div>
                    </template>
                </Card>
              </template>
              <template #content v-else>
                None
              </template>
            </Card>
          </div>
        </div>
        <div class="detail-pokemon__description">
          <Card header v-for="(items, index) in selectedField" :key="index" >
            <template #header>
                {{  index }}
            </template>
            <template #content>
                {{ items }}
            </template>
          </Card>
        </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, watch } from 'vue';
  import { useDetailPokemon } from '../composables/index.js'
  import { useRouter } from 'vue-router';
  import Card from '../components/Card.vue'
  import Loading from '../components/Loading.vue'
  
  export default {
    components: {
      Card,
      Loading
    },
    props: ['pokemonName'],
    setup(props) {
      
      const { data , loading , error, fetchPokemons } = useDetailPokemon();

      const router = useRouter()

      const selectedField = ref({})
      const fieldNames = ['maxHP', 'classification', 'fleeRate', 'maxCP'];

      onMounted(async() => {
        await fetchPokemons(props.pokemonName);
        for (const fieldName of fieldNames) {
          selectedField.value[fieldName] = data.value[fieldName];
        }
      });

      const goDetailPage = (pokemonName) => {
        router.push({ name: 'DetailPage', params: { pokemonName: pokemonName } });
         fetchPokemons(pokemonName);
      };

      watch(() => props.pokemonName, (newValue, oldValue) => {
        if (newValue !== oldValue) {
          fetchPokemons(newValue);
        }
      });

  
      return {
        data,
        loading,
        error,
        selectedField,
        goDetailPage
      };
    },
  };
  </script>

<style lang="scss" scoped>
.detail-pokemon {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(2, 1fr);
  padding: 50px;

  &__summary{
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 30px;

    &__title {
      text-align: center;
      
       h1 {
        background: red;
        width: 30%;
        text-align: center;
        border-radius: 20px;
       }
    }

    &__evolution{
      max-width: 300px;
      
      &__card{
        display: flex;
        gap: 20px;
        align-items: center;
        cursor: pointer;
      }

      &__card:hover {
        background-color: aliceblue;
      }
      
      img {
        width: 90px;
        display: flex;
      }

    }

  }

}

</style>