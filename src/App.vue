<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Prompt:wght@100;200;300;400;500;600;700&display=swap");

html,
body,
#app,
.container-app,
.v-application,
.v-application .title,
.v-application .text-h1,
.v-application .text-h2,
.v-application .text-h3,
.v-application .text-h4,
.v-application .text-h5,
.v-application .text-h6,
.v-application .text-subtitle-1,
.v-application .text-subtitle-2,
.v-application .text-body-1,
.v-application .text-body-2,
.v-application .text-button,
.v-application .text-caption,
.v-application .text-overline,
.v-application input,
.v-application button,
.v-application select,
.v-application textarea,
.v-application .v-btn,
.v-application .v-input,
.v-application .v-card,
.v-application .v-list-item,
.v-application .v-dialog,
.v-application .v-alert {
  font-family: "Prompt", sans-serif !important;
}

/* Preserve monospace for IDs and code blocks */
.order-id,
.order-id-chip,
.v-application code,
.v-application kbd,
.v-application pre,
.v-application samp {
  font-family: monospace !important;
}

.container-app {
  padding: 0 80px;
  margin: 0;
  box-sizing: border-box;
  background-color: #e3f2fd;
  min-height: 100vh;
}
.toolbar {
  background-color: #0288d1 !important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}
.montserrat-toolbar {
  font-family: "Prompt", sans-serif;
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
  font-family: "Prompt", sans-serif;
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

/* Global Form Rounded Styles & Blue Theme Customization */
.v-card {
  border-radius: 16px !important;
  overflow: hidden !important;
}

.v-text-field--outlined fieldset {
  border-radius: 12px !important;
  border-color: rgba(2, 136, 209, 0.4) !important;
  transition: border-color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.v-text-field--outlined:hover fieldset {
  border-color: rgba(2, 136, 209, 0.7) !important;
}

.v-text-field--outlined.v-input--is-focused fieldset {
  border-color: #0288d1 !important;
}

.v-btn {
  border-radius: 12px !important;
}

.v-input input,
.v-input textarea,
.v-input select {
  border-radius: 12px !important;
}

</style>
