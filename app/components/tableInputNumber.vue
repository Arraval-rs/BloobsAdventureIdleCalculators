<script setup>
	const props = defineProps(["initialValue"])
	const emit = defineEmits(["updateParent"])

	const value = ref(props.initialValue)

	function updateValue(event) {
		emit("updateParent", value.value)
	}
</script>

<template>
	<UInputNumber v-model="value" @change="updateValue"/>
</template>