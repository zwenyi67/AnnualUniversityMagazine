import TableHeaderCell from "@/components/table/TableHeaderCell";
import ManageColumn from "@/modules/coordinator/articles/columns/ManageColumn";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";
import { CoordinatorsType } from "@/api/coordinator/types";

export const columns: ColumnDef<CoordinatorsType>[] = [
  {
    accessorKey: "number",
    header: () => <TableHeaderCell>{`No`}</TableHeaderCell>,
    cell: ({ table, row }) => {
      const sortedIndex =
        table.getSortedRowModel().rows.findIndex((r) => r.id === row.id) + 1;
      return <div className=" text-center">{sortedIndex}</div>;
    },
  },
  {
    accessorKey: "articlename",
    header: () => <TableHeaderCell>{`Article Name`}</TableHeaderCell>,
    cell: ({ row }) => {
      return <div>{row.original.title}</div>;
    },
    filterFn: "includesString",
  },
  {
    accessorKey: "contributor",
    header: () => <TableHeaderCell>{`Contributor`}</TableHeaderCell>,
    cell: ({ row }) => {
      return (
        <div className=" text-center">
          {row.original.first_name + " " + row.original.last_name || "-"}
        </div>
      );
    },
    filterFn: "includesString",
  },
  {
    accessorKey: "description",
    header: () => <TableHeaderCell>{`Description`}</TableHeaderCell>,
    cell: ({ row }) => {
      return <div>{row.original.description || "-"}</div>;
    },
    filterFn: "includesString",
  },
  {
    accessorKey: "updated_at",
    header: () => <TableHeaderCell>{`Updated At`}</TableHeaderCell>,
    cell: ({ row }) => {
      return (
        <div>
          {formatDate(new Date(row.original.updated_at), "dd/MM/yyyy HH:mm")}
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
