import { StandardLinkedinProfileResponse } from "@/lib/linkedin-api-adapter/types";

interface IProps {
  data: StandardLinkedinProfileResponse["education"]["0"];
}

export function EducationItem(props: IProps) {
  const { data } = props;

  return (
    <section className="text-left">
      <p>
        {data.institutionName} ({data.dateStarted}-{data.dateEnded})
      </p>
      <p className="text-slate-500">
        {data.fieldOfStudy} / {data.degree}
      </p>
    </section>
  );
}
