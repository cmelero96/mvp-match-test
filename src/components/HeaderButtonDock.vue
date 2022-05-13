<template>
  <div class="header-button-dock row justify-end">
    <dropdown-button
      @select-option="(options) => editForm('projects', options)"
      :options="projectOptions"
    ></dropdown-button>

    <dropdown-button
      @select-option="(options) => editForm('gateways', options)"
      :options="gatewayOptions"
    ></dropdown-button>

    <date-button
      label="From"
      @date-change="(date) => editForm('fromDate', date)"
    ></date-button>

    <date-button
      label="To"
      :min-date="formData.fromDate"
      @date-change="(date) => editForm('toDate', date)"
    ></date-button>

    <q-btn color="primary" label="Generate report" no-caps @click="getReport" />
  </div>
</template>

<script>
import DropdownButton from "./DropdownButton.vue";
import DateButton from "./DateButton.vue";
import { computed, ref } from "vue";

import { generateReport } from "../api";

export default {
  components: { DropdownButton, DateButton },
  props: {
    projects: Array,
    gateways: Array,
  },

  setup(props, { emit }) {
    const formData = ref({
      projects: [],
      gateways: [],
      fromDate: "",
      toDate: "",
    });

    return {
      formData,
      projectOptions: computed(() => [
        "All projects",
        ...props.projects.map((p) => p.name),
      ]),
      gatewayOptions: computed(() => [
        "All gateways",
        ...props.gateways.map((g) => g.name),
      ]),
      editForm: (key, value) => {
        formData.value[key] = value;
      },
      getReport: async () => {
        const reportData = await generateReport(formData.value);

        emit("report", {
          filters: formData.value,
          data: reportData,
        });
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.header-button-dock {
  max-width: 60rem;

  > * {
    margin-left: 22px;
    margin-bottom: 6px;
  }
}
</style>
