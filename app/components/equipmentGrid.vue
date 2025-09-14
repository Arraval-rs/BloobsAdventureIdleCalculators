<script setup>
  const emit = defineEmits(["updateEquipment"])

  const equipmentObject = new equipmentData()
  await equipmentObject.readEquipmentJson()
  const equipmentClass = ref(equipmentObject)

  const equipmentRefs = ref({
    "neck": {"label": "Neck"}
  })

  const capeImage = new URL("../assets/images/cape.png", import.meta.url).href
  const headImage = new URL("../assets/images/head.png", import.meta.url).href
  const ammunitionImage = new URL("../assets/images/ammunition.png", import.meta.url).href
  const mainHandImage = new URL("../assets/images/mainHand.png", import.meta.url).href
  const neckImage = new URL("../assets/images/neck.png", import.meta.url).href
  const offHandImage = new URL("../assets/images/offHand.png", import.meta.url).href
  const ringImage = new URL("../assets/images/ring.png", import.meta.url).href
  const bodyImage = new URL("../assets/images/body.png", import.meta.url).href
  const handsImage = new URL("../assets/images/hands.png", import.meta.url).href
  const potionImage = new URL("../assets/images/potion.png", import.meta.url).href
  const feetImage = new URL("../assets/images/feet.png", import.meta.url).href
  const foodImage = new URL("../assets/images/food.png", import.meta.url).href

  function changedEquipment(event) {
    emit("updateEquipment", equipmentRefs.value)
  }
</script>

<template>
  <table class="equipmentGrid">
    <tbody>
      <tr class="equipmentGridRow">
        <td class="equipmentGridCell">
          <USelectMenu v-model="equipmentRefs.cape" :items="equipmentClass.cape" placeholder="Cape" disabled />
          <NuxtImg :src="capeImage"/>
        </td>
        <td class="equipmentGridCell">
          <USelectMenu :items="equipmentClass.head" placeholder="Head" disabled />
          <NuxtImg :src="headImage"/>
        </td>
        <td class="equipmentGridCell">
          <USelectMenu :items="equipmentClass.ammunition" placeholder="Ammunition" disabled />
          <NuxtImg :src="ammunitionImage"/>
        </td>
      </tr>
      <tr class="equipmentGridRow">
        <td class="equipmentGridCell">
          <USelectMenu :items="equipmentClass.mainHand" placeholder="Main Hand" disabled />
          <NuxtImg :src="mainHandImage"/>
        </td>
        <td class="equipmentGridCell">
          <USelectMenu v-model="equipmentRefs.neck" :items="equipmentClass.neck" @change="changedEquipment"/>
          <NuxtImg :src="neckImage"/>
        </td>
        <td class="equipmentGridCell">
          <USelectMenu :items="equipmentClass.offHand" placeholder="Off Hand" disabled />
          <NuxtImg :src="offHandImage"/>
        </td>
      </tr>
      <tr class="equipmentGridRow">
        <td class="equipmentGridCell">
          <USelectMenu :items="equipmentClass.ring" placeholder="Ring" disabled />
          <NuxtImg :src="ringImage"/>
        </td>
        <td class="equipmentGridCell">
          <USelectMenu :items="equipmentClass.body" placeholder="Body" disabled />
          <NuxtImg :src="bodyImage"/>
        </td>
        <td class="equipmentGridCell">
          <USelectMenu :items="equipmentClass.hands" placeholder="Hands" disabled />
          <NuxtImg :src="handsImage"/>
        </td>
      </tr>
      <tr class="equipmentGridRow">
        <td class="equipmentGridCell">
          <USelectMenu :items="equipmentClass.potion" placeholder="Potion" disabled />
          <NuxtImg :src="potionImage"/>
        </td>
        <td class="equipmentGridCell">
          <USelectMenu :items="equipmentClass.feet" placeholder="Feet" disabled />
          <NuxtImg :src="feetImage"/>
        </td>
        <td class="equipmentGridCell">
          <USelectMenu :items="equipmentClass.food" placeholder="Food" disabled />
          <NuxtImg :src="foodImage"/>
        </td>
      </tr>
    </tbody>
  </table>
</template>