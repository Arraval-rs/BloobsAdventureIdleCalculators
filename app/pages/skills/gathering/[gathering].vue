<script setup>
  const maxPrestige = 10
  const maxExperience = 2000000000
  const maxLevel = 1000
  const includeBaseMaterials = false // gathering skills do not have subcrafts

  const route = useRoute()
  const skillObject = new skill(route.params.gathering, "Gathering")
  await skillObject.readSkillJson()
  const skillClass = ref(skillObject)



  const equipmentTier = ref({
    "label": "Bronze",
    "progress": 15
  })

  const calculatorOutput = ref([
    {
      "experience source": "None",
      "experience required": 0,
      "experience per iteration" :0,
      "required iterations": 0,
      "estimated time": "00:00:00",
      "required materials": "N/A"
    }
  ])

</script>

<template>
  <UFormField label="Equipment Tier">
    <USelectMenu v-model="equipmentTier" :items="skillClass.equipmentTiers" class="w-48" />
  </UFormField>

  <skillCalculatorInput :skillClass="skillClass" :equipmentTier="equipmentTier" :includeBaseMaterials="includeBaseMaterials" :calculatorOutput="calculatorOutput" />

  <UTable :data="calculatorOutput" class="flex-1" />
</template>