import { useMemo, useRef, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import { useParams } from "react-router-dom";

export default function DraggableMarker() {
    const [position, setPosition] = useState();
    const markerRef = useRef(null);
    const eventHandler = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current;
                if (marker != null) {
                    setPosition(marker.getLatLng())
                }
            },
        }),
        [],
        );
    return (
        <Marker 
        eventHandlers={eventHandler}
        position={position}
        ref={markerRef}>
            <Popup minWidth={90}>
                <span>
                    Qui è dove potrai scambiare il tuo libro
                </span>
            </Popup>
        </Marker>
    )
}