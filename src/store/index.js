import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const baseURL = 'https://us-central1-patient-hospital-warning.cloudfunctions.net/patients'

export default new Vuex.Store({
  state: {
    patients:[],
  },
  mutations: {
    //esta mutación toma los pacientes que ingresamos y los agrega a la data
    SET_PATIENTS(state, data) {state.patients = data},
  },
  actions: {
    //llama a los pacientes que están en la api
    setPatients({commit}){
      axios.get(`${baseURL}/patients`)
      .then((response) => {
        commit('SET_PATIENTS', response.data)
      })
    }
  },
  modules: {
  }
})
