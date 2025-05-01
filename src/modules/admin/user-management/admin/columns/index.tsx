import TableHeaderCell from "@/components/table/TableHeaderCell";
import { ColumnDef } from "@tanstack/react-table";
import { differenceInDays, formatDate } from "date-fns";
import ManageColumn from "./ManageColumn";
import { getAdminsType } from "@/api/admin/types";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<getAdminsType>[] = [
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
    accessorKey: "last_login_at",
    header: () => <TableHeaderCell>Last Login Date</TableHeaderCell>,
    cell: ({ row }) => {
      const value = row.original.last_login_at;
      return (
        <div className="text-sm">
          {value
            ? formatDate(new Date(value), "dd MMM yyyy hh:mm:ss a")
            : "This user has not logged in yet."}
        </div>
      );
    },
    filterFn: "includesString",
  },
  {
    accessorKey: "active_status",
    header: () => <TableHeaderCell>Active Status</TableHeaderCell>,
    cell: ({ row }) => {
      const loginAt = row.original.last_login_at;
  
      if (!loginAt) {
        return <span className="text-sm text-gray-500">No recent usage</span>;
      }
  
      const daysAgo = differenceInDays(new Date(), new Date(loginAt));
  
      if (daysAgo <= 2) {
        return <span className="text-sm text-green-600 font-medium">Active</span>;
      }
  
      return (
        <span className="text-sm text-yellow-600 font-medium">
          Active {daysAgo} days ago
        </span>
      );
    },
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
