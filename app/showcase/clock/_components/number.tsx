import { ReactNode } from "react";

const scales = [[12], [11, 1], [10, 2], [9, 3], [8, 4], [7, 5], [6]];

const angles = [
  0,
  ((1 / 12) * 360 * Math.PI) / 180,
  ((2 / 12) * 360 * Math.PI) / 180,
  ((3 / 12) * 360 * Math.PI) / 180,
  ((4 / 12) * 360 * Math.PI) / 180,
  ((5 / 12) * 360 * Math.PI) / 180,
  ((6 / 12) * 360 * Math.PI) / 180,
];

interface IProps {
  radius: number;
}

const HEIGHT = 40;

export function TimeScale(props: IProps) {
  const { radius } = props;
  return (
    <div>
      {scales.map((scale, index) => {
        let child: ReactNode = null;
        const angle = angles[index];
        const _top = radius - radius * Math.cos(angle);
        const heightBiasBase = HEIGHT / 2;
        const topBias = heightBiasBase + heightBiasBase * Math.sin(angle - Math.PI / 2);
        const top = (_top - radius >= -1) ? _top - topBias : _top;
        if (scale.length === 1) {
          child = (
            <div
              className="absolute"
              style={{ left: "50%", transform: "translateX(-50%)", top }}
            >
              <span>{scale[0]}</span>
            </div>
          );
        } else {
          const width = 2 * radius * Math.sin(angle) - 32;
          child = (
            <div
              className="absolute flex justify-between"
              style={{ left: "50%", transform: "translateX(-50%)", top, width }}
            >
              <span>{scale[0]}</span>
              <span>{scale[1]}</span>
            </div>
          );
        }

        return <div className="text-black text-4xl" key={index}>{child}</div>;
      })}
    </div>
  );
}
