<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import { pb } from "$lib/pocketbase";
  import { Button } from "$lib/components/ui/button";

  let { data } = $props();
  const { user } = $derived(data);

  const logOut = async () => {
    pb.authStore.clear();
    await invalidateAll();
  };
</script>

<h1 class="text-3xl">Svelte + PocketBase template app</h1>

{#if user}
  <p class="py-8 text-lg">
    <span>Logged in as <span class="font-semibold">{user?.email}</span></span>
  </p>

  <Button onclick={logOut}>Sign out</Button>
{:else}
  <p class="py-8 text-lg">
    <span>You are not signed in.</span>
  </p>

  <p class="flex gap-2 text-lg">
    <Button href="/login">Sign in</Button>
    <Button href="/register">Sign up</Button>
  </p>
{/if}
