<script lang="ts">
  import { Table, tableMapperValues, modalStore } from '@skeletonlabs/skeleton'
  import type { ModalComponent, ModalSettings, TableSource } from '@skeletonlabs/skeleton'
  import Detail from './Detail.svelte'
  import Form from './Form.svelte'

  const sourceData = [
    { id: 1, name: 'Hydrogen', age: '2 days', size: '2 MB' },
    { id: 2, name: 'Helium', age: '4 weeks', size: '0.5 KB' },
    { id: 3, name: 'Lithium', age: '9 days', size: '24 MB' },
    { id: 4, name: 'Beryllium', age: '30 seconds', size: '224 KB' },
    { id: 5, name: 'Boron', age: '1 year', size: '0B' },
  ]

  const tableSimple: TableSource = {
    head: ['Name', 'Age', 'Size'],
    body: tableMapperValues(sourceData, ['name', 'age', 'size']),
    meta: tableMapperValues(sourceData, ['id', 'name']),
  }

  function handleRowSelect(event: CustomEvent) {
    const modalComponent: ModalComponent = {
      ref: Detail,
    }
    const d: ModalSettings = {
      type: 'component',
      component: modalComponent,
      meta: event.detail,
    }
    modalStore.trigger(d)
  }

  function handleNewDBClick() {
    const modalComponent: ModalComponent = {
      ref: Form,
    }
    const d: ModalSettings = {
      type: 'component',
      component: modalComponent,
    }
    modalStore.trigger(d)
  }
</script>

<div class="flex justify-between align-middle">
  <h1>PostgreSQL Databases</h1>
  <button class="btn btn-base btn-filled-primary" on:click={handleNewDBClick}>
    <i class="fa-duotone fa-database" />
    <span>New DB</span>
  </button>
</div>

<Table source={tableSimple} interactive={true} on:selected={handleRowSelect} />
