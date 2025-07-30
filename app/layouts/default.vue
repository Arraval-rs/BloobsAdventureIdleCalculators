<script setup>
  const router = useRouter()

  const navigationItems = ref([
    {
      label: "Home",
      icon: "i-lucide-home",
      to: "/"
    },
    {
      label: "Artisan",
      children: [
        {
          label: "Smithing",
          to: "/skills/smithing" 
        },{
          label: "Herbology",
          to: "/skills/herbology"
        },
        {
          label: "Crafting",
          to: "/skills/crafting"
        },
        {
          label: "Cooking",
          to: "/skills/cooking",
          description: "Currently assumes 0% burn rate"
        },
        {
          label: "Bowcrafting",
          to: "/skills/bowcrafting"
        },
        {
          label: "Imbuing",
          to: "/skills/imbuing",
          description: "Not implemented",
          disabled: true
        },
        {
          label: "Firemaking",
          to: "/skills/firemaking",
          description: "Not implemented",
          disabled: true
        }
      ]
    },
    {
      label: "Gathering",
      children: [
        {
          label: "Mining",
          to: "/skills/mining",
          description: "Not implemented",
          disabled: true
        },
        {
          label: "Foraging",
          to: "/skills/foraging",
          description: "Not implemented",
          disabled: true
        },
        {
          label: "Fishing",
          to: "/skills/fishing",
          description: "Not implemented",
          disabled: true
        },
        {
          label: "Woodcutting",
          to: "/skills/woodcutting",
          description: "Not implemented",
          disabled: true
        },
        {
          label: "Thieving",
          to: "/skills/thieving",
          description: "Not implemented",
          disabled: true
        },
        {
          label: "Tracking",
          to: "/skills/tracking",
          description: "Not implemented",
          disabled: true
        }
      ]
    },
    {
      label: "Combat",
      children: [
        {
          label: "Hitpoints",
          to: "/skills/hitpoints",
          description: "Not implemented",
          disabled: true
        },
        {
          label: "Attack",
          to: "/skills/attack",
          description: "Not implemented",
          disabled: true
        },
        {
          label: "Strength",
          to: "/skills/strength",
          description: "Not implemented",
          disabled: true
        },
        {
          label: "Defence",
          to: "/skills/defence",
          description: "Not implemented",
          disabled: true
        },
        {
          label: "Range",
          to: "/skills/range",
          description: "Not implemented",
          disabled: true
        },
        {
          label: "Magic",
          to: "/skills/magic",
          description: "Not implemented",
          disabled: true
        },
        {
          label: "Beastmastery",
          to: "/skills/beastmastery",
          description: "Not implemented",
          disabled: true
        }
      ]
    },
    {
      label: "Support",
      children: [
        {
          label: "Dexterity",
          to: "/skills/dexterity",
          description: "Not implemented",
          disabled: true
        },
        {
          label: "Devotion",
          to: "/skills/devotion",
          description: "Not implemented",
          disabled: true
        },
        {
          label: "Soulbinding",
          to: "/skills/soulbinding",
          description: "Not implemented",
          disabled: true
        }
      ]
    },
    {
      label: "Github",
      icon: "i-simple-icons-github",
      to: "https://github.com/Arraval-rs/BloobsAdventureIdleCalculators",
      target: "_blank"
    },
    {
      label: "Help",
      icon: "i-lucide-circle-help",
      children: [
        {
          label: "Report a Bug",
          icon: "i-lucide-bug",
          to: "https://github.com/Arraval-rs/BloobsAdventureIdleCalculators/issues/new?template=bug_report.md",
          target: "_blank"
        },
        {
          label: "Submit Feedback",
          icon: "i-lucide-message-circle-plus",
          to: "https://github.com/Arraval-rs/BloobsAdventureIdleCalculators/issues/new?template=feature_request.md",
          target: "_blank"
        }
      ]
    }
  ])

</script>

<template>
  <div class="header">
    <UNavigationMenu :items="navigationItems" class="justify-center" content-orientation="vertical"/>
  </div>
  <div class="body">
    <slot />
  </div>
</template>