import { ColumnDef } from "@tanstack/react-table";
import { StudentArticle } from "../StudentDashboardView";
import { Button } from "@/components/ui/button";

export const columns: ColumnDef<StudentArticle>[] = [
  {
    id: "id",
    header: "ID",
    cell: ({ row }) => <div>{row.original.id}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "articleName",
    header: "Article Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.original.articleName}</div>
    ),
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: () => (
      <div className="lowercase">
        <Button variant={"outline"} className="text-secondary">
          Detail
        </Button>
      </div>
    ),
  },
];
