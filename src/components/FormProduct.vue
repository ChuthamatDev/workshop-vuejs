<template>
  <v-container>
    <v-card class="pa-4" max-width="500">
      <v-card-title>Add Product</v-card-title>

      <v-text-field v-model="form.productName" label="Product Name" />
      <v-text-field v-model="form.price" label="Price" type="number" />
      <v-text-field v-model="form.description" label="Description" />
      <v-text-field v-model="form.stock" label="Stock" type="number" />

      <!-- input file สำหรับรูปภาพ -->
      <v-file-input label="Image" accept="image/*" @change="onFileChange" />

      <v-btn color="primary" @click="handleCreate">Create Product</v-btn>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      form: {
        productName: "",
        price: "",
        description: "",
        stock: "",
        image: null, // เก็บ File object
      },
    };
  },
  methods: {
    // รับ File object จาก input
    onFileChange(file) {
      this.form.image = file;
    },

    async handleCreate() {
      const formData = new FormData();
      formData.append("name", this.form.productName);
      formData.append("price", this.form.price);
      formData.append("description", this.form.description);
      formData.append("stock", this.form.stock);

      if (this.form.image) {
        formData.append("image", this.form.image);
      }

      try {
        const response = await this.axios.post("/api/v1/products", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("Created:", response.data);
        alert("Product created successfully!");
      } catch (error) {
        console.error("Error:", error);
      }
    },
  },
};
</script>
