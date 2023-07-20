<template>
  <div class="list-setting">
    <div class="type-list__header">
      <img
        @click="isOpened = !isOpened"
        class="chevron__image"
        :src="
          require('../assets/images/expand_more_FILL0_wght400_GRAD0_opsz48.svg')
        "
        :style="`transform: rotate(${isOpened ? 0 : 270}deg)`"
        alt="expand"
      />

      <TristateCheckbox
        class="ml-6"
        :state="model.isChecked"
        @click="model.toggleIsChecked()"
      />

      <p class="title">{{ model.name }}</p>
    </div>

    <ul class="type-list ul-setting" v-show="isOpened">
      <li
        v-for="item in model.itemsByType"
        :key="item.id"
        class="type-list__item"
      >
        <div>
          <input
            type="checkbox"
            class="checkbox"
            :checked="item.checked"
            @change="model.toggleType(item.id)"
          />

          <span class="title">
            {{ item.title }}
          </span>
        </div>

        <div class="type-list__item-right">
          <input
            type="number"
            :value="item.quantity"
            min="0"
            max="100"
            @input="changeQuantityByType(item.id, $event)"
            class="quantity-input"
          />

          <ColorInput
            :model-value="item.color"
            @update:modelValue="(value) => setTypeColor(item.id, value)"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { ListModel } from "@/models/list";
import { defineComponent, PropType } from "vue";
import ColorInput from "@/components/ColorInput.vue";
import TristateCheckbox from "@/components/TristateCheckbox.vue";

export default defineComponent({
  name: "TypeList",
  components: { TristateCheckbox, ColorInput },
  props: {
    model: {
      type: Object as PropType<ListModel>,
      required: true,
    },
  },
  data() {
    return {
      isOpened: true,
    };
  },
  methods: {
    changeQuantityByType(id: number, event: Event) {
      const target = event.target as HTMLInputElement;
      let value = parseInt(target.value);

      if (Number.isNaN(value) || value < 0) {
        value = 0;
        target.value = "0";
      }

      this.model.changeQuantityOfItemsByType(id, value);
    },

    setTypeColor(typeId: number, value: string) {
      this.model.changeTypeColor(typeId, value);
    },
  },
});
</script>
<style scoped>
.title {
  font-size: 15px;
  margin: 0 0 0 10px;
}
.list-setting {
  margin: 10px;
  position: relative;
}

.chevron__image {
  width: 20px;
  height: 20px;
}

.ul-setting {
  margin: 5px;
}

.checkbox {
  width: 15px;
  height: 15px;
}
</style>
