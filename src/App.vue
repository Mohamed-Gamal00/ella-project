<template>
  <AppLayout>
    <router-view :key="$route.fullPath" />
    <QuickView />
  </AppLayout>
</template>
<script>
// import QuickView from "@/components/home_page/QuickView.vue";
import AppLayout from "./components/layout/AppLayout.vue";
import QuickView from "./components/home_page/QuickView.vue";
export default {
  components: { AppLayout, QuickView },
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
