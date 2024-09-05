"use client";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { TimeScale } from "./number";
import { MsTimeScale } from "./ms-number";
import { ClockNeedle, MsClockNeedle } from "./clock-needle";

const throttle = (fn: (...params: any[]) => any, delay: number) => {
  let lastTriggered = -1;
  return function(...params: Parameters<typeof fn>) {
    const now = Date.now();

    if (now - lastTriggered < delay) {
      return;
    }

    fn(...params);
  }
};

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
  const [clockWidth, setClockWidth] = useState<{ clock: number; msClock: number; width: number; msTop: number }>({ clock: 250, msClock: 50, width: 0, msTop: 300 });
  useLayoutEffect(() => {
    const handler = throttle(() => {
      switch (true) {
        case window.innerWidth <= 640: {
          setClockWidth(prev => {
            if (prev.width <= 640 && prev.width !== 0) {
              return prev;
            }

            return {
              width: window.innerWidth,
              clock: 125,
              msClock: 25,
              msTop: 150,
            };
          });
          break;
        }
        case window.innerWidth <= 768: {
          setClockWidth(prev => {
            if (prev.width <= 768 && prev.width > 640) {
              return prev;
            }

            return {
              width: window.innerWidth,
              clock: 175,
              msClock: 40,
              msTop: 200,
            };
          });
          break;
        }
        default: {
          setClockWidth(prev => {
            if (prev.width > 768) {
              return prev;
            }

            return {
              width: window.innerWidth,
              clock: 250,
              msClock: 50,
              msTop: 300,
            };
          });
          break;
        }
      }
    }, 100);

    window.addEventListener('resize', handler);
    handler();

    return () => {
      window.removeEventListener('resize', handler);
    };
  }, []);
  
  return (
    <div className="bg-black p-4 rounded-[64px]">
      <div
        className="relative w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] md:w-[500px] md:h-[500px] rounded-full bg-white"
        style={{ boxShadow: "inset 0px 0px 15px 0 hsl(var(--foreground) /.9)" }}
      >
        <TimeScale radius={clockWidth.clock} />
        <ClockNeedle hourAngle={hourAngle} minAngle={minAngle} secAngle={secAngle} radius={clockWidth.clock} />
        <div
          className="absolute w-[50px] h-[50px] sm:w-[80px] sm:h-[80px] md:w-[100px] md:h-[100px] rounded-full box-border bg-slate-300"
          style={{
            left: "50%",
            transform: "translateX(-50%)",
            top: clockWidth.msTop,
            boxShadow: "inset 0px 0px 10px 0 hsl(var(--foreground) /.2)",
          }}
        >
          <MsTimeScale radius={clockWidth.msClock} />
          <MsClockNeedle radius={clockWidth.msClock} mSecAngle={mSecAngle} />
        </div>
      </div>
    </div>
  );
}
