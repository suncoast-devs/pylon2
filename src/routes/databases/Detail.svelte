<script lang="ts">
  import { modalStore } from '@skeletonlabs/skeleton'
  import type { ModalSettings } from '@skeletonlabs/skeleton'
  import { invalidate } from '$app/navigation'
  import { onMount } from 'svelte'
  import type { Database } from '@prisma/client'

  export let parent

  let loading = true
  let db: Database

  async function getDatabase() {
    const id = $modalStore[0].meta
    const res = await fetch(`/databases/${id}`)
    const data = await res.json()
    if (res.ok) {
      db = data
      loading = false
    }
  }

  function triggerConfirm(): void {
    const confirm: ModalSettings = {
      type: 'confirm',
      title: 'Please Confirm',
      body: `Are you sure you want to delete "${db.name}"?`,
      response: (r: boolean) => r && deleteDatabase(),
    }
    modalStore.close()
    modalStore.trigger(confirm)
  }

  async function deleteDatabase() {
    const res = await fetch(`/databases/${db.id}`, {
      method: 'DELETE',
    })
    if (res.ok) {
      modalStore.close()
      invalidate('app:databases')
    }
  }

  const host = 'db.suncoast.app'
  const port = 5432

  onMount(getDatabase)
</script>

{#if loading}
  <div class="space-y-2">
    <div class="placeholder animate-pulse" />
    <div class="placeholder animate-pulse" />
    <div class="placeholder animate-pulse" />
  </div>
{:else}
  <header class="flex justify-between">
    <h1>{db.name}</h1>
    <button class="btn hover:text-warning-500" on:click={triggerConfirm}>
      <i class="fa-duotone fa-trash" />
    </button>
  </header>
  <div class="flex justify-center py-4 align-middle">
    <code>
      postgres://{db.username}:{db.password}@{host}:{port}/{db.id}
    </code>
  </div>
  <dl class="divide-y divide-surface-500">
    <div class="grid grid-cols-3 p-2">
      <dt class="font-bold">Database</dt>
      <dd class="col-span-2">
        <code>{db.id}</code>
      </dd>
    </div>
    <div class="grid grid-cols-3 p-2">
      <dt class="font-bold">User</dt>
      <dd class="col-span-2">
        <code>{db.username}</code>
      </dd>
    </div>
    <div class="grid grid-cols-3 p-2">
      <dt class="font-bold">Password</dt>
      <dd class="col-span-2">
        <code>{db.password}</code>
      </dd>
    </div>
    <div class="grid grid-cols-3 p-2">
      <dt class="font-bold">Host</dt>
      <dd class="col-span-2">
        <code>
          {host}
        </code>
      </dd>
    </div>
    <div class="grid grid-cols-3 p-2">
      <dt class="font-bold">Port</dt>
      <dd class="col-span-2">
        <code>{port}</code>
      </dd>
    </div>
  </dl>
{/if}

<slot />
