<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
     
<v-toolbar-title><b> Warning Hospital </b></v-toolbar-title>
</div>
      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <v-icon>mdi-domain</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <form-patient/>
      <list-patient/>
              <v-overlay :value="overlay">
                <v-progress-circular indeterminate size="64"></v-progress-circular>
              </v-overlay>

    </v-content>
  </v-app>
</template>

<script>
import ListPatient from './components/ListPatient';
import FormPatient from './components/FormPatient';
import {mapState} from 'vuex'

export default {
  name: 'App',

  components: {
    ListPatient,
    FormPatient
  },

  data: () => ({
    //
  }),
  computed:{
        ...mapState([ 'overlay' ])
    },
};
</script>
