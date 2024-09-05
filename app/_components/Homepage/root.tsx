
import { Clock } from "@/app/showcase/clock/_components/clock";
import { HomepageBio } from "./bio";
import { HomepageCard } from "./card";
import { CommonProps } from "./type";

export function HomepageRoot(props: CommonProps) {
  const { user } = props;

  return (
    <div>
      <HomepageBio user={user} />
      <HomepageCard user={user} />
      <div className="flex justify-center p-6">
        <Clock needMs={false} size="s" />
      </div>
    </div>
  );
}
