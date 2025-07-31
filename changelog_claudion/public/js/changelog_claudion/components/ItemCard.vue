<!-- <template>
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
</script> -->

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
  item: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.item-card {
  padding: 1rem;
  margin: 1rem 0;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
}
</style>
