<template>
  <v-sheet class="mx-auto" max-width="300">
    <h3>Workshop 2</h3>
    <br />
    <v-form ref="form" @submit.prevent="submit">
      <v-text-field
        v-model="input"
        :rules="rules"
        label="Enter your grade number"
        type="number"
      ></v-text-field>

      <v-btn :loading="loading" class="mt-2" type="submit" color="primary" block
        >Submit</v-btn
      >
    </v-form>

    <v-alert
      v-if="grade"
      class="mt-4"
      :type="gradeAlert.type"
      :color="gradeAlert.color"
      outlined
    >
      Score: <strong>{{ input }}</strong> — Grade: <strong>{{ grade }}</strong>
      <div>{{ gradeAlert.message }}</div>
    </v-alert>
  </v-sheet>
</template>

<script>
export default {
  name: "GradeView",

  data() {
    return {
      loading: false,
      input: "",
      grade: null,
      rules: [
        (value) => {
          if (!value && value !== 0) return "Please enter a grade number";
          const num = Number(value);
          if (isNaN(num)) return "Please enter numbers only";
          if (num < 0 || num > 100) return "Score must be between 0 and 100";
          return true;
        },
      ],
    };
  },

  computed: {
    gradeAlert() {
      const map = {
        A: { type: "success", color: "green", message: "Excellent" },
        B: { type: "success", color: "teal", message: "Good job" },
        C: { type: "warning", color: "orange", message: "Not bad" },
        D: { type: "warning", color: "amber", message: "Need improvement" },
        F: { type: "error", color: "red", message: "Failed. Try again" },
      };
      return map[this.grade] || {};
    },
  },

  methods: {
    getGrade(score) {
      if (score >= 80) return "A";
      else if (score >= 70) return "B";
      else if (score >= 60) return "C";
      else if (score >= 50) return "D";
      else return "F";
    },

    async submit() {
      const valid = this.$refs.form.validate();
      if (!valid) return;

      this.loading = true;
      await new Promise((resolve) => setTimeout(resolve, 500));
      this.grade = this.getGrade(Number(this.input));
      this.loading = false;
    },
  },
};
</script>
