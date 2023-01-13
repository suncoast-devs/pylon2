<script lang="ts">
  import '@skeletonlabs/skeleton/styles/all.css'
  import '../theme.postcss'
  import '../app.postcss'
  import { AppShell, AppBar, AppRail, AppRailTile, Modal } from '@skeletonlabs/skeleton'
  import icon from '$lib/assets/icon.svg'

  import { writable, type Writable } from 'svelte/store'

  const storeValue: Writable<number> = writable(1)
</script>

<AppShell>
  <svelte:fragment slot="header">
    <AppBar>
      <svelte:fragment slot="lead">
        <a href="/" class="px-2">
          <img src={icon} alt="SDG Icon" height="32" width="32" />
        </a>
        <span class="mx-4 text-lg font-bold text-surface-600-300-token" aria-level={1} role="heading">
          <span class="text-primary-700-200-token">Pylon <span class="italic">2.0</span></span>
          <span class="text-warning-700-200-token">&plus;</span>
          (<span class="small-caps align-top font-heading-token text-secondary-600-300-token">gateway</span>
          <span class="text-warning-700-200-token">&times;</span>
          <span class="small-caps align-top font-heading-token text-tertiary-600-300-token">nexus</span>)
        </span>
      </svelte:fragment>
    </AppBar>
  </svelte:fragment>
  <svelte:fragment slot="sidebarLeft">
    <AppRail selected={storeValue}>
      <AppRailTile tag="a" href="/databases" value={1}>
        <i class="fa-duotone fa-database fa-lg" />
      </AppRailTile>
    </AppRail>
  </svelte:fragment>
  <main class="space-y-4 p-4">
    <slot />
  </main>
  <svelte:fragment slot="pageFooter">
    <div class="flex flex-col justify-between p-4 bg-surface-100-800-token text-surface-600-300-token md:flex-row">
      <div>&copy 2023 Suncoast Developers Guild, Inc.</div>
      <div>
        Made with <span class="text-rose-400">&hearts;</span> in St. Petersburg, FL.
      </div>
    </div>
  </svelte:fragment>
</AppShell>
<Modal />
