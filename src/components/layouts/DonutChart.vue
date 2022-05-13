<template>
  <JSCharting
    class="donut-chart"
    data-test="donut-chart"
    :options="chartOptions"
  ></JSCharting>
</template>

<script>
import JSCharting from "jscharting-vue";
import { ref } from "vue";
import { CURRENCY } from "../../constants";

export default {
  props: {
    dataEntries: Array,
  },
  setup(props) {
    return {
      chartOptions: ref({
        type: "pie donut",
        legend: {
          template: "%icon %name",
        },
        defaultPoint: {
          tooltip: `<b>%name</b>: %yValue ${CURRENCY}`,
          label: {
            text: "<b>{%percentOfSeries:n0}%</b>",
            placement: "inside",
          },
        },
        series: [
          {
            points: props.dataEntries,
          },
        ],
      }),
    };
  },
  components: {
    JSCharting,
  },
};
</script>
<style lang="scss" scoped>
.donut-chart {
  margin: 0px auto;
  height: 600px;
}
</style>
