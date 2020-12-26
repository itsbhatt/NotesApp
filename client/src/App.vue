<template>
  <main class="fluid-container">
    <div>
      <Menu />
      <Main />
    </div>
  </main>
</template>

<script>
import Menu from "./components/Menu/Menu.vue";
import Main from "./components/Main/Main.vue";

export default {
  name: "App",
  components: {
    Menu,
    Main,
  },
};
</script>

<style scoped>
.fluid-container > div {
  background: #ffffff;
  border-radius: 30px;
  overflow: hidden;
  height: 100%;
}

@media (min-width: 500px) {
  .fluid-container {
    height: 100vh;
    overflow: hidden;
    background: #e4e9f4;
    padding: 2%;
  }
  .fluid-container > div {
    display: grid;
    grid-template-columns: minmax(60px, 90px) auto;
  }
}
</style>
