import { ContributionType } from "@/api/student/types";
import TableHeaderCell from "@/components/table/TableHeaderCell";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";
import { Info } from "lucide-react";
import { Link } from "react-router-dom";

export const columns: ColumnDef<ContributionType>[] = [
  {
    id: "index",
    header: () => <TableHeaderCell className="text-center">#</TableHeaderCell>,
    cell: ({ table, row }) => {
      const sortedIndex =
        table.getSortedRowModel().rows.findIndex((r) => r.id === row.id) + 1;

      return <div className="text-center">{sortedIndex}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: () => <TableHeaderCell>Title</TableHeaderCell>,
    cell: ({ row }) => <div className="capitalize">{row.original.title}</div>,
  },
  {
    accessorKey: "description",
    header: () => <TableHeaderCell>Description</TableHeaderCell>,
    cell: ({ row }) => {
      const description = row.original.description || "";
      const words = description.split(" ");
      const truncatedDescription =
        words.length > 20 ? words.slice(0, 20).join(" ") + "..." : description;

      return <div className="capitalize">{truncatedDescription}</div>;
    },
  },
  {
    accessorKey: "created_at",
    header: () => (
      <TableHeaderCell className="text-center">Uploaded Date</TableHeaderCell>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-center">
          {formatDate(row.original.created_at.toString(), "dd/MM/yyyy HH:mm")}
        </div>
      );
    },
  },
  {
    accessorKey: "action",
    header: () => <div className="text-center">Action</div>,
    cell: ({ row }) => (
      <Link
        to={`/student/articles/details/${row.original.id}`}
        className="flex justify-center item-center"
      >
        <Info className="text-secondary text-center" />
      </Link>
    ),
  },
];
