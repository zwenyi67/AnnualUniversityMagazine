import TableHeaderCell from "@/components/table/TableHeaderCell";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "date-fns";
import { GetLogsType } from "@/api/admin/types";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

const detectBrowser = (userAgent:any) => {
	if (userAgent.includes("Firefox")) {
	  const firefoxVersion = userAgent.match(/Firefox\/(\d+\.\d+)/);
	  return `Firefox ${firefoxVersion ? firefoxVersion[1] : ""}`;
	} else if (userAgent.includes("Edg")) {
	  const edgeVersion = userAgent.match(/Edg\/(\d+\.\d+\.\d+\.\d+)/);
	  return `Edge ${edgeVersion ? edgeVersion[1] : ""}`;
	} else if (userAgent.includes("Chrome")) {
	  const chromeVersion = userAgent.match(/Chrome\/(\d+\.\d+\.\d+\.\d+)/);
	  return `Chrome ${chromeVersion ? chromeVersion[1] : ""}`;
	} else if (userAgent.includes("Safari")) {
	  const safariVersion = userAgent.match(/Version\/(\d+\.\d+)/);
	  return `Safari ${safariVersion ? safariVersion[1] : ""}`;
	} else {
	  return "Unknown Browser";
	}
  };

export const columns: ColumnDef<GetLogsType>[] = [
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
    accessorKey: "table_name",
    header: () => <TableHeaderCell>{`Table`}</TableHeaderCell>,
    cell: ({ row }) => {
      return <div>{row.original.table_name}</div>;
    },
    filterFn: "includesString",
  },
  {
    accessorKey: "action_type",
    header: () => <TableHeaderCell>{`Action Type`}</TableHeaderCell>,
    cell: ({ row }) => {
      return <div>{row.original.action_type}</div>;
    },
    filterFn: "includesString",
  },
  {
    accessorKey: "user_id",
    header: () => <TableHeaderCell>{`User`}</TableHeaderCell>,
    cell: ({ row }) => {
      return <div>{row.original.user.email}</div>;
    },
    filterFn: "includesString",
  },
  {
    accessorKey: "ip_address",
    header: () => <TableHeaderCell>{`IP Address`}</TableHeaderCell>,
    cell: ({ row }) => {
      return <div>{row.original.ip_address}</div>;
    },
    filterFn: "includesString",
  },
  {
    accessorKey: "user_agent",
    header: () => <TableHeaderCell>{`Browser`}</TableHeaderCell>,
    cell: ({ row }) => {
      return <div>{detectBrowser(row.original.user_agent)}</div>;
    },
    filterFn: "includesString",
  },
  {
    accessorKey: "success",
    header: () => <TableHeaderCell>{`Status`}</TableHeaderCell>,
    cell: ({ row }) => {
      return (
        <div>
          {row.original.success ? (
            <span
              className={`px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700`}
            >
              Success
            </span>
          ) : (
            <span
              className={`px-4 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700`}
            >
              Fail
            </span>
          )
          }
        </div>
      );
    },
    filterFn: "includesString",
  },
  {
    accessorKey: "message",
    header: () => <TableHeaderCell>{`Message`}</TableHeaderCell>,
    cell: ({ row }) => {
      return <div>{row.original.message}</div>;
    },
    filterFn: "includesString",
  },
  {
    accessorKey: "created_at",
    header: () => <TableHeaderCell>{`Date`}</TableHeaderCell>,
    cell: ({ row }) => {
      return (
        <div>
          {formatDate(row.original.created_at.toString(), "dd/MM/yyyy HH:mm")}
        </div>
      );
    },
  },
];
