<template>
  <div class="layout">
    <div class="panel left">
      <ItemsTree :data="data" />
    </div>

    <div class="panel right">
      <ItemsInventory v-for="(item, idx) in data" :model="item" :key="idx" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ListModel } from "@/models/list";
import ItemsTree from "@/components/ItemsTree.vue";
import ItemsInventory from "@/components/ItemsInventory.vue";

export default defineComponent({
  name: "App",
  components: { ItemsInventory, ItemsTree },
  data: () => ({
    data: new Array(5)
      .fill(null)
      .map((_e, idx) => new ListModel("List " + (idx + 1))),
  }),
});
</script>
