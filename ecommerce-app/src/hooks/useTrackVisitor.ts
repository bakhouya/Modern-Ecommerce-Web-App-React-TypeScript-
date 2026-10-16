
import { useEffect, useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { TrackvisitorService } from "../services/visitors/VisitorService";
import { visitorStorage } from "../context/web/visitorStorage";
import type { Visitor } from "../types/visitorsTypes";

export const useTrackVisitor = () => {
  const [visitor, setVisitor] = useState<Visitor | null>(() => visitorStorage.get());
  const trackingStarted = useRef(false);

  const mutation = useMutation({
    mutationFn: (visitorId?: string) => TrackvisitorService.track(visitorId),

    onSuccess: (data) => {
        console.log("VISITOR FROM SERVER:", data.visitor);
        visitorStorage.set(data.visitor);
        setVisitor(data.visitor);
    },
  });

  useEffect(() => {
    if (trackingStarted.current) return;
    const storedVisitor = visitorStorage.get();
    trackingStarted.current = true;
    mutation.mutate(storedVisitor?.id);
  }, []);

  return {
    visitor,
    isTracking: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isNewVisit: mutation.data?.is_new_visit ?? false,
    trackVisitor: mutation.mutate,
  };
};
