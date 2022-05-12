<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="transparent text-dark">
      <q-toolbar class="app-header row justify-between items-start">
        <q-toolbar-title class="app-header__title col-auto">
          <h1 class="text-dark">Reports</h1>
          <h2 class="text-info">
            Easily generate a report of your transactions
          </h2>
        </q-toolbar-title>

        <header-button-dock class="col"></header-button-dock>
      </q-toolbar>
    </q-header>

    <q-page-container> </q-page-container>
  </q-layout>
</template>

<script>
import HeaderButtonDock from "./components/HeaderButtonDock.vue";
export default {
  name: "App",
  components: { HeaderButtonDock },
};
</script>

<style lang="scss" scoped>
.app-header {
  margin-top: 1rem;

  &__title.col-auto {
    align-self: flex-start;
    max-width: 50vw;
  }
}
</style>
