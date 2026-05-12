<template>
  <v-app 
    class="container-app">
    <v-app-bar
      app
      flat
      elevate-on-scroll
      class="toolbar montserrat-toolbar"
    >
      <v-toolbar-title class="toolbar-title">
        <router-link to="/" class="toolbar-link title-link">Chuthamt</router-link>
      </v-toolbar-title>

      <v-spacer />

      <v-btn text class="toolbar-link" to="/home">
        Home
      </v-btn>
      <v-btn text class="toolbar-link" to="/about">
        About
      </v-btn>
      <v-btn text class="toolbar-link" to="/skill">
        Skills
      </v-btn>
      <v-btn text class="toolbar-link" to="/contact">
        Contact
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
      <div class="information-section">
        <v-btn @click="show = !show" class="mt-4 center" >
          View
        </v-btn>
        <v-if v-if="show">
          <p class="text-center" v-for="(item, index) in items" :key="index">
            {{ item.message }}
          </p>
        </v-if>
      </div>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      name: 'Chuthamat Buaban',
      show: true,
      items: [
        { message: 'Basic Vue Workshop' },
        { message: 'Vuetify Workshop' }
      ]
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400&display=swap');

html, body, #app, .container-app {
  font-family: "Montserrat", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
}

.container-app {
  padding: 0 80px;
  margin: 0;
  box-sizing: border-box;
  background-color: #DAF9DE;
  min-height: 100vh;
}
.toolbar {
  background-color: #CFECF3 !important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}
.montserrat-toolbar {
  font-family: "Montserrat", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
}
.toolbar-title {
  font-weight: 400;
}
.toolbar-link {
  color: #222831 !important;
  text-transform: none;
}
.title-link {
  color: #222831 !important;
  text-decoration: none;
  font-weight: 700;
}
</style>
