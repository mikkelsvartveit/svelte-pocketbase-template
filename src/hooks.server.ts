import type { Handle } from "@sveltejs/kit";
import PocketBase from "pocketbase";
import type { TypedPocketBase } from "$lib/pocketbase-typegen";

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.serverPb = new PocketBase() as TypedPocketBase;

  event.locals.serverPb.authStore.loadFromCookie(
    event.request.headers.get("cookie") || "",
  );

  try {
    // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
    if (event.locals.serverPb.authStore.isValid) {
      await event.locals.serverPb.collection("users").authRefresh();
    }
  } catch {
    // clear the auth store on failed refresh
    event.locals.serverPb.authStore.clear();
  }

  const response = await resolve(event);

  // send back the default 'pb_auth' cookie to the client with the latest store state
  response.headers.append(
    "set-cookie",
    event.locals.serverPb.authStore.exportToCookie(),
  );

  return response;
};
