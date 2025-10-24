export default class monster {
	constructor(name, combatLevel, isBossCreature) {
		this.name = name
		this.combatLevel = combatLevel
		this.maxHealth = 4 * combatLevel
		this.damageReduction = combatLevel * 0.2 // likely different for boss monsters
		this.respawnTime = 3 // accounts for travel time between targets (approx. attack speed)
		if (isBossCreature) {
			this.respawnTime = 60
		}

		this.healthExperience = combatLevel
		this.combatExperience = combatLevel * 4
		this.beastmasteryExperience = combatLevel * 4
		if (isBossCreature) {
			this.beastmasteryExperience = this.beastmasteryExperience * 5
		}
	}
}