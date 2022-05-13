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
          @report="showReport"
        ></header-button-dock>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <donut-chart
        :data-entries="reportData.data"
        :groupBy="'project'"
      ></donut-chart>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "@vue/reactivity";
import HeaderButtonDock from "./components/HeaderButtonDock.vue";
import DonutChart from "./components/layouts/DonutChart.vue";

// const REPORT_LAYOUTS = {
//   graph: "Graph layout",
//   multi: "Multi layout",
//   single: "Single project & gateway layout",
// };

export default {
  name: "App",
  components: { HeaderButtonDock, DonutChart },

  setup() {
    const reportData = ref({
      data: [],
      groupBy: "",
    });

    return {
      reportData,
      showReport: ({ filters, data }) => {
        reportData.value.data = data;
        if ((filters.projects === 1) ^ (filters.gateways === 1)) {
          reportData.value.groupBy = "graph";
        } else if (filters.projects === 1 && filters.gateways === 1) {
          reportData.value.groupBy = "single";
        } else {
          reportData.value.groupBy = "multi";
        }
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
