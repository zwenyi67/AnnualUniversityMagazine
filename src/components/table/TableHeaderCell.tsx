import { cn } from "@/lib/utils";

const TableHeaderCell = ({
  children,
  className,
}: {
  children: string;
  className?: string;
}) => {
  return (
    <div className={cn("text-sm font-normal px-4", className)}>
      {children}
    </div>
  );
};

export default TableHeaderCell;
