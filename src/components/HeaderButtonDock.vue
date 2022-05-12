<template>
  <div class="header-button-dock row justify-end">
    <dropdown-button label="All projects"></dropdown-button>

    <dropdown-button label="Gateway 1"></dropdown-button>

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

export default {
  components: { DropdownButton, DateButton },

  setup() {
    const formData = ref({
      projects: [],
      gateways: [],
      fromDate: "",
      toDate: "",
    });

    const editForm = (key, value) => {
      formData.value[key] = value;
      console.log(formData.value.fromDate);
    };

    return { formData, editForm };
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
