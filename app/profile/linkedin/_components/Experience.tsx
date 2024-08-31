import { StandardLinkedinProfileResponse } from "@/lib/linkedin-api-adapter/types";
import { SewingPinIcon } from "@radix-ui/react-icons";
import "./components.css";

interface IExpItemProps {
  data: StandardLinkedinProfileResponse["experience"]["0"];
}

interface IExpListProps {
  data: StandardLinkedinProfileResponse["experience"];
}

export function ExperienceList(props: IExpListProps) {
  const { data } = props;

  return <div></div>;
}

export function ExperienceItem(props: IExpItemProps) {
  const { data } = props;

  return (
    <section className="experience-item_root text-left mb-4 relative pl-5">
      <section className="experience-item_title relative">
        <span className="font-medium mr-2">{data.title}</span>
        <span className="text-slate-500">
          {data.organisation.name} ({data.dateStarted}-{data.dateEnded})
        </span>
      </section>
      <p className="flex items-center relative left-[-4px]">
        <SewingPinIcon />
        <span className="ml-1 text-slate-500">{data.location}</span>
      </p>
    </section>
  );
}
