import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const baseURL = 'https://us-central1-patient-hospital-warning.cloudfunctions.net/patients'
function emptyPatient(){
  return { id: null , data: {name: '', Mail: ''}}
}

export default new Vuex.Store({
  state: {
    patients:[],
    currentPatient: emptyPatient()
  },
  mutations: {
    SET_EMPTY_PATIENT(state) {
      state.currentPatient.id = null;
      const empty = emptyPatient()
      Object.keys(empty.data).forEach(key => {
        state.currentPatient.data[key] = empty.data[key]
      })
    },
    //esta mutación toma los pacientes que ingresamos y los agrega a la data
    SET_PATIENTS(state, data) {state.patients = data},
    UPDATE_NAME(state, name) {state.currentPatient.data.name = name},
    UPDATE_MAIL(state, Mail) {state.currentPatient.data.Mail = Mail}
  },
  actions: {
    //llama a los pacientes que están en la api
    setPatients({commit}){
      axios.get(`${baseURL}/patients`)
      .then((response) => {
        commit('SET_PATIENTS', response.data)
        commit('SET_EMPTY_PATIENT')
      })
    },
    postPatient({ dispatch, state }){
      axios.post(`${baseURL}/patient`, state.currentPatient.data)
      .then(() =>{
      dispatch('setPatients')
      })
    },
    updateName({commit}, name){
      commit('UPDATE_NAME', name)
    },
    updateMail({commit}, Mail){
      commit('UPDATE_MAIL', Mail)
    },

  },
  modules: {
  }
})
