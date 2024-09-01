import { Box } from "@/app/_components/Box";
import { Issue } from "@/lib/github-api-adapter/schema/issue";
import "./component.css";
import { useMemo } from "react";
import { Avatar } from "@/app/_components/Avatar";
import Link from "next/link";
import { GITHUB_ROOT_LABEL } from "@/lib/constants";

interface IProps {
  issue: Issue;
}

export function ArticleItem(props: IProps) {
  const { issue } = props;
  const createDate = useMemo(() => {
    const date = new Date(issue.created_at);

    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  }, [issue.created_at]);

  return (
    <Box className="mb-6 cursor-pointer article-item_title">
      <Link href={`/articles/item/${issue.number}`}>
        <article className="">
          <p className="mb-2">
            <span className="text-[20px] font-medium">{issue.title}</span>
          </p>
          <main>
            <span className="text-slate-500">
              {issue.body_text?.slice(0, 200)}
              {issue.body_text ? "..." : ""}
            </span>
          </main>
          <section className="mt-4">
            <p className="text-slate-500 inline-flex items-center">
              <Avatar
                width={20}
                height={20}
                src={issue.user?.avatar_url || ""}
                fallback={issue.user?.name || ""}
              />
              <span className="ml-2">{createDate}</span>
            </p>
            <section className="mt-2">
              {issue.labels
                ?.filter((label) => label.name !== GITHUB_ROOT_LABEL)
                ?.map((label) => {
                  let textColor = '';
                  if (label.color == null) {
                    textColor = 'hsl(var(--foreground) /.8)';
                  } else {
                    const [r1, r2, g1, g2, b1, b2] = label.color?.split('');
                    const r = parseInt(r1+r2, 16);
                    const g = parseInt(g1+g2, 16);
                    const b = parseInt(b1+b2, 16);
                    

                    if (r + g + b > 128 * 3) {
                      textColor = 'hsl(var(foreground) /.6)';
                    } else {
                      textColor = '#fff';
                    }
                  }
                  
                  return (
                    <span
                      key={label.id}
                      className="py-1 px-2 rounded-md mr-2"
                      style={{ background: `#${label.color}` || "#ddd", color: textColor }}
                    >
                      {label.name}
                    </span>
                  );
                })}
            </section>
          </section>
        </article>
      </Link>
    </Box>
  );
}
