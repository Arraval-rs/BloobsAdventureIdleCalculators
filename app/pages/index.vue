<script setup lang="js">
  const experienceSource = ref({
    "label": "Select item to craft"
  })

  const smithingSkill = ref(new smithing(0, 0, 0))

  const currentPrestige = ref(0)
  const currentLevel = ref(0)
  const currentExperience = ref(0)

  const goalLevel = ref(0)

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

  function calculateResults(event) {
    const goalExperience = smithingSkill.value.getExperience(goalLevel.value)
    const requiredExperience = goalExperience - currentExperience.value
    const iterationExperience = calculateIterationExperince(experienceSource.value["baseExperience"], currentPrestige.value)
    const totalIterations = Math.ceil(requiredExperience/iterationExperience)
    const materialString = ""

    calculatorOutput.value[0]["experience required"] = requiredExperience
    calculatorOutput.value[0]["experience per iteration"] = iterationExperience
    calculatorOutput.value[0]["required iterations"] = totalIterations
    calculatorOutput.value[0]["estimated time"] = calculateCraftingTime(totalIterations, experienceSource.value.baseCraftingTime)
    calculatorOutput.value[0]["required materials"] = generateMaterialString(experienceSource.value.input, totalIterations)
  }

  function calculateCraftingTime(iterations, craftingTime) {
    var duration = new Date(0)
    duration.setSeconds(iterations * craftingTime)
    try {
      return duration.toISOString().substring(11, 19)
    }
    catch(err) {
      console.error(err)
      return "Error calulating time"
    }
    
  }

  function calculateIterationExperince(baseExperience, prestigeCount) {
    var prestigeBonus = prestigeCount + 1
    if (prestigeCount == 10) {
      prestigeBonus = 15
    }
    return baseExperience * prestigeBonus
  }

  function generateMaterialString(inputMaterialsArray, iterations) {
    var materialString = ""
    for (const material of inputMaterialsArray) {
      materialString += material.inputAmount * iterations + " " + material.name + "\n"
    }
    return materialString
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
    <USelectMenu v-model="experienceSource" :items="smithingSkill.experienceSources" class="w-48" />
  </UFormField>
  <UFormField label="Goal Level">
    <UInputNumber v-model="goalLevel" placeholder="Enter goal level" />
  </UFormField>
  <UButton label="Submit" icon="i-lucide-calculator" @click="calculateResults"/>
  <UTable :data="calculatorOutput" class="flex-1" />
</template>