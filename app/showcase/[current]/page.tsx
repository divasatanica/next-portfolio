import { GithubAPI } from "@/lib/github-api-adapter";
import { ShowcaseItem } from "../_components/ShowcaseItem";
import { GITHUB_REPO_NAME, GITHUB_ROOT_LABEL, GITHUB_SHOWCASE_LABEL } from "@/lib/constants";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { calculatePagination } from "@/lib/utils";

export default async function ArticlePage({
  params,
}: {
  params: { current: string };
}) {
  const { current: _current } = params;
  const current = Number(_current);
  const pageSize = 10;
  const articleObject = await GithubAPI.ListIssue(
    GITHUB_REPO_NAME,
    GITHUB_SHOWCASE_LABEL,
    current || 1,
    pageSize
  );
  const { total_count, items: articles } = articleObject;

  if (!Array.isArray(articles)) {
    return (
      <div>
        <p>Oops...Showcase items are gone</p>
      </div>
    );
  }

  const { totalPage } = calculatePagination(total_count, pageSize);

  return (
    <div>
      {(articles || []).map((article) => {
        return <ShowcaseItem issue={article} key={article.id} />;
      })}
      {totalPage === 1 ? null : (
        <Pagination>
          <PaginationContent>
            {current - 1 > 0 ? (
              <PaginationItem>
                <PaginationPrevious href={`/showcase/${current - 1}`} />
              </PaginationItem>
            ) : null}
            {current - 1 > 0 ? (
              <PaginationItem>
                <PaginationLink href={`/showcase/${current - 1}`}>
                  {current - 1}
                </PaginationLink>
              </PaginationItem>
            ) : null}
            <PaginationItem>
              <PaginationLink href="#" isActive>
                {current}
              </PaginationLink>
            </PaginationItem>
            {current + 1 <= totalPage ? (
              <PaginationItem>
                <PaginationLink href={`/showcase/${current + 1}`}>
                  {current + 1}
                </PaginationLink>
              </PaginationItem>
            ) : null}
            {current < totalPage ? (
              <PaginationItem>
                <PaginationNext href={`/showcase/${current + 1}`} />
              </PaginationItem>
            ) : null}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
