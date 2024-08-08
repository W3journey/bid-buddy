import { cn } from "@/lib/utils";

interface PageTitleProps {
  children: React.ReactNode;
  className?: string;
}
export const PageTitle = ({ children, className }: PageTitleProps) => {
  return (
    <h1 className={cn("text-4xl font-bold capitalize", className)}>
      {children}
    </h1>
  );
};
