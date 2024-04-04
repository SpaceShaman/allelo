<script setup lang="ts">
import { useColorMode } from "@vueuse/core";
import { useTheme } from "vuetify";

const mode = useColorMode(); // Ref<'dark' | 'light'>
const theme = useTheme();
theme.global.name.value = mode.value;

function toggleColorMode() {
  mode.value = mode.value === "dark" ? "light" : "dark";
  theme.global.name.value = mode.value;
}
</script>

<template>
  <v-btn icon @click="toggleColorMode">
    <v-icon>{{
      mode === "dark" ? "mdi-white-balance-sunny" : "mdi-moon-waning-crescent"
    }}</v-icon>
  </v-btn>
</template>
