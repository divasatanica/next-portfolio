import { GithubAPI } from "@/lib/github-api-adapter";
import { ArticleItem } from "../_components/ArticleItem";
import { GITHUB_REPO_NAME, GITHUB_ROOT_LABEL } from "@/lib/constants";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { calculatePagination } from "@/lib/utils";



export default async function ArticlePage({
  params,
}: {
  params: { current: string };
}) {
  const { current: _current } = params;
  const current = Number(_current);
  const pageSize = 10;
  const articleObject  = await GithubAPI.ListIssue(
    GITHUB_REPO_NAME,
    GITHUB_ROOT_LABEL,
    current || 1,
    pageSize,
  );
  const { total_count, items: articles } = articleObject;

  if (!Array.isArray(articles)) {
    return <div>
      <p>Oops...Articles are gone</p>
    </div>
  }

  const { totalPage } = calculatePagination(total_count, pageSize);

  return (
    <div>
      {(articles || []).map((article) => {
        return <ArticleItem issue={article} key={article.id} />;
      })}
      {totalPage === 1 ? null : <Pagination>
        <PaginationContent>
          {current - 1 > 0 ? <PaginationItem>
            <PaginationPrevious href={`/articles/${current - 1}`} />
          </PaginationItem> : null}
          {current - 1 > 0 ? <PaginationItem>
            <PaginationLink href={`/articles/${current - 1}`}>{current - 1}</PaginationLink>
          </PaginationItem> : null}
          <PaginationItem>
            <PaginationLink href="#" isActive>
              {current}
            </PaginationLink>
          </PaginationItem>
          {current + 1 <= totalPage ? <PaginationItem>
            <PaginationLink href={`/articles/${current + 1}`}>{current + 1}</PaginationLink>
          </PaginationItem> : null}
          {current < totalPage ? <PaginationItem>
            <PaginationNext href={`/articles/${current + 1}`} />
          </PaginationItem> : null}
        </PaginationContent>
      </Pagination>}
    </div>
  );
}
