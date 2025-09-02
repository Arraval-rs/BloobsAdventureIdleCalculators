<script setup>
  const route = useRoute()

  const skillObject = new skill(route.params.artisan, "Artisan")
  await skillObject.readSkillJson()
  const skillClass = ref(skillObject)

  const calculatorOutput = ref([])

  const includeBaseMaterials = ref(false)

  const equipmentTier = null
</script>

<template>
  <skillCalculatorInput :skillClass="skillClass" :equipmentTier="equipmentTier" :includeBaseMaterials="includeBaseMaterials" :calculatorOutput="calculatorOutput">
    <UCheckbox label="Include Base Material Experience" v-model=includeBaseMaterials />
  </skillCalculatorInput>

  <skillCalculatorOutput :skillClass="skillClass" :calculatorOutput="calculatorOutput" />
</template>