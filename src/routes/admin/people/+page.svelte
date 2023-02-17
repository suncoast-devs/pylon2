<script lang="ts">
  import { enhance } from '$app/forms'
  import { TR } from '$lib/components/tables'
  import type { PageData } from './$types'

  export let data: PageData

  $: people = data.people

  function invitePerson(personId: string) {
    fetch(`/admin/people/${personId}/invite`, {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
      })
  }
</script>

<h1>People</h1>

<div class="grid gap-4 md:grid-cols-3">
  <div class="md:col-span-2">
    <div class="table-container">
      <table class="table-interactive table">
        <thead>
          <tr>
            <th colspan="2">Name</th>
            <th>Email</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {#each people as person, i}
            <TR meta={person.id} index={i}>
              <td>{person.givenName}</td>
              <td>{person.familyName}</td>
              <td>{person.email}</td>
              <td>
                {#if !person.userRef}
                  <button class="btn btn-sm btn-ghost-primary" on:click={() => invitePerson(person.id)}>Invite</button>
                {/if}
              </td>
            </TR>
          {/each}
        </tbody>
      </table>
    </div>
  </div>

  <div class="card card-glass-surface space-y-2 p-4">
    <h1 class="text-gradient">Add a New Person</h1>
    <form method="POST" use:enhance class="space-y-4">
      <div class="columns-2">
        <label for="givenName">
          <span>First Name</span>
          <input type="text" id="givenName" name="givenName" required />
        </label>
        <label for="familyName">
          <span>Last Name</span>
          <input type="text" id="familyName" name="familyName" required />
        </label>
      </div>
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
