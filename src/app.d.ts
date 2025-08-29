// See https://kit.svelte.dev/docs/types#app

import type { TypedPocketBase } from "$lib/pocketbase-typegen";

// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      serverPb: TypedPocketBase;
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
