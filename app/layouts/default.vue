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
          to: "/skills/artisan/smithing" 
        },{
          label: "Herbology",
          to: "/skills/artisan/herbology"
        },
        {
          label: "Crafting",
          to: "/skills/artisan/crafting"
        },
        {
          label: "Cooking",
          to: "/skills/artisan/cooking",
          description: "Currently assumes 0% burn rate"
        },
        {
          label: "Bowcrafting",
          to: "/skills/artisan/bowcrafting"
        },
        {
          label: "Imbuing",
          to: "/skills/artisan/imbuing"
        },
        {
          label: "Firemaking",
          to: "/skills/artisan/firemaking"
        }
      ]
    },
    {
      label: "Gathering",
      children: [
        {
          label: "Mining",
          to: "/skills/gathering/mining"
        },
        {
          label: "Foraging",
          to: "/skills/gathering/foraging"
        },
        {
          label: "Fishing",
          to: "/skills/gathering/fishing"
        },
        {
          label: "Woodcutting",
          to: "/skills/gathering/woodcutting"
        },
        {
          label: "Thieving",
          to: "/skills/gathering/thieving",
          description: "Currently assumes 100% success rate"
        },
        {
          label: "Tracking",
          to: "/skills/gathering/tracking",
          description: "Currently assumes 100% success rate"
        }
      ]
    },
    {
      label: "Combat",
      children: [
        {
          label: "Hitpoints",
          to: "/skills/combat/hitpoints",
          description: "Not implemented",
          disabled: true
        },
        {
          label: "Attack",
          to: "/skills/combat/attack",
          description: "Not implemented",
          disabled: true
        },
        {
          label: "Strength",
          to: "/skills/combat/strength",
          description: "Not implemented",
          disabled: true
        },
        {
          label: "Defence",
          to: "/skills/combat/defence",
          description: "Not implemented",
          disabled: true
        },
        {
          label: "Range",
          to: "/skills/combat/range",
          description: "Not implemented",
          disabled: true
        },
        {
          label: "Magic",
          to: "/skills/combat/magic",
          description: "Not implemented",
          disabled: true
        },
        {
          label: "Beastmastery",
          to: "/skills/combat/beastmastery",
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
          to: "/skills/support/dexterity",
          description: "Not implemented",
          disabled: true
        },
        {
          label: "Devotion",
          to: "/skills/support/devotion",
          description: "Not implemented",
          disabled: true
        },
        {
          label: "Soulbinding",
          to: "/skills/support/soulbinding",
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