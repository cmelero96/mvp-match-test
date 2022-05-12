<template>
  <q-btn no-caps color="secondary" icon-right="calendar_today">
    <q-popup-proxy
      @before-show="updateProxy"
      cover
      transition-show="scale"
      transition-hide="scale"
    >
      <q-date v-model="proxyDate" color="dark" mask="YYYY.MM.DD">
        <div class="row items-center justify-end q-gutter-sm">
          <q-btn label="Cancel" color="primary" flat v-close-popup />
          <q-btn label="OK" color="primary" flat @click="save" v-close-popup />
        </div>
      </q-date>
    </q-popup-proxy>
  </q-btn>
</template>

<script>
import { ref } from "vue";

const formatDate = (date) => {
  const yyyy = date.getFullYear();
  let MM = date.getMonth() + 1;
  let dd = date.getDate();

  if (dd < 10) dd = "0" + dd;
  if (MM < 10) MM = "0" + MM;

  return yyyy + "." + MM + "." + dd;
};

export default {
  setup() {
    const dateString = formatDate(new Date());
    const date = ref(dateString);
    const proxyDate = ref(dateString);

    return {
      date,
      proxyDate,

      updateProxy() {
        proxyDate.value = date.value;
      },

      save() {
        date.value = proxyDate.value;
      },
    };
  },
};
</script>

<style></style>
