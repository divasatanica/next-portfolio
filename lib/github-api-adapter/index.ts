import { GithubOfficialAPIClient } from "./official-api";
import { Issue } from "./schema/issue";

const client = new GithubOfficialAPIClient();

async function ListIssue(repo: string, labels: string, page: number, pageSize = 10): Promise<{ total_count: number; items: Issue[] }> {
  const res = await client.ListIssue(repo, labels, page, pageSize);

  if (!res) {
    return { total_count: 0, items: [] };
  }

  return await res.json();
}

async function GetIssue(repo: string, id: string): Promise<Issue> {
  const res = await client.GetIssue(repo, id);

  if (!res) {
    return {} as any;
  }

  return await res.json();
}

function _getInstance() {
  return client;
}

export const GithubAPI = {
  _getInstance,
  ListIssue,
  GetIssue,
}