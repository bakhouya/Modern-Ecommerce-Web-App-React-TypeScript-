
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { TrackvisitorService } from "../services/visitors/VisitorService";
import { visitorStorage } from "../context/web/visitorStorage";
import type { Visitor } from "../types/visitorsTypes";

export const useTrackVisitor = () => {
    const [visitor, setVisitor] = useState<Visitor | null>(() => visitorStorage.get());

    const mutation = useMutation({
        mutationFn: TrackvisitorService.track,
        onSuccess: (data) => { visitorStorage.set(data.visitor); setVisitor(data.visitor);}
    });

    useEffect(() => {
        if (visitor) { return;}
        mutation.mutate();
    }, [visitor]);

    return {
        visitor,
        isTracking: mutation.isPending,
        isError: mutation.isError,
        error: mutation.error,
        isNewVisit: mutation.data?.is_new_visit ?? false,
        trackVisitor: mutation.mutate,
    };
};
