<template>
  <v-card class="profile-card" elevation="2">
    <v-row no-gutters style="height: 100%">
      <v-col cols="12" md="4">
        <v-img
          src="@/assets/profile.png"
          alt="Profile"
          height="100%"
          cover
          class="profile-img"
        />
      </v-col>

      <v-col cols="12" md="8">
        <div class="profile-body">
          <div class="profile-badge">
            <v-icon small class="mr-1">mdi-briefcase-outline</v-icon>
            Personal Portfolio
          </div>

          <h2 class="profile-name">
            Chuthamat Buaban
            <span class="profile-nickname">(Praew)</span>
          </h2>

          <p class="profile-org">
            <v-icon small class="mr-1">mdi-map-marker-outline</v-icon>
            INET Innovation Hub · Nakhon Ratchasima
          </p>

          <v-divider class="my-3" />

          <div class="profile-info-list">
            <div class="profile-info-row">
              <v-icon small class="mr-2">mdi-school-outline</v-icon>
              Bachelor of Engineering in Electrical Engineering
            </div>
            <div class="profile-info-row">
              <v-icon small class="mr-2">mdi-lightning-bolt-outline</v-icon>
              Major: Power and Electronics
            </div>
            <div class="profile-info-row">
              <v-icon small class="mr-2">mdi-domain</v-icon>
              Ubon Ratchathani University, Thailand
            </div>
          </div>

          <div class="profile-chips">
            <v-chip
              v-for="skill in skills"
              :key="skill"
              small
              class="profile-chip"
            >
              {{ skill }}
            </v-chip>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "Cards",
  data() {
    return {
      skills: ["React.js", "JavaScript", "UI Design"],
    };
  },
};
</script>

<style scoped>
.profile-card {
  border-radius: 16px;
  overflow: hidden;
}

.profile-img {
  min-height: 260px;
}

.profile-body {
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}

.profile-badge {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  margin-bottom: 12px;
  padding: 3px 10px;
  background-color: #eeedfe;
  color: #3c3489;
  border-radius: 8px;
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 500;
}

.profile-name {
  font-size: 20px;
  font-weight: 500;
  color: #222831;
  line-height: 1.3;
  margin: 0;
}

.profile-nickname {
  font-weight: 400;
  color: #888;
}

.profile-org {
  margin-top: 4px;
  font-size: 13px;
  color: #6b7280;
  display: flex;
  align-items: center;
}

.profile-info-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.profile-info-row {
  display: flex;
  align-items: flex-start;
  font-size: 13px;
  color: #4b5563;
  line-height: 1.5;
}

.profile-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
}

.profile-chip {
  border: 0.5px solid rgba(34, 40, 49, 0.15) !important;
  background-color: #f5f5f4 !important;
  color: #374151 !important;
  font-weight: 500;
}

@media (max-width: 960px) {
  .profile-img {
    min-height: 200px;
    max-height: 220px;
  }

  .profile-body {
    padding: 20px;
  }
}
</style>
