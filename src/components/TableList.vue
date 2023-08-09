<template>
    <div class="tableList">

        <div class="filter">
            <select @click="changeSelectedType('newType')" @change="filterPokemonsByType">
                <option value="">All</option>
                <option v-for="type in pokemonTypes" :key="type" :value="type">{{ type }}</option>
              </select>
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
                <td> {{ item.types }} </td>
                <td>  Detail  </td>
            </tr>
        </table>
    </div>
</template>

<script>

import { defineComponent, ref } from 'vue';

export default defineComponent({  

    props: ['data','pokemonTypes', 'selectedType' , 'filterPokemonsByType'],

    setup(props, {emit}){
        
        const changeSelectedType = (newType) => {
            emit('update:selectedType', newType); // Emit event to update selectedType in parent
        };

    return {
      changeSelectedType,
    };

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
            border: 1px solid #ddd;
            padding: 8px;
        }

        td {
            text-align: center;
        }
    }

}
</style>