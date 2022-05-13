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

        <header-button-dock
          class="col"
          :projects="projects"
          :gateways="gateways"
          @report="showReport"
        ></header-button-dock>
      </q-toolbar>
    </q-header>

    <q-page-container v-if="reportData.data.length">
      <chart-layout :report-data="reportData"></chart-layout>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "@vue/reactivity";
import HeaderButtonDock from "./components/HeaderButtonDock.vue";
import ChartLayout from "./components/layouts/ChartLayout.vue";
import { getGateways, getProjects } from "./api";
import { onBeforeMount } from "@vue/runtime-core";

export default {
  name: "App",
  components: { HeaderButtonDock, ChartLayout },

  setup() {
    const reportData = ref({
      data: [],
      groupBy: "",
    });

    const projects = ref([]);
    const gateways = ref([]);

    onBeforeMount(async () => {
      Promise.all([getProjects(), getGateways()]).then(
        ([projectsResponse, gatewaysResponse]) => {
          projects.value = projectsResponse;
          gateways.value = gatewaysResponse;
        }
      );
    });

    return {
      reportData,
      projects,
      gateways,
      showReport: ({ filters, data }) => {
        reportData.value.data = data;
        reportData.value.filters = filters;
      },
    };
  },
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
