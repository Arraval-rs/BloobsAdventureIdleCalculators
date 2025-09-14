<script setup>
  const props = defineProps(["skillType", "initialEquipment", "includeSubCrafts"])
  const route = useRoute()

  const skillObject = new skill(route.params[props.skillType], props.skillType)
  await skillObject.readSkillJson()
  const skillClass = ref(skillObject)

  const calculatorOutput = ref([])

  const includeBaseMaterials = ref(props.includeSubCrafts)

  const equipmentTier = ref(props.initialEquipment)
</script>

<template>
  <div class="calculatorInputRow">
    <div class="calculatorInputColumn">
      <skillCalculatorInput :skillClass="skillClass" :equipmentTier="equipmentTier" :includeBaseMaterials="includeBaseMaterials" :calculatorOutput="calculatorOutput">
        <UFormField v-if="skillClass.skillType !== 'artisan' && skillClass.skillName !== 'thieving' && skillClass.skillName !== 'tracking'" label="Equipment Tier">
          <USelectMenu v-if="skillClass.skillName !== 'thieving' && skillClass.skillName !== 'tracking'" v-model="equipmentTier" :items="skillClass.equipmentTiers" class="w-48" />
        </UFormField>
        <UCheckbox v-if="skillClass.skillType === 'artisan'" label="Include Base Material Experience" v-model=includeBaseMaterials />
      </skillCalculatorInput>
    </div>
    <div class="calculatorInputColumn">
      <equipmentGrid />
    </div>
  </div>
  

  <skillCalculatorOutput :skillClass="skillClass" :calculatorOutput="calculatorOutput" />
</template>