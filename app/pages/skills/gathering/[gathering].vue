<script setup>
  const maxPrestige = 10
  const maxExperience = 2000000000
  const maxLevel = 1000

  const currentPrestige = ref(0)
  const currentExperience = ref(0)
  const goalLevel = ref(0)

  const route = useRoute()
  const skillObject = new skill(route.params.gathering, "Gathering")
  await skillObject.readSkillJson()
  const skillClass = ref(skillObject)

  const experienceSource = ref({
    "label": "Select item to craft"
  })

  const activeInvocation = ref({
    "label": "None"
  })

  const activePotion = ref({
    "label": "None"
  })

  const equipmentTier = ref({
    "label": "Bronze"
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

  function calculateResults(event) {
    const goalExperience = skillClass.value.getExperienceFromLevel(goalLevel.value)
    const requiredExperience = goalExperience - currentExperience.value
    const iterationExperience = skillClass.value.calculateIterationExperince(experienceSource.value, currentPrestige.value, activeInvocation.value, activePotion.value, includeBaseMaterials.value)
    const totalIterations = Math.ceil(requiredExperience/iterationExperience)

    calculatorOutput.value[0]["experience source"] = experienceSource.value.label
    calculatorOutput.value[0]["experience required"] = requiredExperience
    calculatorOutput.value[0]["experience per iteration"] = iterationExperience
    calculatorOutput.value[0]["required iterations"] = totalIterations
    calculatorOutput.value[0]["estimated time"] = skillClass.value.calculateTotalTime(totalIterations, experienceSource.value, activePotion.value, includeBaseMaterials.value)
    calculatorOutput.value[0]["required materials"] = generateMaterialString(experienceSource.value.input, totalIterations)
  }

  function generateMaterialString(inputMaterialsArray, iterations) {
    var materialString = ""
    for (const material of inputMaterialsArray) {
      materialString += material.inputAmount * iterations + " " + material.name + "\n"
    }
    return materialString
  }

  const equipmentTiers = [
    {
      "label": "Bronze",
      "progress": 15
    },
    {
      "label": "Iron",
      "progress": 20
    },
    {
      "label": "Steel",
      "progress": 25
    },
    {
      "label": "Mithril",
      "progress": 30
    },
    {
      "label": "Adamantite",
      "progress": 35
    },
    {
      "label": "Cerulium",
      "progress": 40
    },
    {
      "label": "Sanguinite",
      "progress": 50
    },
    {
      "label": "Aeronite",
      "progress": 60
    },
    {
      "label": "Necrosis",
      "progress": 70
    },
    {
      "label": "Phantom",
      "progress": 80
    },
    {
      "label": "Karinite",
      "progress": 90
    },
    {
      "label": "Taigite",
      "progress": 100
    },
    {
      "label": "Cryxcite",
      "progress": 110
    },
    {
      "label": "Golden",
      "progress": 55
    }
  ]

</script>

<template>
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

  <UFormField label="Equipment Tier">
    <USelectMenu v-model="equipmentTier" :items="equipmentTiers" class="w-48" />
  </UFormField>

  <UFormField label="Goal Level">
    <UInputNumber v-model="goalLevel" placeholder="Enter goal level" :min=0 :max=maxLevel />
  </UFormField>

  <UButton label="Submit" icon="i-lucide-calculator" @click="calculateResults"/>
  <UTable :data="calculatorOutput" class="flex-1" />
</template>