<script setup lang="js">
  const experienceSourceLabel = ref({
    "label": "Select item to craft"
  })

  const craftableItems = ref([
    {
      "label": "Bronze Bar",
      "experience": 2
    },
    {
      "label": "Bronze Axe",
      "experience": 10
    }
  ])

  const currentPrestige = ref(0)
  const currentLevel = ref(0)
  const currentExperience = ref(0)

  const goalExperience = ref(0)

  const calculatorOutput = ref([
    {
      "experience required": 0,
      "experience per iteration" :0,
      "required iterations": 0
    }
  ])

  function calculateResults(event) {
    const requiredExperience = goalExperience.value - currentExperience.value
    const iterationExperience = experienceSourceLabel.value["experience"]
    calculatorOutput.value[0]["experience required"] = requiredExperience
    calculatorOutput.value[0]["experience per iteration"] = iterationExperience
    calculatorOutput.value[0]["required iterations"] = requiredExperience/iterationExperience
  }

</script>

<template>
  <UFormField label="Current prestige">
    <UInputNumber v-model="currentPrestige" placeholder="Enter current prestige" />
  </UFormField>
  <UFormField label="Current level">
    <UInputNumber v-model="currentLevel" placeholder="Enter current level" />
  </UFormField>
  <UFormField label="Current experience">
    <UInputNumber v-model="currentExperience" placeholder="Enter current experience" />
  </UFormField>
  <UFormField label="Experience source">
    <USelectMenu v-model="experienceSourceLabel" :items="craftableItems" class="w-48" />
  </UFormField>
  <UFormField label="Goal Experience">
    <UInputNumber v-model="goalExperience" placeholder="Enter goal level" />
  </UFormField>
  <UButton label="Submit" icon="i-lucide-calculator" @click="calculateResults"/>
  <UTable :data="calculatorOutput" class="flex-1" />
</template>