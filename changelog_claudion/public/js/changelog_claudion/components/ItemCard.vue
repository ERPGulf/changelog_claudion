<template>
  <div class="item-card">
    <h4>{{ item.name }}</h4>
    <p>Hello test</p>
    <p>{{ formatCurrency(item.price) }}</p>
  </div>
</template>

<script setup>
import { formatCurrency } from "../format.js";

defineProps({
  item: Object,
});
</script>
