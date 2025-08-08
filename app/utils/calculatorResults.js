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
  potion;
  equipment;
  includeBaseMaterials;

  calculateResults(skill) {
    if(this.startLevel == null) {
      this.startLevel = skill.getLevelFromExperience(this.startExperience)
    } else {
      this.startExperience = skill.getExperienceFromLevel(this.startLevel)
    }
    this.endExperience = skill.getExperienceFromLevel(this.endLevel)
    this.experienceRequired = this.endExperience - this.startExperience
    this.experiencePerIteration = this.calculateIterationExperince(skill)
    this.requiredIterations = Math.ceil(this.experienceRequired / this.experiencePerIteration)
    this.estimatedTime = this.calculateTotalTime(skill)
    this.requiredMaterials = this.generateMaterialString()
    this.effects = this.generateEffectString(this.invocation, this.potion, this.equipment)
  }

  calculateIterationExperince(skill) {
    const invocationBonus = this.invocation.bonusExperience ?? 0
    const potionBonus = this.potion.bonusExperience ?? 0
    var prestigeBonus = this.currentPrestige + 1
    if (this.currentPrestige == 10) {
      prestigeBonus = 15
    }

    var subCraftExperience = 0
    if (this.includeBaseMaterials) {
      const baseMaterial = skill.findSubCraft(this.experienceSource.input[0].name)
      if(baseMaterial != null) {
        subCraftExperience = baseMaterial.baseExperience * this.experienceSource.input[0].inputAmount ?? 0
      }
    }
    return (this.experienceSource["baseExperience"] + subCraftExperience) * prestigeBonus * (invocationBonus + potionBonus + 1)
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

  generateEffectString(invocation, potion, equipment)  {
    var effectString = ""
    for (const arg of arguments) {
      if (arg != null && arg.label != null && arg.label != "None"){
        if (effectString.length == 0) {
          effectString += arg.label
        } else {
          effectString += ", " + arg.label
        }
      }
    }
    if(effectString.length != 0) {
      return effectString
    }
    return "None"
  }

  calculateTotalTime(skill) {
    var calculatedTime = 0
    if (skill.skillType == "Artisan") {
      calculatedTime = this.calculateCraftingTime(skill)
    }
    if (skill.skillType == "Gathering") {
      calculatedTime = this.calculateGatheringTime(skill)
    }
    return this.generateTimeString(calculatedTime)
  }

  calculateCraftingTime(skill) {
    const potionTimeReduction = this.potion.timeReduction ?? 0

    var duration = this.requiredIterations * (this.experienceSource.baseCraftingTime - potionTimeReduction)
    const baseMaterial = skill.findSubCraft(this.experienceSource.input[0].name)
    if (this.includeBaseMaterials && baseMaterial != null) {
      const subCraftDuration = this.requiredIterations * this.experienceSource.input[0].inputAmount * (baseMaterial.baseCraftingTime - potionTimeReduction)
      duration += subCraftDuration
    }
    return duration
  }

  calculateGatheringTime(skill) {
    const potionProgress = this.potion.bonusProgress ?? 0

    const timePerAction = skill.baseActionTime - skill.levelSpeedIncrease * this.startLevel
    const actionsPerResource = 100 / (this.equipment.progress + potionProgress)
    return timePerAction * actionsPerResource * this.requiredIterations
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