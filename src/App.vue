<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Pixelify+Sans:wght@400..700&display=swap");

html,
body,
#app,
.container-app {
  font-family: "Montserrat", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
}

.container-app {
  padding: 0 80px;
  margin: 0;
  box-sizing: border-box;
  background-color: #5bbdd5;
  min-height: 100vh;
}
.toolbar {
  background-color: #5bbdd5 !important;
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
  color: white !important;
  text-transform: none;
}
.title-link {
  color: white !important;
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
.toolbar-email {
  color: #222831;
  font-size: 0.95rem;
  margin-left: 16px;
}
.information-section-btn {
  display: flex;
  align-items: center;
}
</style>
