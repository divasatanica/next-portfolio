import { GithubAPI } from "@/lib/github-api-adapter";
import { ArticleItem } from "../_components/ArticleItem";
import { GITHUB_REPO_NAME, GITHUB_ROOT_LABEL } from "@/lib/constants";



export default async function ArticlePage({
  params,
}: {
  params: { current: string };
}) {
  const { current } = params;
  const articles = await GithubAPI.ListIssue(
    GITHUB_REPO_NAME,
    GITHUB_ROOT_LABEL,
    Number(current) || 1
  ) || [];

  if (!Array.isArray(articles)) {
    return <div>
      <p>Oops...Articles are gone</p>
    </div>
  }

  return (
    <div>
      {(articles || []).map((article) => {
        return <ArticleItem issue={article} key={article.id} />;
      })}
    </div>
  );
}
