import { ColumnDef } from "@tanstack/react-table";
import TableHeaderCell from "@/components/table/TableHeaderCell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CoordinatorsType } from "@/api/coordinator/types";
import { Eye, Clock } from "lucide-react";

// Status badge configuration for better consistency
const statusConfig = {
  pending: {
    bg: "bg-amber-100",
    text: "text-amber-800",
    hover: "hover:bg-amber-200",
    label: "Pending",
  },
  reviewed: {
    bg: "bg-orange-100",
    text: "text-orange-800",
    hover: "hover:bg-orange-200",
    label: "Reviewed",
  },
  selected: {
    bg: "bg-emerald-100",
    text: "text-emerald-800",
    hover: "hover:bg-emerald-200",
    label: "Selected",
  },
};

export const columns: ColumnDef<CoordinatorsType>[] = [
  {
    accessorKey: "student_name",
    header: () => <TableHeaderCell>Student</TableHeaderCell>,
    cell: ({ row }) => {
      const initials = row.original.first_name  
        .split(" ")
        .map((name) => name.charAt(0))
        .join("")
        .toUpperCase()
        .slice(0, 2);

      return (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-medium text-sm">
            {initials}
          </div>
          <span className="font-medium">
            {row.original.first_name + " " + row.original.last_name}
          </span>
        </div>
      );
    },
    filterFn: "includesString",
  },
  {
    accessorKey: "title",
    header: () => <TableHeaderCell>Title</TableHeaderCell>,
    cell: ({ row }) => {
      return (
        <div className="font-medium text-gray-800">{row.original.title}</div>
      );
    },
    filterFn: "includesString",
  },
  {
    accessorKey: "submitted_at",
    header: () => <TableHeaderCell>Submitted</TableHeaderCell>,
    cell: ({ row }) => {
      const now = new Date();
      const diff = Math.floor(
        (now.getTime() - new Date(row.original.created_at).getTime()) /
          (1000 * 60 * 60)
      );

      const timeString =
        diff < 24
          ? `${diff} ${diff === 1 ? "hour" : "hr"} ago`
          : `${Math.floor(diff / 24)} ${
              Math.floor(diff / 24) === 1 ? "day" : "days"
            } ago`;

      return (
        <div className="flex items-center gap-2 text-gray-600">
          <Clock size={14} />
          <span>{timeString}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => <TableHeaderCell>Status</TableHeaderCell>,
    cell: ({ row }) => {
      const status = row.original.status;
      const config = statusConfig[status];

      return (
        <Badge
          className={`${config.bg} ${config.text} ${config.hover} font-medium px-3 py-1`}
        >
          {config.label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "action",
    header: () => <TableHeaderCell>Action</TableHeaderCell>,
    cell: ({ row }) => {
      const status = row.original.status;
      const isPending = status === "pending";

      return (
        <Button
          variant="outline"
          size="sm"
          className={`flex items-center gap-1 ${
            isPending
              ? "text-blue-600 border-blue-200 hover:bg-blue-50"
              : "text-gray-600 border-gray-200 hover:bg-gray-50"
          }`}
        >
          {isPending ? (
            "Review"
          ) : (
            <>
              <Eye size={14} />
              <span>View</span>
            </>
          )}
        </Button>
      );
    },
  },
];
