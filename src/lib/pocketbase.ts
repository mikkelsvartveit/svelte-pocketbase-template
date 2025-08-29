import PocketBase from "pocketbase";
import type { TypedPocketBase } from "./pocketbase-typegen";
import { PUBLIC_POCKETBASE_URL } from "$env/static/public";

interface PocketBaseErrorData {
  [key: string]: {
    code: number | string;
    message: string;
    data: PocketBaseErrorData;
  };
}

export interface PocketBaseError {
  status: number;
  data: PocketBaseErrorData;
  url: string;
}

export const clientPb = new PocketBase(
  PUBLIC_POCKETBASE_URL,
) as TypedPocketBase;
