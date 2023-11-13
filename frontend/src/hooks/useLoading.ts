import { useState } from "react";

function useLoading() {
  const [loading, setLoading] = useState(false);

  const showProgress = <T>(promise: Promise<T>) => {
    setLoading(true);
    promise.then(() => setLoading(false));
  };

  return { showProgress, loading };
}

export default useLoading;
