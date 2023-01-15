<script lang="ts">
  import cx from 'classnames'

  export let icon: string

  // TODO: Add more sets
  export let solid: boolean = false
  export let brand: boolean = false
  $: duotone = !solid && !brand

  // TODO: Add support for other sizes and options
  export let xl: boolean = false
</script>

<i class={cx({ 'fa-duotone': duotone, 'fa-solid': solid, 'fa-brand': brand, 'fa-xl': xl }, `fa-${icon}`)} />
