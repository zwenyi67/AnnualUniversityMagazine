import TableHeaderCell from "@/components/table/TableHeaderCell";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";
import ManageColumn from "./ManageColumn";
import { getCoordinatorsType } from "@/api/admin/types";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<getCoordinatorsType>[] = [
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
    accessorKey: "first_name",
    header: () => <TableHeaderCell>{`First Name`}</TableHeaderCell>,
    cell: ({ row }) => {
      return <div>{row.original.first_name}</div>;
    },
    filterFn: "includesString",
  },
  {
    accessorKey: "last_name",
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
    accessorFn: (row) => row.faculty?.name,
    id: "category", // assign an id since we're using accessorFn
    header: () => <TableHeaderCell>{`Faculty`}</TableHeaderCell>,
    cell: ({ row }) => {
      return <div>{row.original.faculty?.name}</div>;
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
