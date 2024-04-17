<script setup lang="ts">
import { growingBedsStore } from "@/stores";

const growingBeds = growingBedsStore();

growingBeds.add(0, 0, 100, 100);
growingBeds.add(100, 100, 800, 800);
</script>

<template>
  <GrowingBed
    v-for="(bed, index) in growingBeds.beds"
    :key="index"
    v-model="growingBeds.beds[index]"
  />
</template>
