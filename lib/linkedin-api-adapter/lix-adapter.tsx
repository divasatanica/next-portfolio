import { LixLinkedinProfileResponse } from "./types";

export class LixAdapter {
  private apiKey = process.env.LIX_API_KEY || '';

  async getProfile(name = process.env.MY_LINKEDIN_NAME): Promise<LixLinkedinProfileResponse> {
    const encoded = encodeURIComponent(`https://linkedin.com/in/${name}`);
    const url = "https://api.lix-it.com/v1/person?profile_link=" + encoded;

    const data = await fetch(url, { headers: { Authorization: this.apiKey }, next: { revalidate: 3600 * 24 }});

    return data.json();
  }
}