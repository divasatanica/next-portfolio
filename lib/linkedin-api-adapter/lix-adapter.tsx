import { request } from "../utils";

export class LixAdapter {
  private baseURL = 'https://api.lix-it.com';
  private apiKey = process.env.LIX_API_KEY || '';

  async getProfile(name = process.env.MY_LINKEDIN_NAME) {
    const encoded = encodeURIComponent(`https://linkedin.com/in/${name}`);
    const url = `${this.baseURL}/v1/person?profile_link=` + encoded;

    return request(url, { headers: { Authorization: this.apiKey }, next: { revalidate: 3600 * 24 * 7 }});
  }
}