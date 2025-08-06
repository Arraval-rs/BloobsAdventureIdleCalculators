<script setup>
  const includeBaseMaterials = false // gathering skills do not have subcrafts

  const route = useRoute()

  const skillObject = new skill(route.params.gathering, "Gathering")
  await skillObject.readSkillJson()
  const skillClass = ref(skillObject)

  const equipmentTier = ref({
    "label": "Bronze",
    "progress": 15
  })

  const calculatorOutput = ref([])

</script>

<template>
  <UFormField label="Equipment Tier">
    <USelectMenu v-model="equipmentTier" :items="skillClass.equipmentTiers" class="w-48" />
  </UFormField>

  <skillCalculatorInput :skillClass="skillClass" :equipmentTier="equipmentTier" :includeBaseMaterials="includeBaseMaterials" :calculatorOutput="calculatorOutput" />

  <skillCalculatorOutput :calculatorOutput="calculatorOutput" />
</template>