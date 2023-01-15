<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  export let meta: any
  export let index: number

  function onRowClick(event: MouseEvent | KeyboardEvent): void {
    event.preventDefault()
    event.stopPropagation()
    dispatch('selected', meta)
  }

  function onRowKeydown(event: KeyboardEvent): void {
    if (['Enter', 'Space'].includes(event.code)) onRowClick(event)
  }
</script>

<tr
  on:click={(e) => {
    onRowClick(e)
  }}
  on:keydown={(e) => {
    onRowKeydown(e)
  }}
  aria-rowindex={index + 1}
>
  <slot />
</tr>
