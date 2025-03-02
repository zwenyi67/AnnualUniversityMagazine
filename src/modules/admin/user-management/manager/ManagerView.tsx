import api from "@/api"
import TableUI from "@/components/table/TableUI"
import { columns } from "./columns"
import FormHeader from "@/components/common/FormHeader"

const ManagerView = () => {

	const { data, isFetching, refetch, isRefetching} = api.admin.managerUsers.getManagers.useQuery()

	return (
		<section className="m-4">
			<FormHeader
				title="User Management - Manager"
				onRefresh={() => refetch()}
				isLoading={isFetching || isRefetching}
			/>
			<div className="p-6 bg-white rounded-b-lg min-h-[530px]">
				<TableUI
					data={data}
					columns={columns}
					header={"User Management"}
					columnVisibility={{ created_at: false }}
					filterColumns={["name"]}
					sortColumn="created_at"
					newCreate="/admin/user-management/managers/create"
				>
				</TableUI>
			</div>
		</section>
	)
}

export default ManagerView
