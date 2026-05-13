<script>
export default {
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.axios.get("http://localhost:3000/api/v1/login").then((res) => {
        console.log(res);
      });
    },
  },
};
</script>
