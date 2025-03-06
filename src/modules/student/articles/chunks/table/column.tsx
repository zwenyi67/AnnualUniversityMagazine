import { ColumnDef } from "@tanstack/react-table";
import { StudentArticle } from "../../StudentArticlesView";
import { Navigate } from "react-router-dom";

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
    cell: ({ row }) => (
      <div className="lowercase">
        <Navigate
          to={`/student/articles/details/${row.original.id}`}
        ></Navigate>
      </div>
    ),
  },
];
