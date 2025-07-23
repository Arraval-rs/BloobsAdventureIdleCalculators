<script setup>
  const maxPrestige = 10
  const maxLevel = 1000
  const maxExperience = 2000000000

  const activeSkill = ref({
    "label": "smithing"
  })
  const skillList = [
    {
      "label": "smithing"
    },
    {
      "label": "crafting"
    }
  ]
  const smithingSkill = new smithing(0, 0, 0)
  const craftingSkill = new crafting(0, 0, 0)

  function setActiveClass() {
    if (activeSkill.value.label == "crafting") {
      skillClass.value = craftingSkill
    } else {
      skillClass.value = smithingSkill
    }
  }

  const experienceSource = ref({
    "label": "Select item to craft"
  })

  const activeInvocation = ref({
    "label": "None"
  })

  const activePotion = ref({
    "label": "None"
  })

  const includeBaseMaterials = ref(false)

  const skillClass = ref(smithingSkill)
  const currentPrestige = ref(0)
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
    const goalExperience = skillClass.value.getExperience(goalLevel.value)
    const requiredExperience = goalExperience - currentExperience.value
    const iterationExperience = calculateIterationExperince(experienceSource.value, currentPrestige.value, activeInvocation.value, includeBaseMaterials.value, skillClass.value)
    const totalIterations = Math.ceil(requiredExperience/iterationExperience)

    calculatorOutput.value[0]["experience source"] = experienceSource.value.label
    calculatorOutput.value[0]["experience required"] = requiredExperience
    calculatorOutput.value[0]["experience per iteration"] = iterationExperience
    calculatorOutput.value[0]["required iterations"] = totalIterations
    calculatorOutput.value[0]["estimated time"] = calculateCraftingTime(totalIterations, experienceSource.value, activePotion.value, includeBaseMaterials.value, skillClass.value)
    calculatorOutput.value[0]["required materials"] = generateMaterialString(experienceSource.value.input, totalIterations)
  }

    function calculateIterationExperince(experienceSource, prestigeCount, activeInvocation, includeSubCrafts, skill) {
    const invocationBonus = activeInvocation.bonusExperience ?? 0
    var prestigeBonus = prestigeCount + 1
    if (prestigeCount == 10) {
      prestigeBonus = 15
    }

    var subCraftExperience = 0
    const baseMaterial = findSubCraft(experienceSource.input[0].name, skill)
    if (includeSubCrafts && baseMaterial != null) {
      subCraftExperience = baseMaterial.baseExperience * experienceSource.input[0].inputAmount ?? 0
    }
    return (experienceSource["baseExperience"] + subCraftExperience) * prestigeBonus * (invocationBonus + 1)
  }

  function calculateCraftingTime(iterations, experienceSource, activePotion, includeSubCrafts, skill) {
    const potionTimeReduction = activePotion.timeReduction ?? 0

    var durationInSeconds = iterations * (experienceSource.baseCraftingTime - potionTimeReduction)
    const baseMaterial = findSubCraft(experienceSource.input[0].name, skill)
    if (includeSubCrafts && baseMaterial != null) {
      const subCraftDuration = iterations * experienceSource.input[0].inputAmount * (baseMaterial.baseCraftingTime - potionTimeReduction)
      durationInSeconds += subCraftDuration
    }
    const days = Math.floor(durationInSeconds / (24 * 60 * 60))
    durationInSeconds - days * (24 * 60 * 60)

    const duration = new Date(0)
    duration.setSeconds(durationInSeconds - days * (24 * 60 * 60))
    try {
      const timeString = duration.toISOString().substring(11, 19)
      switch (days) {
        case 0:
          return timeString
        case 1:
          return days + " day " + timeString
        default: 
          return days + " days " + timeString
      }
    }
    catch(err) {
      console.error(err)
      return "Error calulating time"
    }
  }

  function generateMaterialString(inputMaterialsArray, iterations) {
    var materialString = ""
    for (const material of inputMaterialsArray) {
      materialString += material.inputAmount * iterations + " " + material.name + "\n"
    }
    return materialString
  }

  function findSubCraft(experienceSourceName, skill) {
    for (const source of skill.experienceSources) {
      if (source.label == experienceSourceName) {
        return source
      }
    }
    return null
  }

</script>

<template>
  <UFormField label="Selected Skill">
    <USelectMenu v-model="activeSkill" :items="skillList" @change="setActiveClass" class="w-48" />
  </UFormField>
  <UFormField label="Current prestige">
    <UInputNumber v-model="currentPrestige" placeholder="Enter current prestige" :min=0 :max=maxPrestige />
  </UFormField>
  <UFormField label="Current experience">
    <UInputNumber v-model="currentExperience" placeholder="Enter current experience" :min=0 :max=maxExperience />
  </UFormField>
  <UFormField label="Experience source">
    <USelectMenu v-model="experienceSource" :items="skillClass.experienceSources" class="w-48" />
  </UFormField>
    <UFormField label="Active Invocation">
    <USelectMenu v-model="activeInvocation" :items="skillClass.invocations" class="w-48" />
  </UFormField>
    <UFormField label="Active Potion">
    <USelectMenu v-model="activePotion" :items="skillClass.potions" class="w-48" />
  </UFormField>
  <UFormField label="Goal Level">
    <UInputNumber v-model="goalLevel" placeholder="Enter goal level" :min=0 :max=maxLevel />
  </UFormField>
  <UCheckbox label="Include Base Material Experience" v-model=includeBaseMaterials />
  <UButton label="Submit" icon="i-lucide-calculator" @click="calculateResults"/>
  <UTable :data="calculatorOutput" class="flex-1" />
</template>