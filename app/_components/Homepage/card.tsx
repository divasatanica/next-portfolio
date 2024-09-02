import { PropsWithChildren, ReactNode, useMemo } from "react";
import { CommonProps } from "./type";
import { formateDate } from "@/lib/utils";

const HomepageCardItem = (props: PropsWithChildren<{ title: ReactNode; content: ReactNode }>) => {
  const { title, content } = props;

  return <div className="homepage-card_item p-6 rounded-md" style={{ border: "1px solid hsl(var(--secondary))" }}>
    <section>
      <p className="text-xl mr-2 text-slate-500">{title}</p>
      <p className="text-3xl font-medium">{content}</p>
    </section>
  </div>
}

export function HomepageCard(props: CommonProps) {
  const { user } = props;
  const joinDate = useMemo(() => formateDate(user.created_at), [user.created_at]);
  return <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
    <HomepageCardItem title="Repos:" content={user.public_repos} />
    <HomepageCardItem title="Gists:" content={user.public_gists} />
    <HomepageCardItem title="Followers:" content={user.followers} />
    <HomepageCardItem title="Followings:" content={user.following} />
    <HomepageCardItem title="Join Github At:" content={joinDate} />
    <HomepageCardItem title="Company:" content={user.company} />
  </div>
}