export default class calculatorResult {
  constructor(experienceSource) {
    this.experienceSource = experienceSource
  }

  startExperience;
  endExperience;
  startLevel;
  endLevel;
  currentPrestige;

  experienceRequired;
  experiencePerIteration;
  requiredIterations;
  estimatedTime;
  requiredMaterials;

  effects;
  invocation;
  toolTier;
  includeBaseMaterials;

  calculateResults(skill, equipmentSet) {
    this.startLevel = skill.getLevelFromExperience(this.startExperience)
    this.endExperience = skill.getExperienceFromLevel(this.endLevel)
    this.experienceRequired = this.endExperience - this.startExperience
    this.experiencePerIteration = this.calculateIterationExperince(skill, equipmentSet)
    this.requiredIterations = Math.ceil(this.experienceRequired / this.experiencePerIteration)
    this.estimatedTime = this.calculateTotalTime(skill, equipmentSet)
    this.requiredMaterials = this.generateMaterialString()
    if (skill.skillName === "thieving" || skill.skillName === "tracking") {
      this.effects = this.generateEffectString(this.invocation, null)
    } else {
      this.effects = this.generateEffectString(this.invocation, this.toolTier)
    }
  }

  calculateIterationExperince(skill, equipmentSet) {
    const invocationBonus = this.invocation.bonusExperience ?? 0

    var prestigeBonus = this.currentPrestige + 1
    if (this.currentPrestige == 10) {
      prestigeBonus = 15
    }

    var equipmentBonus = 0
    for (const equipment in equipmentSet) {
      equipmentBonus += equipmentSet[equipment][skill.skillName + "BonusExperience"] ?? 0
    }

    var subCraftExperience = 0
    if (this.includeBaseMaterials) {
      const baseMaterial = skill.findSubCraft(this.experienceSource.input[0].name)
      if(baseMaterial != null) {
        subCraftExperience = baseMaterial.baseExperience * this.experienceSource.input[0].inputAmount ?? 0
      }
    }
    return (this.experienceSource["baseExperience"] + subCraftExperience) * prestigeBonus * (invocationBonus + equipmentBonus + 1)
  }

  generateMaterialString() {
    if(this.experienceSource.input == null || this.experienceSource.input.length == 0) {
      return "None"
    }
    var materialString = ""
    for (const material of this.experienceSource.input) {
      materialString += material.inputAmount * this.requiredIterations + " " + material.name + "\n"
    }
    return materialString
  }

  generateEffectString(invocation, toolTier)  {
    var effectString = ""
    for(var index = 0; index < arguments.length; index++) {
      if (arguments[index] != null && arguments[index].label != null && arguments[index].label != "None") {
        if (effectString.length == 0) {
          effectString += arguments[index].label
        } else {
          effectString += ", " + arguments[index].label
        }
        if (index == 1) {
          effectString += " Equipment"
        }
      }
    }
    if(effectString.length != 0) {
      return effectString
    }
    return "None"
  }

  calculateTotalTime(skill, equipmentSet) {
    var calculatedTime = 0
    if (skill.skillType == "artisan") {
      calculatedTime = this.calculateCraftingTime(skill, equipmentSet)
    }
    else if (skill.skillType == "gathering") {
      calculatedTime = this.calculateGatheringTime(skill, equipmentSet)
    }
    else if(skill.skillType == "combat") {
      calculatedTime = this.calculateCombatTime(skill, equipmentSet)
    }
    return this.generateTimeString(calculatedTime)
  }

  calculateCraftingTime(skill, equipmentSet) {
    var equipmentBonus = 0
    for (const equipment in equipmentSet) {
      equipmentBonus += equipmentSet[equipment][skill.skillName + "TimeReduction"] ?? 0
    }

    var duration = this.requiredIterations * (this.experienceSource.baseCraftingTime - equipmentBonus)
    const baseMaterial = skill.findSubCraft(this.experienceSource.input[0].name)
    if (this.includeBaseMaterials && baseMaterial != null) {
      const subCraftDuration = this.requiredIterations * this.experienceSource.input[0].inputAmount * (baseMaterial.baseCraftingTime - equipmentBonus)
      duration += subCraftDuration
    }
    return duration
  }

  calculateGatheringTime(skill, equipmentSet) {
    if(skill.skillName === "thieving" || skill.skillName === "tracking") {
      return skill.baseActionTime * this.requiredIterations
    }

    var equipmentBonus = 0
    for (const equipment in equipmentSet) {
      equipmentBonus += equipmentSet[equipment][skill.skillName + "BonusProgress"] ?? 0
    }

    var timePerAction = Math.max(skill.baseActionTime - skill.levelSpeedIncrease * this.startLevel, skill.minimumActionTime)
    const actionsPerResource = 100 / (this.toolTier.progress + equipmentBonus)
    return timePerAction * actionsPerResource * this.requiredIterations
  }

  calculateCombatTime(skill, equipmentSet) {
    const baseDamage = 1 + skill.level * 0.15
    return 0
  }

  generateTimeString(durationInSeconds) {
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
      console.error(err + " " + durationInSeconds)
      return "Error calulating time"
    }
  }
}