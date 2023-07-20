<template>
  <div>
    <TypeList v-for="(list, idx) in data" :key="idx" :model="list" />
  </div>
</template>

<script lang="ts">
import { ListModel } from "@/models/list";
import { defineComponent, PropType } from "vue";
import TypeList from "@/components/TypeList.vue";

export default defineComponent({
  name: "ItemsTree",
  components: { TypeList },
  props: {
    data: {
      type: Array as PropType<ListModel[]>,
      required: true,
    },
  },
});
</script>
