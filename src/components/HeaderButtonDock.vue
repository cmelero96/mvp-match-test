<template>
  <div class="header-button-dock row justify-end">
    <dropdown-button :options="projectOptions"></dropdown-button>

    <dropdown-button :options="gatewayOptions"></dropdown-button>

    <date-button
      label="From date"
      @date-change="(date) => editForm('fromDate', date)"
    ></date-button>

    <date-button
      label="To date"
      :min-date="formData.fromDate"
      @date-change="(date) => editForm('toDate', date)"
    ></date-button>

    <q-btn color="primary" label="Generate report" no-caps />
  </div>
</template>

<script>
import DropdownButton from "./DropdownButton.vue";
import DateButton from "./DateButton.vue";
import { ref } from "vue";

const MOCK_PROJECTS = [
  "All projects",
  "Project 1",
  "Project 2",
  "Project 3",
  "Project 4",
  "Project 5",
];

const MOCK_GATEWAYS = [
  "All gateways",
  "Gateway 1",
  "Gateway 2",
  "Gateway 3",
  "Gateway 4",
  "Gateway 5",
];

export default {
  components: { DropdownButton, DateButton },

  setup() {
    const formData = ref({
      projects: [],
      gateways: [],
      fromDate: "",
      toDate: "",
    });

    return {
      formData,
      projectOptions: MOCK_PROJECTS,
      gatewayOptions: MOCK_GATEWAYS,
      editForm: (key, value) => {
        formData.value[key] = value;
        console.log(formData.value.fromDate);
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
