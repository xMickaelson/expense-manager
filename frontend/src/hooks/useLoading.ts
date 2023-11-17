import { useState } from "react";
import { toast } from "sonner";

function useLoading() {
  const [loading, setLoading] = useState(false);

  const showProgress = async <T>(promise: Promise<T>) => {
    setLoading(true);
    await promise
      .then(() => setLoading(false))
      .catch((e) => toast(e.message))
      .finally(() => setLoading(false));
  };

  return { showProgress, loading };
}

export default useLoading;
