<script setup>
  const initialTool = ref({
    "label": "Bronze",
    "progress": 15
  })
</script>

<template>
  <skillCalculator skillType="gathering" :initialTool="initialTool" :includeSubCrafts="null" />
</template>