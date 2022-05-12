<template>
  <q-btn no-caps color="secondary" icon-right="calendar_today">
    <q-popup-proxy
      @before-show="updateProxy"
      transition-show="scale"
      transition-hide="scale"
    >
      <q-date v-model="proxyDate" today-btn color="dark" mask="YYYY.MM.DD">
        <div class="row items-center justify-end relative-position">
          <div v-if="!isValidDate" class="error-tooltip text-info">
            End date cannot be before start date.
          </div>
          <q-btn label="Cancel" color="primary" flat v-close-popup />
          <q-btn
            label="OK"
            color="primary"
            flat
            @click="save"
            v-close-popup
            :disabled="!isValidDate"
          />
        </div>
      </q-date>
    </q-popup-proxy>
  </q-btn>
</template>

<script>
import { computed, ref } from "vue";

const formatDate = (date) => {
  const yyyy = date.getFullYear();
  let MM = date.getMonth() + 1;
  let dd = date.getDate();

  if (dd < 10) dd = "0" + dd;
  if (MM < 10) MM = "0" + MM;

  return yyyy + "." + MM + "." + dd;
};

export default {
  props: {
    minDate: String,
  },
  setup(props, { emit }) {
    const dateString = formatDate(new Date());
    const date = ref(dateString);
    const proxyDate = ref(dateString);

    const isValidDate = computed(() => {
      return (
        !props.minDate ||
        Date.parse(proxyDate.value) >= Date.parse(props.minDate)
      );
    });

    return {
      date,
      proxyDate,
      isValidDate,

      updateProxy() {
        proxyDate.value = date.value;
      },

      save() {
        date.value = proxyDate.value;
        emit("date-change", date.value);
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.error-tooltip {
  position: absolute;
  top: -3em;
  left: 0;
}
</style>
