
import { HomepageBio } from "./bio";
import { HomepageCard } from "./card";
import { CommonProps } from "./type";

export function HomepageRoot(props: CommonProps) {
  const { user } = props;

  return (
    <div>
      <HomepageBio user={user} />
      <HomepageCard user={user} />
    </div>
  );
}
