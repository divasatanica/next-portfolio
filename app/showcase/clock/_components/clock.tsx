"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { TimeScale } from "./number";
import { MsTimeScale } from "./ms-number";

const paddingZero = (v: number, digit = 2) => {
  if (v < 10 ** (digit - 1)) {
    return `${"0".repeat(digit - 1)}${v}`;
  }

  return `${v}`;
};

export function Clock() {
  const [hour, setHour] = useState<number>(0);
  const [min, setMin] = useState<number>(0);
  const [sec, setSec] = useState<number>(0);
  const [mSec, setMSec] = useState<number>(0);
  const rafRef = useRef<number>(0);

  const hourAngle = useMemo(() => {
    const _hour = hour % 12;

    return (_hour + min / 60) * (360 / 12);
  }, [hour, min]);
  const minAngle = useMemo(() => {
    return (min + sec / 60) * (360 / 60);
  }, [min, sec]);
  const secAngle = useMemo(() => {
    return (sec + mSec / 1000) * (360 / 60);
  }, [sec, mSec]);
  const mSecAngle = useMemo(() => {
    return mSec * (360 / 1000);
  }, [mSec]);

  useEffect(() => {
    const callback = () => {
      const date = new Date();

      setHour(date.getHours());
      setMin(date.getMinutes());
      setSec(date.getSeconds());
      setMSec(date.getMilliseconds());

      rafRef.current = requestAnimationFrame(callback);
    };

    rafRef.current = requestAnimationFrame(callback);

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="bg-black p-4 rounded-[64px]">
      <div
        className="relative w-[500px] h-[500px] rounded-full bg-white"
        style={{ boxShadow: "inset 0px 0px 15px 0 hsl(var(--foreground) /.9)" }}
      >
        <TimeScale radius={250} />
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
            className="hour-needle absolute w-[6px] h-[300px]"
            style={{
              left: 0,
              top: -147,
              background:
                "linear-gradient(0deg, transparent 0%, transparent 50%, #4278f7 50%)",
              transform: `rotate(${hourAngle}deg)`,
              borderTopLeftRadius: 4,
              borderTopRightRadius: 4,
            }}
          ></div>
          <div
            className="min-needle absolute w-[6px] h-[370px] "
            style={{
              left: 0,
              top: -182,
              background:
                "linear-gradient(0deg, transparent 0%, transparent 50%, black 50%)",
              transform: `rotate(${minAngle}deg)`,
              borderTopLeftRadius: 4,
              borderTopRightRadius: 4,
            }}
          ></div>
          <div
            className="sec-needle absolute w-[6px] h-[482px] "
            style={{
              left: 0,
              top: -237,
              background:
                "linear-gradient(0deg, transparent 0%, transparent 50%, #f2a33c 50%)",
              transform: `rotate(${secAngle}deg)`,
              borderTopLeftRadius: 4,
              borderTopRightRadius: 4,
            }}
          ></div>
        </div>
        <div
          className="absolute w-[100px] h-[100px] rounded-full box-border bg-slate-300"
          style={{
            left: "50%",
            transform: "translateX(-50%)",
            top: 300,
            boxShadow: "inset 0px 0px 10px 0 hsl(var(--foreground) /.2)",
          }}
        >
          <MsTimeScale radius={50} />
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
              className="msec-needle absolute w-[6px] h-[90px] "
              style={{
                left: 0,
                top: -43,
                background:
                  "linear-gradient(0deg, transparent 0%, transparent 50%, white 50%)",
                transform: `rotate(${mSecAngle}deg)`,
                borderTopLeftRadius: 4,
                borderTopRightRadius: 4,
              }}
            ></div>
          </div>
        </div>
        <div
          className="absolute"
          style={{ left: "50%", transform: "translateX(-50%)", top: 420 }}
        >
          <span className="text-slate-700 text-2xl">
            {paddingZero(hour)}:{paddingZero(min)}:{paddingZero(sec)}
          </span>
        </div>
      </div>
    </div>
  );
}
