import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionLabel({
  children,
  className,
}: SectionLabelProps) {
  return (
    <p
      className={cn(
        "mb-3 text-[11px] font-medium uppercase tracking-widest text-rose-300",
        className,
      )}
    >
      {children}
    </p>
  );
}
