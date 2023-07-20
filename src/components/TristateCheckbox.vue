<template>
  <button class="toggle-button tristate-checkbox">
    <img
      :class="[
        'tristate-checkbox__image',
        { 'tristate-checkbox--svg-fix': state === states.INDETERMINATE },
      ]"
      v-if="state !== states.FALSE"
      alt=""
      :src="
        state === states.INDETERMINATE ? imgSrc.intermediate : imgSrc.checked
      "
    />
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { TristateCheckboxState } from "@/models/tristateCheckbox";

export default defineComponent({
  name: "TristateCheckbox",
  props: {
    state: {
      type: Object as PropType<TristateCheckboxState>,
      default: TristateCheckboxState.FALSE,
    },
  },
  data() {
    return {
      states: TristateCheckboxState,
      imgSrc: {
        intermediate: require("../assets/images/square_FILL1_wght400_GRAD0_opsz24.svg"),
        checked: require("../assets/images/close_FILL0_wght400_GRAD0_opsz48.svg"),
      },
    };
  },
});
</script>

<style scoped>
.tristate-checkbox {
  width: 15px;
  height: 15px;
  background-color: white;
  padding: 0;
  border: 1px solid black;
}

.tristate-checkbox--svg-fix {
  padding: 2px;
}

.tristate-checkbox__image {
  width: 100%;
  height: 100%;
}
</style>
