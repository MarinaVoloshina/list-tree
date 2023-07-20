<template>
  <div class="list-drawing">
    <div class="title">{{ model.name }}</div>
    <template v-if="model.itemsWithCheckedType.length > 0">
      <button class="btn" @click="model.toggleIsSorted()">
        {{ changeSortButtonName }}
      </button>

      <div class="drawing-item">
        <template
          v-for="(item, idx) in model.itemsWithCheckedType"
          :key="item.id"
        >
          <div
            class="square"
            :style="{
              backgroundColor: getTypeColor(item.typeId),
            }"
            @click="model.deleteItem(item.id)"
          />
          <div
            :style="{
              width: '100%',
              margin: '0 0 10px 0',
            }"
            v-if="
              model.isItemsSorted && getIndexOfLastOfColor(item.typeId) === idx
            "
          />
        </template>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ListModel } from "@/models/list";

export default defineComponent({
  name: "ItemsInventory",
  props: {
    model: {
      type: Object as PropType<ListModel>,
      required: true,
    },
  },

  methods: {
    getTypeColor(typeId: number) {
      return this.model.getTypeById(typeId).color;
    },

    getIndexOfLastOfColor(typeId: number): number {
      const arr = this.model.itemsWithCheckedType;

      for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i].typeId === typeId) {
          return i;
        }
      }
      return -1;
    },
  },

  computed: {
    changeSortButtonName() {
      return this.model.isItemsSorted ? "Перемешать" : "Сортировать";
    },
  },
});
</script>
<style scoped>
.square {
  width: 15px;
  height: 15px;
  margin: 1px;
  cursor: pointer;
}
.btn {
  border-radius: 6px;
  background-color: cornflowerblue;
  padding: 3px 10px;
  border: 1px cornflowerblue solid;
  font-size: 12px;
  color: white;
  position: absolute;
  right: 5px;
  top: 5px;
}
.title {
  font-size: 15px;
  margin: 5px 0 5px 5px;
}
.list-drawing {
  border: 2px solid grey;
  margin: 10px;
  position: relative;
}
.drawing-item {
  margin: 10px;
  padding: 6px;
  display: flex;
  flex-wrap: wrap;
}
</style>
