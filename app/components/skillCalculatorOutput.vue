<script setup>
	import { resolveComponent } from 'vue'

	const props = defineProps(['calculatorOutput'])

	const UDropdownMenu = resolveComponent('UDropdownMenu')
	const UButton = resolveComponent('UButton')

	const columns = [
		{
			accessorKey: calculatorColumns.experienceSource
		},
		{
			accessorKey: calculatorColumns.startExperience
		},
		{
			accessorKey: calculatorColumns.endLevel
		},
		{
			accessorKey: calculatorColumns.requiredIterations
		},
		{
			accessorKey: calculatorColumns.estimatedTime
		},
		{
			accessorKey: calculatorColumns.requiredMaterials
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
							items: [
								{
									"label": "Remove Row",
									onSelect() {
										props.calculatorOutput.splice(props.calculatorOutput.indexOf(row.original), 1)
									}
								}
							]
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
	
</script>

<template>
	<UTable :data="calculatorOutput" :columns="columns" class="flex-1" />
</template>