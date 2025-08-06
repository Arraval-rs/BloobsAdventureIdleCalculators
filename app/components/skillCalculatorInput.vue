<script setup>
	const props = defineProps(['skillClass', 'includeBaseMaterials', 'equipmentTier', 'calculatorOutput'])

  const maxPrestige = 10
  const maxExperience = 2000000000
  const maxLevel = 1000

  const currentPrestige = ref(0)
  const currentExperience = ref(0)
  const goalLevel = ref(0)

  const experienceSource = ref({
    "label": "Select item to gather"
  })

  const activeInvocation = ref({
    "label": "None"
  })

  const activePotion = ref({
    "label": "None"
  })

  function calculateResults(event) {
    const goalExperience = props.skillClass.getExperienceFromLevel(goalLevel.value)
    const requiredExperience = goalExperience - currentExperience.value
    const iterationExperience = props.skillClass.calculateIterationExperince(experienceSource.value, currentPrestige.value, activeInvocation.value, activePotion.value, props.includeBaseMaterials)
    const totalIterations = Math.ceil(requiredExperience/iterationExperience)

    props.calculatorOutput[0]["experience source"] = experienceSource.value.label
    props.calculatorOutput[0]["experience required"] = requiredExperience
    props.calculatorOutput[0]["experience per iteration"] = iterationExperience
    props.calculatorOutput[0]["required iterations"] = totalIterations
    props.calculatorOutput[0]["estimated time"] = props.skillClass.calculateTotalTime(totalIterations, experienceSource.value, activePotion.value, props.includeBaseMaterials, props.equipmentTier.progress, currentExperience.value)
    props.calculatorOutput[0]["required materials"] = generateMaterialString(experienceSource.value.input, totalIterations)
  }

  function generateMaterialString(inputMaterialsArray, iterations) {
    if(inputMaterialsArray == null || inputMaterialsArray.length == 0) {
      return "None"
    }
    var materialString = ""
    for (const material of inputMaterialsArray) {
      materialString += material.inputAmount * iterations + " " + material.name + "\n"
    }
    return materialString
  }
</script>

<template>
	<UFormField label="Current prestige">
    <UInputNumber v-model="currentPrestige" placeholder="Enter current prestige" :min=0 :max=maxPrestige />
  </UFormField>

  <UFormField label="Current experience">
    <UInputNumber v-model="currentExperience" placeholder="Enter current experience" :min=0 :max=maxExperience />
  </UFormField>

  <UFormField label="Experience source">
    <USelectMenu v-model="experienceSource" :items="props.skillClass.experienceSources" class="w-48" />
  </UFormField>

  <UFormField label="Active Invocation">
    <USelectMenu v-model="activeInvocation" :items="props.skillClass.invocations" class="w-48" />
  </UFormField>

  <UFormField label="Active Potion">
    <USelectMenu v-model="activePotion" :items="props.skillClass.potions" class="w-48" />
  </UFormField>

  <UFormField label="Goal Level">
    <UInputNumber v-model="goalLevel" placeholder="Enter goal level" :min=0 :max=maxLevel />
  </UFormField>

  <UButton label="Submit" icon="i-lucide-calculator" @click="calculateResults"/>
</template>