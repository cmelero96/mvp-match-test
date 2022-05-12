<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="transparent text-dark">
      <q-toolbar>
        <q-toolbar-title>
          <h1 class="text-dark">Reports</h1>
          <h2 class="text-info">
            Easily generate a report of your transactions
          </h2>
        </q-toolbar-title>
        <header-button-dock></header-button-dock>
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
