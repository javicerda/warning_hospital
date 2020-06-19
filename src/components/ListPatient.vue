<template>
    <div class="mt-15">
        <h1 class="text-center">Listado de pacientes</h1>
        <v-simple-table class="mx-16 mt-10">
            <template v-slot:default>
            <thead>
                <tr>
                <th class="text-left">Nombre</th>
                <th class="text-left">Mail</th>
                <th class="text-left">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for='patient in patients' :key='patient.id'>
                <td>{{patient.data.name}}</td>
                <td>{{patient.data.Mail}}</td>
                <td>
                    <v-btn fab dark small color="red" class="mx-3" @click="removePatient(patient.id)">
                    <v-icon>mdi-delete</v-icon> </v-btn>
                    <v-btn fab dark small color="primary" @click="editPatient(patient.id)">
                    <v-icon>mdi-pencil</v-icon> </v-btn> 
                </td>
                </tr>
            </tbody>
            </template>
        </v-simple-table>
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