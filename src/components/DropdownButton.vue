<template>
  <q-select
    bg-color="secondary"
    text-color="black"
    filled
    multiple
    dense
    :modelValue="selectedOptions"
    @update:modelValue="onSelectOption"
    :options="options"
    style="width: 15em"
    popup-content-style="background-color: white"
  />
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  props: {
    options: Array,
  },
  setup(props) {
    const selectedOptions = ref([props.options[0]]);

    return {
      selectedOptions,
      onSelectOption: (e) => {
        if (!e.length || e[e.length - 1] === props.options[0]) {
          selectedOptions.value = [props.options[0]];
        } else {
          selectedOptions.value = props.options.filter(
            (opt) => e.includes(opt) && opt !== props.options[0]
          );
        }
      },
    };
  },
};
</script>
<style lang="scss" scoped>
::v-deep .q-field {
  &__control {
    border-radius: 4px;
    box-shadow: 0 1px 5px rgb(0 0 0 / 20%), 0 2px 2px rgb(0 0 0 / 14%),
      0 3px 1px -2px rgb(0 0 0 / 12%);

    span,
    i {
      color: white;
    }

    &:hover:before {
      opacity: 0.5;
    }
  }
}
</style>
