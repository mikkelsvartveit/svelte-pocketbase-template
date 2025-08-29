import PocketBase from "pocketbase";
import { PUBLIC_POCKETBASE_URL } from "$env/static/public";
import { POCKETBASE_SUPERUSER_TOKEN } from "$env/static/private";
import type { TypedPocketBase } from "$lib/pocketbase-typegen";

const superuserPb = new PocketBase(PUBLIC_POCKETBASE_URL) as TypedPocketBase;

superuserPb.authStore.save(POCKETBASE_SUPERUSER_TOKEN);

export { superuserPb };
