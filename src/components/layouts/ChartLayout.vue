<template>
  <div class="q-pa-md">
    <div class="row">
      <div class="col-7 bg-accent column">
        <div>
          {{ "All projects | All gateways" }}
        </div>
        <template v-for="group in aggregatedData" :key="group.x">
          <q-expansion-item
            expand-icon="_"
            class="group-summary q-ma-md items-center"
          >
            <template v-slot:header>
              <q-item class="fit items-center">
                <div class="col">{{ group.x }}</div>
                <q-space></q-space>
                <div class="col">{{ `TOTAL: ${group.y} ${CURRENCY}` }}</div>
              </q-item>
            </template>
            <template v-slot:default>
              <q-list>
                <q-item>
                  <q-table
                    dense
                    flat
                    virtual-scroll
                    class="full-width q-ma-md"
                    :rows="rowGroups[group.x]"
                    :columns="tableColumns"
                    row-key="id"
                  >
                  </q-table>
                </q-item>
              </q-list>
            </template>
          </q-expansion-item>
        </template>
      </div>
      <div class="col">
        <donut-chart
          v-if="aggregatedData.length"
          :data-entries="aggregatedData"
        ></donut-chart>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/runtime-core";
import DonutChart from "./DonutChart.vue";
import { CURRENCY } from "../../constants";

export default {
  components: { DonutChart },
  props: {
    reportData: Object,
  },

  setup(props) {
    const sortKey = computed(() => props.reportData.groupBy || "project");
    return {
      aggregatedData: computed(() => {
        if (!sortKey.value) return [];

        const grouped = props.reportData.data.reduce((prev, dataObj) => {
          const groupKey = dataObj[`${sortKey.value}Id`];
          prev[groupKey] = prev[groupKey] || 0 + dataObj.amount;
          return prev;
        }, {});
        console.log(
          Object.entries(grouped).map(([id, amount]) => ({
            x: id,
            y: amount,
          }))
        );

        return Object.entries(grouped).map(([id, amount]) => ({
          x: id,
          y: amount,
        }));
      }),
      tableColumns: [
        {
          name: "date",
          align: "left",
          label: "Date",
          field: "date",
          sortable: true,
        },
        {
          name: "id",
          align: "center",
          label: "Transaction ID",
          field: "id",
          sortable: true,
        },
        {
          name: "amount",
          align: "right",
          label: `Amount (${CURRENCY})`,
          field: "amount",
          sortable: true,
        },
      ],
      rowGroups: props.reportData.data.reduce((groups, entry) => {
        const groupKey = entry[`${sortKey.value}Id`];
        if (!groups[groupKey]) groups[groupKey] = [];

        groups[groupKey].push({
          id: entry.paymentId,
          date: entry.modified,
          amount: entry.amount,
        });

        return groups;
      }, {}),
      CURRENCY,
    };
  },
};
</script>

<style lang="scss" scoped>
.group-summary {
  color: $dark;
  font-weight: 700;
  font-size: 16px;

  ::v-deep .q-expansion-item__container > .q-item {
    background-color: white;
    border-radius: 10px;
  }
}
</style>
