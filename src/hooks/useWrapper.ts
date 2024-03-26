import { useEffect, useState } from "react";
import { API, Wrapper, data } from "../@types/wrapper";

interface useWrapperProps {
  onMeetObjective: () => void;
}

export function useWrapper({ onMeetObjective }: useWrapperProps) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<data>({ history: [], highScore: 0 });

  function updateData(newData: data) {
    setData({ ...newData });
  }

  useEffect(() => {
    if (!window.wrapper) {
      const gameWrapper = new Wrapper(updateData, onMeetObjective);
      window.wrapper = gameWrapper;
      if (!gameWrapper.findAPI()) {
        gameWrapper.initAPI();
      }
      setLoading(false);
    }
  }, []);

  return { loading, data };
}
