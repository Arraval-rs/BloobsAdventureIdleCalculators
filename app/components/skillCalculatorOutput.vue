<script setup>
	import { resolveComponent } from 'vue'

	const props = defineProps(['skillClass', 'calculatorOutput'])

	const UDropdownMenu = resolveComponent('UDropdownMenu')
	const tableInputNumber = resolveComponent('tableInputNumber')
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
			header: "Starting Experience",
			cell: ({row}) => {
				return h(
					'div',
					{},
					h(
						tableInputNumber,
						{
							initialValue: props.calculatorOutput[row.id].startExperience,
							onUpdateParent(newValue) {
								props.calculatorOutput[row.id].startExperience = newValue
								props.calculatorOutput[row.id].calculateResults(props.skillClass)
							}
						}
					)
				)
			}
		},
		{
			accessorKey: "startLevel",
			header: "Starting Level"
		},
		{
			accessorKey: "endLevel",
			header: "Goal Level",
			cell: ({row}) => {
				return h(
					'div',
					{},
					h(
						tableInputNumber,
						{
							initialValue: props.calculatorOutput[row.id].endLevel,
							onUpdateParent(newValue) {
								props.calculatorOutput[row.id].endLevel = newValue
								props.calculatorOutput[row.id].calculateResults(props.skillClass)
							}
						}
					)
				)
			}
		},
		{
			accessorKey: "requiredIterations",
			header: "Required Iterations"
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