<script lang="ts">
  import "../app.css";

  let { children } = $props();
</script>

<main class="p-4">
  <svelte:boundary>
    {@render children()}

    {#snippet pending()}
      <p>loading...</p>
    {/snippet}
  </svelte:boundary>
</main>
