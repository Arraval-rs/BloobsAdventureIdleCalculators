<script setup>
	import { resolveComponent } from 'vue'

	const props = defineProps(['skillClass', 'calculatorOutput'])

	const UDropdownMenu = resolveComponent('UDropdownMenu')
	const UInputNumber = resolveComponent('UInputNumber')
	const UButton = resolveComponent('UButton')

	const columns = [
		{
			accessorKey: "experienceSource.label",
			header: "Experience Source"
		},
		{
			accessorKey: "effects",
			header: "Active Effects"
		},
		{
			accessorKey: "startExperience",
			header: "Starting Experience"
		},
		{
			accessorKey: "startLevel",
			header: "Starting Level",
			cell: ({row}) => {
				return h(
					'div',
					{},
					h(
						UInputNumber,
						{
							modelValue: props.calculatorOutput[row.id].startLevel,
							orientation: "vertical",
							increment: {
								onClick() {
									props.calculatorOutput[row.id].startLevel++
									props.calculatorOutput[row.id].calculateResults(props.skillClass)
								}
							},
							decrement: {
								onClick() {
									props.calculatorOutput[row.id].startLevel--
									props.calculatorOutput[row.id].calculateResults(props.skillClass)
								}
							}
						}
					)
				)
			}
		},
		{
			accessorKey: "endLevel",
			header: "Goal Level",
			cell: ({row}) => {
				return h(
					'div',
					{},
					h(
						UInputNumber,
						{
							modelValue: props.calculatorOutput[row.id].endLevel,
							orientation: "vertical",
							increment: {
								onClick() {
									props.calculatorOutput[row.id].endLevel++
									props.calculatorOutput[row.id].calculateResults(props.skillClass)
								}
							},
							decrement: {
								onClick() {
									props.calculatorOutput[row.id].endLevel--
									props.calculatorOutput[row.id].calculateResults(props.skillClass)
								}
							}
						}
					)
				)
			}
		},
		{
			accessorKey: "estimatedTime",
			header: "Estimated Time"
		},
		{
			accessorKey: "requiredMaterials",
			header: "Required Materials"
		},
		{
			accessorKey: "actions",
			header: "",
			cell: ({row}) => {
				return h(
					'div',
					{},
					h(
						UDropdownMenu,
						{
							content: {},
							items: actionItems(row)
						},
						() => h(
							UButton, 
							{
								icon: "i-lucide-ellipsis-vertical",
								color: "neutral",
								variant: "ghost"
							}
						)
					)
				)
			}
		}
	]

	function actionItems(row) {
		return [
			{
				"label": "Remove Row",
				onSelect() {
					props.calculatorOutput.splice(row.id, 1)
				}
			}
		]
	}
	
</script>

<template>
	<UTable :data="calculatorOutput" :columns="columns" class="flex-1" />
</template>