import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Tracks whether every image on the screen has finished loading.
 *
 * The entrance animation is worth nothing if it plays while the artwork is
 * still arriving — which is exactly what happens in Expo Go, where images are
 * fetched from the dev server rather than read from the bundle. Each image
 * reports itself with `markReady`, and the animation waits for all of them.
 */
export function useImagesReady(total: number, timeoutMs = 4000) {
  const seen = useRef(new Set<string>());
  const [ready, setReady] = useState(total === 0);

  const markReady = useCallback(
    (key: string) => {
      if (seen.current.has(key)) return;
      seen.current.add(key);
      if (seen.current.size >= total) setReady(true);
    },
    [total],
  );

  useEffect(() => {
    // One slow or missing asset must never hold the screen back for ever.
    const timer = setTimeout(() => setReady(true), timeoutMs);
    return () => clearTimeout(timer);
  }, [timeoutMs]);

  return { ready, markReady };
}
