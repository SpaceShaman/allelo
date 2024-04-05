<script setup lang="ts">
import { getPlantSvg } from "@/utils";
import { defineProps, withDefaults } from "vue";

interface Props {
  name: string;
  size: number;
}

const props = withDefaults(defineProps<Props>(), {
  size: 1.5,
});
</script>

<template>
  <v-icon :style="`--v-icon-size-multiplier: ${size}`">
    <v-img :src="getPlantSvg(name)"></v-img>
  </v-icon>
</template>
