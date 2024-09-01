import { Avatar } from "@/app/_components/Avatar";
import { Box } from "@/app/_components/Box";
import { GithubAPI } from "@/lib/github-api-adapter";
import { useMemo } from "react";

const REPO_NAME = process.env.GITHUB_ISSUE_SOURCE_REPO || "text-materials";

export default async function ArticlePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const article = await GithubAPI.GetIssue(REPO_NAME, id);
  const date = new Date(article.created_at);
  const createDate = `${date.getFullYear()}/${
    date.getMonth() + 1
  }/${date.getDate()}`;

  return (
    <div>
      <header className="mb-6">
        <p>
          <span className="text-[24px] font-medium text-slate-800">{article.title}</span>
        </p>

        <p className="text-slate-500 inline-flex items-center">
          <Avatar
            width={30}
            height={30}
            src={article.user?.avatar_url || ""}
            fallback={article.user?.name || ""}
          />
          <span className="ml-2">{createDate}</span>
        </p>
      </header>
      <Box>
        <section className="text-slate-700 markdown-body" dangerouslySetInnerHTML={{ __html: article.body_html || "" }} />
      </Box>
    </div>
  );
}
