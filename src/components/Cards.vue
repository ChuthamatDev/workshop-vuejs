<template>
  <v-card class="profile-card" elevation="8">
    <v-row no-gutters>
      <v-col cols="12" md="4">
        <v-img
          src="@/assets/profile.png"
          alt="Profile"
          class="profile-img"
          height="100%"
          cover
        ></v-img>
      </v-col>

      <v-col cols="12" md="8" class="profile-body">
        <div class="profile-badge">Personal Portfolio</div>
        <v-card-title class="profile-name">
          Chuthamat Buaban (Praew)
        </v-card-title>
        <div class="profile-subtitle">
          Frontend Developer & Electrical Engineer
        </div>

        <v-card-text class="profile-text">
          <!-- <p>
            I'm a creative developer who blends modern UI, clean layout, and a
            soft pastel aesthetic to build engaging web interfaces.
          </p> -->
          <ul class="profile-info">
            <li>Bachelor of Engineering in Electrical Engineering</li>
            <li>Major: Power and Electronics</li>
            <li>Ubon Ratchathani University, Thailand</li>
          </ul>
        </v-card-text>

        <v-card-actions class="profile-actions">
          <v-chip class="profile-chip" small>React.js</v-chip>
          <v-chip class="profile-chip" small>JavaScript</v-chip>
          <v-chip class="profile-chip" small>UI Design</v-chip>
        </v-card-actions>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "Cards",
};
</script>

<style scoped>
.row.no-gutters > .col,
.row.no-gutters > [class*="col-"] {
  padding: 20px;
}

.profile-card {
  border-radius: 24px;
  overflow: hidden;
  /* border: 1px solid rgba(34, 40, 49, 0.08); */
  /* background: linear-gradient(135deg, #faf3ff 0%, #e8faf2 100%);
  box-shadow: 0 18px 45px rgba(34, 40, 49, 0.09); */
}

.profile-img {
  min-height: 260px;
  max-height: 100%;
  object-fit: cover;
}

.profile-body {
  padding: 28px 26px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.profile-badge {
  display: inline-block;
  margin-bottom: 12px;
  padding: 6px 14px;
  background-color: rgba(249, 178, 215, 0.25);
  color: #222831;
  border-radius: 999px;
  letter-spacing: 0.12em;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 600;
}

.profile-name {
  /* font-family: "Pixelify Sans", sans-serif; */
  font-size: 28px;
  /* letter-spacing: 0.05em; */
  color: #222831;
  margin: 0;
}

.profile-subtitle {
  margin: 8px 0 18px;
  color: #3e4a59;
  font-weight: 500;
}

.profile-text {
  padding: 0;
  margin: 0;
  color: #36404d;
}

.profile-text p {
  margin: 0 0 16px;
  line-height: 1.75;
}

.profile-info {
  padding-left: 18px;
  margin: 0;
  list-style-type: disc;
  color: #3e4a59;
  line-height: 1.8;
}

.profile-info li {
  margin-bottom: 8px;
}

.profile-actions {
  margin-top: 18px;
  flex-wrap: wrap;
  gap: 12px;
  padding: 0;
}

.profile-chip {
  background-color: rgba(207, 236, 243, 0.5);
  color: #222831;
  border: 1px solid rgba(34, 40, 49, 0.08);
  font-weight: 600;
}

@media (max-width: 960px) {
  .profile-body {
    padding: 22px 20px;
  }
}
</style>
