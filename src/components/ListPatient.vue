<template>
    <div>
        <h1>lista</h1>
        <ul>
            <li :key='patient.id' v-for='patient in patients'> {{patient.data.name}} || {{patient.data.Mail}}</li>
        </ul>
    </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
    methods:{
        ...mapActions(['setPatients'])
    },
    computed:{
        //traemos la propiedad que está en el state del store
        ...mapState(['patients'])
    },
    created(){
        this.setPatients()
    }
}
</script>