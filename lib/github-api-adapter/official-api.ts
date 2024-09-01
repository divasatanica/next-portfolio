import { request } from "../utils";

export class GithubOfficialAPIClient {
  private token = process.env.GITHUB_TOKEN || '';
  private version = '2022-11-28';
  private baseURL = 'https://api.github.com';
  private currentUserName = process.env.GITHUB_NAME;
  constructor() {

  }

  private getCommonHeaders(Accept: string) {
    return {
      Authorization: `Bearer ${this.token}`,
      Accept,
      'X-GitHub-Api-Version': this.version,
    }
  }

  setVersion(version: string) {
    this.version = version;
  }

  async ListIssue(repo: string, labels: string, page: number, pageSize = 10) {
    const res = await request(`${this.baseURL}/search/issues?q=repo:${this.currentUserName}/${repo}+is:issue+label:${labels}&page=${page}&per_page=${pageSize}`, {
      headers: {
        ...this.getCommonHeaders('application/vnd.github.text+json')
      },
      next: {
        revalidate: 60,
      }
    });

    return res;
  }

  async GetIssue(repo: string, id: string) {
    const res = await request(`${this.baseURL}/repos/${this.currentUserName}/${repo}/issues/${id}`, {
      headers: {
        ...this.getCommonHeaders('application/vnd.github.html+json')
      }
    });

    return res;
  }
}

