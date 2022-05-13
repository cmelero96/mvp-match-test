<template>
  <div>
    <JSCharting :options="getChartOptions()" ref="chart"></JSCharting>
  </div>
</template>

<script>
import JSCharting from "jscharting-vue";

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
          tooltip: "<b>%name</b><br/><b>%yValueM</b> units sold in %seriesName",
          label: {
            text: "<b>{%percentOfSeries:n1}%</b>",
            placement: "inside",
          },
        },
        yAxis: { label_text: "Units Sold" },
        xAxis: { label_text: "Quarter" },
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
