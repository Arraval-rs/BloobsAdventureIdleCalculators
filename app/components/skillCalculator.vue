<script setup>
  const props = defineProps(["skillType", "initialTool", "includeSubCrafts"])
  const route = useRoute()

  const skillObject = new skill(route.params[props.skillType], props.skillType)
  await skillObject.readSkillJson()
  const skillClass = ref(skillObject)

  const calculatorOutput = ref([])

  const includeBaseMaterials = ref(props.includeSubCrafts)

  const toolTier = ref(props.initialTool)
  const equipmentSet = ref({})

  function addResult(newData) {
    newData.calculateResults(skillClass.value, equipmentSet.value)
    calculatorOutput.value.push(newData)
  }

  function updateAllResults() {
    for (const result of calculatorOutput.value) {
      result.calculateResults(skillClass.value, equipmentSet.value)
    }
  }

  function updateEquipment(equipment) {
    equipmentSet.value = equipment
    updateAllResults()
  }
</script>

<template>
  <div class="calculatorInputRow">
    <div class="calculatorInputColumn">
      <skillCalculatorInput :skillClass="skillClass" :equipmentTier="toolTier" :includeBaseMaterials="includeBaseMaterials" :calculatorOutput="calculatorOutput" @submitResult="addResult">
        <UFormField v-if="skillClass.skillType !== 'artisan' && skillClass.skillName !== 'thieving' && skillClass.skillName !== 'tracking'" label="Equipment Tier">
          <USelectMenu v-if="skillClass.skillName !== 'thieving' && skillClass.skillName !== 'tracking'" v-model="toolTier" :items="skillClass.equipmentTiers" class="w-48" />
        </UFormField>
        <UCheckbox v-if="skillClass.skillType === 'artisan'" label="Include Base Material Experience" v-model=includeBaseMaterials />
      </skillCalculatorInput>
    </div>
    <div class="calculatorInputColumn">
      <equipmentGrid @updateEquipment="updateEquipment"/>
    </div>
  </div>
  

  <skillCalculatorOutput :skillClass="skillClass" :calculatorOutput="calculatorOutput" />
</template>