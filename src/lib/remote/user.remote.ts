import { getRequestEvent, query } from "$app/server";

export const getUser = query(() => {
  const event = getRequestEvent();
  const serverPb = event.locals.serverPb;

  return serverPb.authStore.record;
});
