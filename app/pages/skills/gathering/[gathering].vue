<script setup>
  const route = useRoute()

  const skillObject = new skill(route.params.gathering, "Gathering")
  await skillObject.readSkillJson()
  const skillClass = ref(skillObject)

  const calculatorOutput = ref([])

  const includeBaseMaterials = false // gathering skills do not have subcrafts

  const equipmentTier = ref({
    "label": "Bronze",
    "progress": 15
  })
</script>

<template>
  <div class="calculatorInputRow">
    <div class="calculatorInputColumn">
      <skillCalculatorInput :skillClass="skillClass" :equipmentTier="equipmentTier" :includeBaseMaterials="includeBaseMaterials" :calculatorOutput="calculatorOutput">
        <UFormField label="Equipment Tier">
          <USelectMenu v-if="route.params.gathering !== 'thieving' && route.params.gathering !== 'tracking'" v-model="equipmentTier" :items="skillClass.equipmentTiers" class="w-48" />
        </UFormField>
      </skillCalculatorInput>
    </div>
    <div class="calculatorInputColumn">
      <equipmentGrid />
    </div>
  </div>
  

  <skillCalculatorOutput :skillClass="skillClass" :calculatorOutput="calculatorOutput" />
</template>