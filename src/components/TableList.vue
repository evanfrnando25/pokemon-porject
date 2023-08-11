<template>
    <div class="tableList" v-if="data">
        <div v-if="filter"  class="filter">
              <slot name="Filter"></slot>
        </div>
        <table>
            <tr>
                <th>No</th>
                <th>Name</th>
                <th>Image</th>
                <th>Type</th>
                <th>Action</th>
            </tr>
            <tr v-for="(item, index) in data" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ item.name }}</td>
                <td> <img :src="item.image" width="40" /> </td>
                <td> {{ item.types.join(' | ') }} </td>
                <td>  <button @click="goDetailPage(item.name)">  Detail </button>  </td>
            </tr>
        </table>
    </div>
</template>

<script>

import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';


export default defineComponent({  
    props: {
        data: {
            type: Array || Object,
            required: true,
        },
        filter: {
            type: Boolean,
            required: false
        }
    },
    setup() {

        const router = useRouter()

         const goDetailPage = (pokemonName) => {
            router.push({ name: 'DetailPage', params: { pokemonName: pokemonName } });
        };

        return {
            goDetailPage
        }

    }
})

</script>


<style lang="scss" scoped>
.tableList {

    padding: 20px;

    table {
        border-collapse: collapse;
        width: 100%;

        td , th { 
            border: 2px solid #ddd;
            padding: 8px;
        }

        td {
            text-align: center;
        }
    }

    button {
        padding: 10px;
        border-radius: 10px;
        background: red;
        color: white;
        cursor: pointer;
    }

}

.filter {
    margin: 20px 0px;
}
</style>