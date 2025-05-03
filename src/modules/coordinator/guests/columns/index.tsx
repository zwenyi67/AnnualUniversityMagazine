import TableHeaderCell from "@/components/table/TableHeaderCell";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";
import { GuestType } from "@/api/guest/types";

export const columns: ColumnDef<GuestType>[] = [
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
    accessorKey: "guestname",
    header: () => <TableHeaderCell>{`Guest Name`}</TableHeaderCell>,
    cell: ({ row }) => {
      return (
        <div>{row.original.first_name + " " + row.original.last_name}</div>
      );
    },
    filterFn: "includesString",
  },
  {
    accessorKey: "email",
    header: () => <TableHeaderCell>{`Email`}</TableHeaderCell>,
    cell: ({ row }) => {
      return <div>{row.original.email || "-"}</div>;
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
];
