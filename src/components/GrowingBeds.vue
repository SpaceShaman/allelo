<script setup lang="ts">
import { growingBedsStore } from "@/stores";

const growingBeds = growingBedsStore();
</script>

<template>
  <GrowingBed
    v-for="(bed, index) in growingBeds.beds"
    :key="index"
    v-model="growingBeds.beds[index]"
  />
</template>
