<script lang="ts">
  import { Table, tableMapperValues, modalStore } from '@skeletonlabs/skeleton'
  import type { ModalComponent, ModalSettings, TableSource } from '@skeletonlabs/skeleton'
  import type { ActionData, PageData } from './$types'
  import { enhance } from '$app/forms'
  import Detail from './Detail.svelte'

  export let form: ActionData

  export let data: PageData

  const { databases } = data

  const tableSimple: TableSource = {
    head: ['Name', 'Age', 'Size'],
    body: tableMapperValues(databases, ['name', 'age', 'size']),
    meta: tableMapperValues(databases, ['id', 'name']),
  }

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
</script>

<h1>PostgreSQL Databases</h1>

<div class="grid gap-4 md:grid-cols-3">
  <div class="md:col-span-2">
    <Table source={tableSimple} interactive={true} on:selected={showDetailModal} />
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
