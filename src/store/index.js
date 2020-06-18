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
    currentPatient: emptyPatient(),
    overlay: false
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
    UPDATE_MAIL(state, Mail) {state.currentPatient.data.Mail = Mail},
    SET_CURRENT_PATIENT(state, patient){ state.currentPatient = patient },
    LOADING_OVERLAY(state) { state.overlay = true},
    LOADING_OVERLAY_BYE(state) { state.overlay = false}
  },
  actions: {
    //llama a los pacientes que están en la api
    setPatients({commit}){
      commit('LOADING_OVERLAY')
      axios.get(`${baseURL}/patients`)
      .then((response) => {
        commit('SET_PATIENTS', response.data)
        commit('SET_EMPTY_PATIENT')
        commit('LOADING_OVERLAY_BYE')
      })
    },
    postPatient({ dispatch, state }){
      axios.post(`${baseURL}/patient`, state.currentPatient.data)
      .then(() =>{
      dispatch('setPatients')
      })
    },
    deletePatient({ dispatch }, id){
    axios.delete(`${baseURL}/patient/${id}`)
      .then(() => {
        dispatch('setPatients')
      })
    },
    setCurrentPatient({ commit, getters }, id){
      //buscar si tenemos el paciente en la lista actual
      let targetPatient = getters.searchPatientById(id)
      //si lo encuentra, actualizar el currentPatient con ese paciente
      if (targetPatient){
        commit('SET_CURRENT_PATIENT', targetPatient)
      } else {
      //si no, hacer la llamada a axios
       axios.get(`${baseURL}/patient/${id}`)
      .then((response) => {
        commit('SET_CURRENT_PATIENT', response.data)
      }) 
      }
    },
    updatePatient({ state, dispatch }, id) {
      axios.put(`${baseURL}/patient/${id}`, state.currentPatient.data)
      .then(() => {
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
  getters: {
    searchPatientById: (state) => (id) => {
      return state.patients.find(patient => patient.id === id)    
    }  
  }
})
