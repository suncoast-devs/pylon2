<script lang="ts">
  import { enhance } from '$app/forms'
  import { TR, TD } from '$lib/components/tables'
  import type { PageData } from './$types'

  export let data: PageData

  $: people = data.people
</script>

<h1>People</h1>

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
          {#each people as person, i}
            <TR meta={person.id} index={i}>
              <TD index={0}>{person.name}</TD>
              <TD index={1}>{person.email}</TD>
            </TR>
          {/each}
        </tbody>
      </table>
    </div>
  </div>

  <div class="card card-glass-surface space-y-2 p-4">
    <h1 class="text-gradient">Add a New Person</h1>
    <form method="POST" use:enhance class="space-y-4">
      <label for="name">
        <span>Name</span>
        <input type="text" id="name" name="name" required />
      </label>
      <label for="email">
        <span>Email Address</span>
        <input type="text" id="email" name="email" required />
      </label>
      <footer class="flex justify-end space-x-4">
        <button class="btn btn-filled-primary" type="submit">Submit</button>
      </footer>
    </form>
  </div>
</div>
