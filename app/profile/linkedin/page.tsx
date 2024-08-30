import { Avatar } from "@/app/_components/Avatar";
import { LinkedInAPI } from "@/lib/linkedin-api-adapter";

export default async function LinkedInProfile() {
  const data = await LinkedInAPI.GetMyProfile();

  return (
    <div
      className="grid w-full px-24 gap-6 py-8"
      style={{ gridTemplateColumns: "200px 1fr" }}
    >
      <aside
        className="rounded-md text-center flex flex-col items-center py-6"
        style={{
          border: "1px solid hsl(var(--secondary))",
          background: "hsl(var(--primary-foreground))",
        }}
      >
        <Avatar src={data.img} fallback={data.name} width={100} height={100} />
        <section className="mt-4">
          <h2 className="font-medium">{data.name}</h2>
        </section>
      </aside>
      <main
        className="rounded-md text-center flex flex-col items-center py-6"
        style={{
          border: "1px solid hsl(var(--secondary))",
          background: "hsl(var(--primary-foreground))",
        }}
      ></main>
    </div>
  );
}
