<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="transparent text-dark">
      <q-toolbar>
        <q-toolbar-title>Reports</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <HelloWorld />
    </q-page-container>
  </q-layout>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "LayoutDefault",

  components: {
    HelloWorld,
  },
};
</script>
