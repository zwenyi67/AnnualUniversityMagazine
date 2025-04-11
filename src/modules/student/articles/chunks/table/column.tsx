import { StudentArticle } from "@/api/student/types";
import { ColumnDef } from "@tanstack/react-table";
import { Info } from "lucide-react";
import { Link } from "react-router-dom";

export const columns: ColumnDef<StudentArticle>[] = [
  {
    id: "id",
    header: () => <div className="text-center">#</div>,
    cell: ({ row }) => <div className="text-center">{row.original.id}</div>,
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
    header: () => <div className="text-center">Action</div>,
    cell: ({ row }) => (
      <Link
        to={`/student/articles/details/${row.original.id}`}
        className="flex justify-center item-center"
      >
        <Info className="text-[#4169E1] text-center" />
      </Link>
    ),
  },
];
