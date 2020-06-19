<template>
    <div>
        <div class="text-center">
        <v-card max-width="500" class="mx-auto mt-10" outlined>
          <h1 class="mt-7">Ingreso de pacientes</h1>
        <v-form class="mx-10">
        <v-text-field label="Nombre" type="text" :value="currentPatient.data.name" @input="updateName" single-line/>
        <v-text-field label="Mail" type="text" :value="currentPatient.data.Mail" @input="updateMail" single-line/>
        </v-form>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
            <v-btn depressed color="warning" class="mr-8 font-weight-black" @click="submitForm">{{ !!currentPatient.id ? 'Actualizar' : 'Agregar Paciente' }}</v-btn>
        </v-card-actions>
      </v-card>
  </div>
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
  computed:{
      ...mapState(['currentPatient'])
  },
  methods:{
      ...mapActions(['updateName', 'updateMail', 'postPatient', 'updatePatient']),
      submitForm(){
          if(this.currentPatient.id) {
          // si tiene id, llama a la función que actualiza los datos
          this.updatePatient(this.currentPatient.id)
        } else {
          this.postPatient()
        }
      }
    }
  }

</script>