<template>
  <div>
    Simple Component <br />
    ค่าที่ได้รับ : {{ send_dialog }}
  </div>
</template>

<script>
export default {
  props: ["send_dialog"],
  data() {
    return {};
  },
};
</script>
