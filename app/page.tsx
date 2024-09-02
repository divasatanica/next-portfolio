import { GithubAPI } from "@/lib/github-api-adapter";
import { HomepageRoot } from "./_components/Homepage";

export default async function Home() {
  const user = await GithubAPI.GetUser();

  return (
    <section className="flex flex-col items-center justify-between">
      <HomepageRoot user={user} />
    </section>
  );
}
