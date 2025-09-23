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
    if (this.cape.length == 0 || this.cape[this.cape.length - 1].label != "None") {
      this.cape.push({"label": "None"})
      this.head.push({"label": "None"})
      this.ammunition.push({"label": "None"})
      this.mainHand.push({"label": "None"})
      this.neck.push({"label": "None"})
      this.offHand.push({"label": "None"})
      this.ring.push({"label": "None"})
      this.body.push({"label": "None"})
      this.hands.push({"label": "None"})
      this.potion.push({"label": "None"})
      this.feet.push({"label": "None"})
      this.food.push({"label": "None"})
    }
  }
}