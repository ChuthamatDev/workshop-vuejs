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
        <router-link to="/" class="toolbar-link title-link pixelify-title">Chuthamat</router-link>
      </v-toolbar-title>

      <v-spacer />

      <v-btn text class="toolbar-link" to="/">
        Home
      </v-btn>
      <v-btn text class="toolbar-link" to="/education">
        Education
      </v-btn>
      <v-btn text class="toolbar-link" to="/hobbie">
        Hobbies
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Pixelify+Sans:wght@400..700&display=swap');

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
.pixelify-title {
  font-family: "Pixelify Sans", sans-serif;
  font-optical-sizing: auto;
  font-weight: 600;
  font-style: normal;
  font-size: 24px !important;
  letter-spacing: 1px;
}
.information-section-btn {
  display: flex;
  align-items: center;
}
</style>
