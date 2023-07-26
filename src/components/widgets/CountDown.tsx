import { useState, useEffect } from "react";

function Countdown() {
  const initialCountdown = {
    days: 15,
    hours: 10,
    minutes: 24,
    seconds: 48,
  };

  const [countdown, setCountdown] = useState(initialCountdown);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => {
        const totalSeconds =
          prevCountdown.days * 24 * 60 * 60 +
          prevCountdown.hours * 60 * 60 +
          prevCountdown.minutes * 60 +
          prevCountdown.seconds -
          1;

        return {
          days: Math.floor(totalSeconds / (24 * 60 * 60)),
          hours: Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60)),
          minutes: Math.floor((totalSeconds % (60 * 60)) / 60),
          seconds: totalSeconds % 60,
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-flow-col place-content-center my-8 text-white font-semibold gap-5 text-center">
      <div className="flex flex-col">
        <span className="countdown font-mono text-center text-2xl md:text-5xl">
          <span
            style={{ "--value": countdown.days } as React.CSSProperties}
          ></span>
        </span>
        days
      </div>
      <div className="flex flex-col">
        <span className="countdown font-mono text-center text-2xl md:text-5xl">
          <span
            style={{ "--value": countdown.hours } as React.CSSProperties}
          ></span>
        </span>
        hours
      </div>
      <div className="flex flex-col">
        <span className="countdown font-mono text-center text-2xl md:text-5xl">
          <span
            style={{ "--value": countdown.minutes } as React.CSSProperties}
          ></span>
        </span>
        min
      </div>
      <div className="flex flex-col">
        <span className="countdown font-mono text-center text-2xl md:text-5xl">
          <span
            style={{ "--value": countdown.seconds } as React.CSSProperties}
          ></span>
        </span>
        sec
      </div>
    </div>
  );
}

export default Countdown;
