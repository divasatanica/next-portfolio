import { Avatar } from "@/app/_components/Avatar";
import { LinkedInAPI } from "@/lib/linkedin-api-adapter";
import { formatLogMessage } from "@/lib/utils";
import { EducationItem } from "./_components/Education";
import {
  BackpackIcon,
  EnvelopeClosedIcon,
  RocketIcon,
  RulerHorizontalIcon,
} from "@radix-ui/react-icons";
import { ExperienceItem } from "./_components/Experience";
import { ModuleTitle } from "./_components/ModuleTitle";
import Link from "next/link";

export default async function LinkedInProfile() {
  const data = await LinkedInAPI.GetMyProfile();

  return (
    <div
      className="grid w-full px-24 gap-6 py-8"
      style={{ gridTemplateColumns: "0.4fr 1fr" }}
    >
      <aside
        className="rounded-md text-center flex flex-col items-center p-6"
        style={{
          border: "1px solid hsl(var(--secondary))",
          background: "hsl(var(--primary-foreground))",
        }}
      >
        <Avatar src={data.img} fallback={data.name} width={100} height={100} />
        <section className="mt-4">
          <p className="font-medium flex items-center">
            <span className="mr-2">{data.name}</span>
            <Link href="mailto:koma.hunger@gmail.com">
              <EnvelopeClosedIcon />
            </Link>
          </p>
          <p className="text-slate-700">{data.location}</p>
        </section>
        <section className="mt-4 text-left">
          <p className="text-slate-700">{data.description}</p>
        </section>
      </aside>
      <main
        className="rounded-md text-center flex flex-col items-start p-6"
        style={{
          border: "1px solid hsl(var(--secondary))",
          background: "hsl(var(--primary-foreground))",
        }}
      >
        <section>
          <section className="mb-2">
            <ModuleTitle icon={<RocketIcon width={20} height={20} />}>
              Summary
            </ModuleTitle>
          </section>
          <section className="text-left text-slate-600">
            {data.aboutSummaryText}
          </section>
        </section>
        <section className="mt-6">
          <section className="mb-2">
            <ModuleTitle icon={<RulerHorizontalIcon width={20} height={20} />}>
              Education
            </ModuleTitle>
          </section>
          {data.education?.map((educationItem, index) => (
            <EducationItem key={index} data={educationItem} />
          ))}
        </section>
        <section className="mt-6">
          <section className="mb-2">
            <ModuleTitle icon={<BackpackIcon width={20} height={20} />}>
              Career Experience
            </ModuleTitle>
          </section>
          {data.experience?.map((expItem, index) => (
            <ExperienceItem key={index} data={expItem} />
          ))}
        </section>
        <section className="mt-6">
          <p
            className="rounded-sm p-2 cursor-pointer"
            style={{ border: "1px solid hsl(var(--foreground) / .7)" }}
          >
            <Link
              target="_blank"
              referrerPolicy="no-referrer"
              href={`${data.link}/?locale=en_US`}
            >
              View my full profile on LinkedIn
            </Link>
          </p>
        </section>
      </main>
    </div>
  );
}
