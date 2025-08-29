import type { Handle } from "@sveltejs/kit";
import PocketBase from "pocketbase";
import type { TypedPocketBase } from "$lib/pocketbase-typegen";

export const handle: Handle = async ({ event, resolve }) => {
  const serverPb = new PocketBase() as TypedPocketBase;
  serverPb.authStore.loadFromCookie(event.cookies.get.toString());

  event.locals.serverPb = serverPb;

  return resolve(event);
};
