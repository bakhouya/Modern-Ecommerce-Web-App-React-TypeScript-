

import { AnimatePresence, motion, type MotionProps } from "framer-motion";
import { type ReactNode } from "react";

interface AnimatedTransitionProps {
    children: ReactNode;
    // Unique key that changes when the content should be animated in/out
    transitionKey: string | number;
    // Optional: controls the slide direction of the animation
    direction?: "up" | "down" | "left" | "right";
    // Optional: animation duration in seconds
    duration?: number;
    // Optional: additional motion.div props for further customization
    motionProps?: MotionProps;
}

export const AnimatedTransition = ({children, transitionKey, direction = "up", duration = 0.2, motionProps}: AnimatedTransitionProps) => {

    // Determine the starting Y offset based on direction
    const getInitialY = () => {
        if (direction === "up") return 10;        // slide in from bottom
        if (direction === "down") return -10;     // slide in from top
        return 0;
    };

    // Determine the starting X offset based on direction
    const getInitialX = () => {
        if (direction === "left") return 10;      // slide in from right
        if (direction === "right") return -10;    // slide in from left
        return 0;
    };

    // Determine the exit Y offset based on direction
    const getExitY = () => {
        if (direction === "up") return -10;   // exit to top
        if (direction === "down") return 10;  // exit to bottom
        return 0;
    };

    // Determine the exit X offset based on direction
    const getExitX = () => {
        if (direction === "left") return -10;  // exit to left
        if (direction === "right") return 10;  // exit to right
        return 0;
    };

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={transitionKey}
                initial={{ opacity: 0, y: getInitialY(), x: getInitialX() }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                exit={{ opacity: 0, y: getExitY(), x: getExitX() }}
                transition={{ duration }}
                {...motionProps}>
                  
                {children}
            </motion.div>
        </AnimatePresence>
    );
};