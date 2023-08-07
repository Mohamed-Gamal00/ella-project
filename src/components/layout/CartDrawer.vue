<template>
  <div>
    <v-navigation-drawer v-model="drawer" temporary location="right">
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur
        quos minus nam laboriosam quod aliquid, debitis, qui eveniet modi
        recusandae quae adipisci accusantium ab nesciunt! Quos consectetur ipsam
        soluta voluptatum!
      </p>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  inject: ["Emitter"],
  data() {
    return {
      drawer: false,
    };
  },

  mounted() {
    this.Emitter.on("openCart", () => {
      this.drawer = true;
    });
  },
};
</script>

<style lang="scss" scoped></style>
