
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChordButtonProps {
  chord: string;
  onClick: () => void;
}

const ChordButton = ({ chord, onClick }: ChordButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = () => {
    setIsPressed(true);
    onClick();
    setTimeout(() => setIsPressed(false), 200);
  };

  return (
    <Button
      variant="outline"
      className={cn(
        "h-32 w-full text-lg font-light tracking-wide",
        "border-2 hover:border-neutral-400 transition-all duration-200",
        "bg-white hover:bg-neutral-50 active:bg-neutral-100",
        isPressed && "scale-[0.98] bg-neutral-100",
      )}
      onClick={handleClick}
    >
      {chord}
    </Button>
  );
};

export default ChordButton;
