export default class equipmentData {
	constructor() {}

	async readEquipmentJson() {
    const data = await import(`@/assets/equipment.json`)
    this.cape = data.cape
    this.head = data.head
    this.ammunition = data.ammunition
    this.mainHand = data.mainHand
    this.neck = data.neck
    this.offHand = data.offHand
    this.ring = data.ring
    this.body = data.body
    this.hands = data.hands
    this.potion = data.potion
    this.feet = data.feet
    this.food = data.food
  }
}