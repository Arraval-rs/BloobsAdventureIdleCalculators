<script setup>
  const initialEquipment = ref({
    "label": "Bronze",
    "progress": 15
  })
</script>

<template>
  <skillCalculator skillType="gathering" :initialEquipment="initialEquipment" :includeSubCrafts="null" />
</template>