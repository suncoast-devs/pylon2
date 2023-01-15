<script lang="ts">
  import { toastStore, modalStore } from '@skeletonlabs/skeleton'
  import type { ModalComponent, ModalSettings, ToastSettings } from '@skeletonlabs/skeleton'
  import { TR, TD } from '$lib/components/tables'
  import { formatDate } from '$lib/utilities'
  import type { ActionData, PageData } from './$types'
  import { enhance } from '$app/forms'
  import Detail from './Detail.svelte'

  export let form: ActionData

  export let data: PageData

  $: databases = data.databases

  function showDetailModal(event: CustomEvent) {
    const modalComponent: ModalComponent = {
      ref: Detail,
      slot: '',
    }
    const d: ModalSettings = {
      type: 'component',
      component: modalComponent,
      meta: event.detail,
    }
    modalStore.trigger(d)
  }

  $: {
    if (form?.success) {
      const t: ToastSettings = {
        message: 'Database created successfully.',
        preset: 'success',
        autohide: true,
        timeout: 5000,
      }
      toastStore.trigger(t)
    }
  }
</script>

<h1>PostgreSQL Databases</h1>

<div class="grid gap-4 md:grid-cols-3">
  <div class="md:col-span-2">
    <div class="table-container">
      <table class="table-interactive table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {#each databases as db, i}
            <TR on:selected={showDetailModal} meta={db.id} index={i}>
              <TD index={0}>{db.name}</TD>
              <TD index={1}>{formatDate(db.createdAt)}</TD>
            </TR>
          {/each}
        </tbody>
      </table>
    </div>
  </div>

  <div class="card card-glass-surface space-y-2 p-4">
    <h1 class="text-gradient">Create a New Database</h1>
    <form method="POST" use:enhance class="space-y-4">
      <label for="name">
        <span>Name</span>
        <input type="text" id="name" name="name" minlength="2" required />
      </label>
      <footer class="flex justify-end space-x-4">
        <button class="btn btn-filled-primary" type="submit">Create DB</button>
      </footer>
    </form>
  </div>
</div>
