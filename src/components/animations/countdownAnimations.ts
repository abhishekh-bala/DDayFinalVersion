export const overlayAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 }
};

export const numberAnimation = {
  initial: { scale: 0.5, opacity: 0, y: 20 },
  animate: { scale: 1, opacity: 1, y: 0 },
  exit: { scale: 1.5, opacity: 0, y: -20 },
  transition: { type: "spring", stiffness: 300, damping: 20 }
};