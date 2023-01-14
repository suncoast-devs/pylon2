<script lang="ts">
  import { modalStore } from '@skeletonlabs/skeleton'
  import { onMount } from 'svelte'
  export let parent: any

  let loading = true
  let db = null

  async function getDatabase() {
    const id = $modalStore[0].meta[0]
    const res = await fetch(`/databases/${id}`)
    const data = await res.json()
    if (res.ok) {
      db = data
      loading = false
    }
  }

  onMount(getDatabase)
</script>

{#if loading}
  <div>
    <div class="placeholder animate-pulse" />
  </div>
{:else}
  <header class="flex justify-between">
    <h1>{db.name}</h1>
    <button class="btn hover:text-warning-500">
      <i class="fa-duotone fa-trash" />
    </button>
  </header>
  <div class="flex justify-center py-4 align-middle">
    <code>
      postgres://{db.user}:{db.password}@{db.hostname}:{db.port}/{db.database}
    </code>
  </div>
  <dl class="divide-y divide-surface-500">
    <div class="grid grid-cols-3 p-2">
      <dt class="font-bold">Host</dt>
      <dd class="col-span-2">
        <code>
          {db.hostname}
        </code>
      </dd>
    </div>
    <div class="grid grid-cols-3 p-2">
      <dt class="font-bold">Port</dt>
      <dd class="col-span-2">
        <code>{db.port}</code>
      </dd>
    </div>
  </dl>
{/if}

<slot />
