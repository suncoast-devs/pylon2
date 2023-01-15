<script lang="ts">
  export let index: number
</script>

<td role="gridcell" aria-colindex={index + 1} tabindex={index === 0 ? 0 : -1}>
  <slot />
</td>
