<script setup>
	const props = defineProps(['skillClass', 'includeBaseMaterials', 'equipmentTier', 'calculatorOutput'])

  const currentPrestige = ref(0)
  const currentExperience = ref(0)
  const goalLevel = ref(1)

  const experienceSource = ref({
    "label": "Select item to gather"
  })

  const activeInvocation = ref({
    "label": "None"
  })

  const activePotion = ref({
    "label": "None"
  })

  const toast = useToast()

  function addCalculatorResult(event) {
    if(experienceSource.value.label == "Select item to gather") {
      toast.add({title: "No experience source selected"})
      return
    }
    var calculatedData = new calculatorResults(experienceSource.value)
    calculatedData.currentPrestige = currentPrestige.value
    calculatedData.startExperience = currentExperience.value
    calculatedData.endLevel = goalLevel.value
    calculatedData.invocation = activeInvocation.value
    calculatedData.potion = activePotion.value
    calculatedData.equipment = props.equipmentTier
    calculatedData.includeBaseMaterials = props.includeBaseMaterials


    calculatedData.calculateResults(props.skillClass)
    props.calculatorOutput.push(calculatedData)
  }
</script>

<template>
	<UFormField label="Current prestige">
    <UInputNumber v-model="currentPrestige" placeholder="Enter current prestige" :min=0 :max="props.skillClass.maxPrestige" />
  </UFormField>

  <UFormField label="Current experience">
    <UInputNumber v-model="currentExperience" placeholder="Enter current experience" :min=0 :max="props.skillClass.maxExperience" />
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
    <UInputNumber v-model="goalLevel" placeholder="Enter goal level" :min=1 :max="props.skillClass.maxLevel" />
  </UFormField>

  <slot></slot>

  <UButton label="Submit" icon="i-lucide-calculator" @click="addCalculatorResult"/>
</template>