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
			header: "Starting Experience",
			cell: ({row}) => {
				return h(
					'div',
					{},
					h(
						UInputNumber,
						{
							modelValue: row.startExperience,
							defaultValue: row.original.startExperience,
							orientation: "vertical",
							disabled: true
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
							modelValue: row.endLevel,
							defaultValue: row.original.endLevel,
							orientation: "vertical",
							disabled: true
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
					props.calculatorOutput.splice(props.calculatorOutput.indexOf(row.original), 1)
				}
			}
		]
	}
	
</script>

<template>
	<UTable :data="calculatorOutput" :columns="columns" class="flex-1" />
</template>