<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import { pb } from "$lib/pocketbase";

  let { data } = $props();
  const { user } = $derived(data);

  const logOut = async () => {
    pb.authStore.clear();
    await invalidateAll();
  };

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    formData.append("owner", pb?.authStore?.model?.id);

    const record = await pb.collection("images").create(formData);

    console.log(record);
  };
</script>

<h1 class="text-3xl">Svelte + PocketBase template app</h1>

{#if user}
  <form onsubmit={handleSubmit} class="flex flex-col items-start gap-2 py-6">
    <input
      class="input input-bordered"
      name="prompt"
      type="text"
      placeholder="What do you want to see?"
    />

    <button type="submit" class="btn btn-primary">Generate image</button>
  </form>

  <button class="btn btn-primary" onclick={logOut}>Sign out</button>
{:else}
  <p class="py-8 text-lg">
    <span>You are not signed in.</span>
  </p>

  <p class="text-lg">
    <a href="/login" class="btn btn-primary">Sign in</a>

    <a href="/register" class="btn btn-primary">Sign up</a>
  </p>
{/if}
