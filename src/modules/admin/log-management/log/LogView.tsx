import api from "@/api"
import TableUI from "@/components/table/TableUI"
import { columns } from "./columns"
import FormHeader from "@/components/common/FormHeader"

const LogView = () => {

	const { data, isFetching, refetch, isRefetching } = api.admin.logs.getLogs.useQuery()

	return (
		<section className="m-4">
			<FormHeader
				title="Log Management"
				onRefresh={() => refetch()}
				isLoading={isFetching || isRefetching}
			/>
			<div className="p-6 bg-white rounded-b-lg min-h-[530px]">
				<TableUI
					data={data}
					columns={columns}
					header={"Log Management"}
					columnVisibility={{}}
					filterColumns={["name"]}
					sortColumn="created_at"
				>
				</TableUI>
			</div>
		</section>
	)
}

export default LogView
