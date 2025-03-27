import TableHeaderCell from "@/components/table/TableHeaderCell";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";
import ManageColumn from "./ManageColumn";
import { SelectedArticlesType } from "@/api/manager/types";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<SelectedArticlesType>[] = [
  {
    accessorKey: "number",
    header: () => <TableHeaderCell>{`No`}</TableHeaderCell>,
    cell: ({ table, row }) => {
      const sortedIndex =
        table.getSortedRowModel().rows.findIndex((r) => r.id === row.id) + 1;

      return <div>{sortedIndex}</div>;
    },
  },
  {
    accessorKey: "title",
    header: () => <TableHeaderCell>{`Title`}</TableHeaderCell>,
    cell: ({ row }) => {
      return <div>{row.original.title}</div>;
    },
    filterFn: "includesString",
  },
  {
    accessorKey: "description",
    header: () => <TableHeaderCell>{`Description`}</TableHeaderCell>,
    cell: ({ row }) => {
      return <div>{row.original.description}</div>;
    },
    filterFn: "includesString",
  },
  {
    accessorKey: "article_path",
    header: () => <TableHeaderCell>{`Article`}</TableHeaderCell>,
    cell: ({ row }) => {
      return <div>{row.original.article_path}</div>;
    },
    filterFn: "includesString",
  },
  {
    accessorKey: "created_at",
    header: () => <TableHeaderCell>{`Created At`}</TableHeaderCell>,
    cell: ({ row }) => {
      return (
        <div>
          {formatDate(row.original.created_at.toString(), "dd/MM/yyyy HH:mm")}
        </div>
      );
    },
  },
  {
    accessorKey: "action",
    header: () => (
      <TableHeaderCell className="text-center">{`Actions`}</TableHeaderCell>
    ),
    cell: (data) => {
      return <ManageColumn data={data.row.original} />;
    },
  },
];
