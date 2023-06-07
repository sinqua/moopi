import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";


export default function useDrag() {

    // draggable
    const dragRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
    const { events: dragEvents } = useDraggable(dragRef, {
        applyRubberBandEffect: true,
    }); // Now we pass the reference to the useDraggable hook:

    return { dragRef, dragEvents };
}

