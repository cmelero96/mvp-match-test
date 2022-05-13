<template>
  <div>
    <JSCharting
      v-if="dataEntries.length"
      :options="getChartOptions()"
      style="width: 270px; height: 270px; margin: 0px auto"
    ></JSCharting>
  </div>
</template>

<script>
import JSCharting from "jscharting-vue";

const CURRENCY = "USD";

export default {
  props: {
    dataEntries: Array,
    groupBy: String,
  },
  data() {
    return {};
  },
  computed: {
    aggregatedData() {
      const key = this.groupBy;

      if (!key) return [];

      const grouped = this.dataEntries.reduce((prev, dataObj) => {
        const groupKey = dataObj[`${key}Id`];
        prev[groupKey] = prev[groupKey] || 0 + dataObj.amount;
        return prev;
      }, {});

      return Object.entries(grouped).map(([id, amount]) => ({
        x: id,
        y: amount,
      }));
    },
  },
  methods: {
    getChartOptions() {
      return {
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
            points: this.aggregatedData,
          },
        ],
      };
    },
  },
  components: {
    JSCharting,
  },
};
</script>
<style lang="sass" scoped>
.donut-chart
</style>
