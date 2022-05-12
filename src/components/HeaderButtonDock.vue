<template>
  <div class="row">
    <dropdown-button label="All projects"></dropdown-button>
    <dropdown-button label="Gateway 1"></dropdown-button>
    <date-button label="From date"></date-button>
    <date-button label="To date"></date-button>

    <q-btn color="primary" label="Generate report" />
  </div>
</template>

<script>
import DropdownButton from "./DropdownButton.vue";
import DateButton from "./DateButton.vue";

export default {
  components: { DropdownButton, DateButton },

  setup() {},
};
</script>

<style></style>
