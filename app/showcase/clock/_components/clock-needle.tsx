interface IProps {
  radius: number;
  hourAngle: number;
  minAngle: number;
  secAngle: number;
}

interface IMSecNeedleProps {
  radius: number;
  mSecAngle: number;
}

export function MsClockNeedle(props: IMSecNeedleProps) {
  const { radius, mSecAngle } = props;

  return (
    <div
      className="absolute w-[10px] h-[10px] rounded-full bg-white box-border"
      style={{
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        border: "2px solid hsl(var(--background))",
      }}
    >
      <div
        className="msec-needle absolute w-[6px]"
        style={{
          height: radius * 2 - 4,
          left: 0,
          top: -(radius * 2 - 7) / 2,
          background:
            "linear-gradient(0deg, transparent 0%, transparent 50%, white 50%)",
          transform: `rotate(${mSecAngle}deg)`,
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
        }}
      ></div>
    </div>
  );
}

export function ClockNeedle(props: IProps) {
  const { hourAngle, minAngle, secAngle, radius } = props;
  return (
    <div
      className="absolute w-[10px] h-[10px] rounded-full box-border z-10"
      style={{
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        border: "2px solid hsl(var(--foreground))",
      }}
    >
      <div
        className="absolute w-[10px] h-[10px] rounded-full bg-black box-border z-10"
        style={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        className={`hour-needle absolute w-[6px]`}
        style={{
          height: radius * 2 * 0.6,
          left: 0,
          top: `-${radius * 0.6 - 5}px`,
          background:
            "linear-gradient(0deg, transparent 0%, transparent 50%, #4278f7 50%)",
          transform: `rotate(${hourAngle}deg)`,
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
        }}
      ></div>
      <div
        className={`min-needle absolute w-[6px]`}
        style={{
          height: radius * 2 * 0.74,
          left: 0,
          top: `-${radius * 0.74 - 3}px`,
          background:
            "linear-gradient(0deg, transparent 0%, transparent 50%, black 50%)",
          transform: `rotate(${minAngle}deg)`,
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
        }}
      ></div>
      <div
        className={`sec-needle absolute w-[6px]`}
        style={{
          height: radius * 2 - 18,
          left: 0,
          top: `-${radius - 12}px`,
          background:
            "linear-gradient(0deg, transparent 0%, transparent 50%, #f2a33c 50%)",
          transform: `rotate(${secAngle}deg)`,
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
          willChange: "transform",
        }}
      ></div>
    </div>
  );
}
