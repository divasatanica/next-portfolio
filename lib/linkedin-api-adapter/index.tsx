import { LixAdapter } from "./lix-adapter";
import { StandardLinkedinProfileResponse } from "./types";

const adapter = new LixAdapter();

async function GetMyProfile(): Promise<StandardLinkedinProfileResponse> {
  return adapter.getProfile();
}

export const LinkedInAPI = {
  GetMyProfile,
}