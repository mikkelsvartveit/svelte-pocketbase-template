import { clientPb } from "$lib/pocketbase";
import type { PageLoad } from "./$types";

export const load: PageLoad = () => {
  const user = clientPb?.authStore?.record;

  return {
    user,
  };
};
