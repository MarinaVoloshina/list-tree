<template>
  <div class="square" :style="{ backgroundColor: `${innerValue}` }">
    <input type="color" v-model="innerValue" class="color-input" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ColorInput",
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },
  computed: {
    innerValue: {
      get(): string {
        return this.modelValue;
      },
      set(v: string) {
        this.$emit("update:modelValue", v);
      },
    },
  },
});
</script>

<style scoped>
.square {
  width: 15px;
  height: 15px;
}
.color-input {
  opacity: 0;
  cursor: pointer;
}
</style>
