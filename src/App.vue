<template>
  <AppLayout>
    <router-view :key="$route.fullPath" />
    <QuickView />
    <v-snackbar
      v-model="bar"
      location="left bottom"
      color="success"
      max-width="300"
      timeout="3000"
    >
      <template v-slot:actions>
        <v-icon @click="bar = false">mdi-close</v-icon>
      </template>
      {{ itemTitle }} has been added to your cart successfully
    </v-snackbar>
  </AppLayout>
</template>
<script>
// import QuickView from "@/components/home_page/QuickView.vue";
import AppLayout from "./components/layout/AppLayout.vue";
import QuickView from "./components/layout/QuickView.vue";
export default {
  inject: ["Emitter"],
  components: { AppLayout, QuickView },
  data() {
    return {
      bar: false,
      itemTitle: "",
    };
  },
  mounted() {
    this.Emitter.on("showMsg", (data) => {
      this.itemTitle = data;
      this.bar = true;
    });
  },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.v-rating__wrapper {
  margin-right: 10px;
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
