import { useEffect, useRef } from "react";

export default function useEventListener<
  T extends EventTarget,
  E extends Event,
>(eventType: string, callback: (event: E) => void, element?: T | null): void {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!element) return;

    const handler = (event: Event) => {
      callbackRef.current(event as E);
    };

    element.addEventListener(eventType, handler as EventListener);

    return () => {
      element.removeEventListener(eventType, handler as EventListener);
    };
  }, [eventType, element]);
}
