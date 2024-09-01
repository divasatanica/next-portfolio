import { formatLogMessage } from "../utils";
import { LixAdapter } from "./lix-adapter";
import { StandardLinkedinProfileResponse } from "./types";

const adapter = new LixAdapter();

async function GetMyProfile(): Promise<StandardLinkedinProfileResponse> {
  const data = await adapter.getProfile();

  if (!data) {
    return {} as any;
  }

  return await data.json();
}

export const LinkedInAPI = {
  GetMyProfile,
  _getAdapterInstance() {
    return adapter;
  }
}