import TableHeaderCell from "@/components/table/TableHeaderCell";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";
import ManageColumn from "./ManageColumn";
import { getManagersType } from "@/api/admin/types";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<getManagersType>[] = [
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
    accessorKey: "firstName",
    header: () => <TableHeaderCell>{`First Name`}</TableHeaderCell>,
    cell: ({ row }) => {
      return <div>{row.original.first_name}</div>;
    },
    filterFn: "includesString",
  },
  {
    accessorKey: "lastName",
    header: () => <TableHeaderCell>{`Last Name`}</TableHeaderCell>,
    cell: ({ row }) => {
      return <div>{row.original.last_name}</div>;
    },
    filterFn: "includesString",
  },
  {
    accessorKey: "email",
    header: () => <TableHeaderCell>{`Email`}</TableHeaderCell>,
    cell: ({ row }) => {
      return <div>{row.original.email}</div>;
    },
    filterFn: "includesString",
  },
  {
    accessorKey: "status",
    header: () => <TableHeaderCell>{`Status`}</TableHeaderCell>,
    cell: ({ row }) => {
      return <div>{row.original.status}</div>;
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
