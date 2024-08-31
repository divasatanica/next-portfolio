import { formatLogMessage } from "../utils";
import { LixLinkedinProfileResponse } from "./types";

export class LixAdapter {
  private apiKey = process.env.LIX_API_KEY || '';

  async getProfile(name = process.env.MY_LINKEDIN_NAME): Promise<LixLinkedinProfileResponse> {
    const encoded = encodeURIComponent(`https://linkedin.com/in/${name}`);
    const url = "https://api.lix-it.com/v1/person?profile_link=" + encoded;

    try {
      const data = await fetch(url, { headers: { Authorization: this.apiKey }, next: { revalidate: 3600 * 24 * 7 }});

      if (!data.ok) {
        throw new Error(`Status ${data.status}, Message: ${data.statusText}`);
      }

      return data.json();
    } catch (e) {
      console.error(...formatLogMessage('Fetch LinkedIn profile failed:', (e as any).message));
      return {} as any;
    }
  }
}