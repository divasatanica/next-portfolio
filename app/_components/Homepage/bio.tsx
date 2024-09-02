import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { Avatar } from "../Avatar";
import { CommonProps } from "./type";
import Link from "next/link";

export function HomepageBio(props: CommonProps) {
  const { user } = props;
  return (
    <div className="flex flex-col items-center">
      <div
        className="rounded-full inline-block homepage-bio__avatar"
        style={{
          border: "5px solid #fff",
          boxShadow: "0 5px 10px 0 hsl(var(--foreground) /.6)",
        }}
      >
        <Avatar src={user.avatar_url} width={200} height={200} />
      </div>
      <section className="mt-6 homepage-bio__title">
        <Link className="flex items-center" href={user.html_url} target="_blank">
          <span className="text-2xl font-medium mr-2">{user.name}</span>
          <span className="text-2xl"><ExternalLinkIcon /></span>
        </Link>
      </section>
      <section className="mt-6 homepage-bio__title">
        <span className="text-slate-500 text-2xl font-medium">
          {user.bio}
        </span>
      </section>
    </div>
  );
}
