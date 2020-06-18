<template>
    <div>
        <h1>lista</h1>
        <ul>
            <li v-for='patient in patients' :key='patient.id'> {{patient.data.name}} || {{patient.data.Mail}}
              <v-btn text @click="removePatient(patient.id)">
                <v-icon>mdi-delete</v-icon> </v-btn>
                <v-btn text @click="editPatient(patient.id)">
                <v-icon>mdi-pencil</v-icon> </v-btn>  
            </li>
        </ul>
    </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
    methods:{
        ...mapActions(['setPatients', 'deletePatient', 'setCurrentPatient', 'updatePatient']),
        removePatient(id){
            let confirmation = confirm('¿Estás seguro que deseas eliminar este paciente?')
            if (confirmation) {
                this.deletePatient(id)
            }
        },
        editPatient(id){
        this.setCurrentPatient(id)
        }
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