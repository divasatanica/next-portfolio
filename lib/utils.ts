import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatLogMessage(...messages: any[]) {
  return ['[portfolio]', ...messages];
}

export async function request(...params: Parameters<typeof fetch>) {
  let res: Response | null = null;
  try {
    res = await fetch(...params);

    if (!res.ok) {
      const [url] = params;
      throw new Error(`Request ${url.toString()} failed, status: ${res.status}, message: ${res.statusText}`);
    }

    return res;
  } catch (e) {
    console.error(...formatLogMessage((e as Error).message));
    return res;
  }
}