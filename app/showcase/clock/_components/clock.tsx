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

type ClockSize = 's' | 'm' | 'l';

interface IProps {
  needMs?: boolean;
  size?: ClockSize;
}

export function Clock(props: IProps) {
  const { needMs = true, size: _size } = props;
  const [hour, setHour] = useState<number>(0);
  const [min, setMin] = useState<number>(0);
  const [sec, setSec] = useState<number>(0);
  const [mSec, setMSec] = useState<number>(0);
  const rafRef = useRef<number>(0);
  const [size, setSize] = useState<ClockSize>(_size || 'l');

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
  useLayoutEffect(() => {
    if (_size != null) {
      return;
    }
    const handler = throttle(() => {
      switch (true) {
        case window.innerWidth <= 640: {
          setSize('s');
          break;
        }
        case window.innerWidth <= 768: {
          setSize('m');
          break;
        }
        default: {
          setSize('l');
          break;
        }
      }
    }, 100);

    window.addEventListener('resize', handler);
    handler();

    return () => {
      if (_size != null) {
        return;
      }
      window.removeEventListener('resize', handler);
    };
  }, [_size]);

  const clockWidth = useMemo(() => {
    switch (size) {
      case 's': {
        return {
          clock: 125,
          msClock: 25,
          msTop: 150,
          width: window.innerWidth,
        };
      }
      case 'm': {
        return {
          width: window.innerWidth,
          clock: 175,
          msClock: 40,
          msTop: 200,
        };
      }
      case 'l': {
        return {
          width: window.innerWidth,
          clock: 250,
          msClock: 50,
          msTop: 300,
        };
      }
      default: {
        return {
          width: window.innerWidth,
          clock: 250,
          msClock: 50,
          msTop: 300,
        };
      }
    }
  }, [size]);
  
  return (
    <div className="bg-black p-4 rounded-[64px]" style={{ width: clockWidth.clock * 2 + 32 }}>
      <div
        className="relative w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] md:w-[500px] md:h-[500px] rounded-full bg-white"
        style={{ boxShadow: "inset 0px 0px 15px 0 hsl(var(--foreground) /.9)", width: clockWidth.clock * 2, height: clockWidth.clock * 2 }}
      >
        <TimeScale radius={clockWidth.clock} />
        <ClockNeedle hourAngle={hourAngle} minAngle={minAngle} secAngle={secAngle} radius={clockWidth.clock} />
        {needMs ? <div
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
        </div> : null}
      </div>
    </div>
  );
}
