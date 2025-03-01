import api from "@/api"
import TableUI from "@/components/table/TableUI"
import { columns } from "./columns"
import FormHeader from "@/components/common/FormHeader"

const StudentView = () => {

	const { data, isFetching, refetch, isRefetching} = api.admin.studentUsers.getStudents.useQuery()

	return (
		<section className="m-4">
			<FormHeader
				title="User Management - Student"
				onRefresh={() => refetch()}
				isLoading={isFetching || isRefetching}
			/>
			<div className="p-6 bg-white rounded-b-lg min-h-[530px]">
				<TableUI
					data={data}
					columns={columns}
					header={"User Management"}
					columnVisibility={{ created_at: false }}
					filterColumns={["first_name"]}
					sortColumn="created_at"
					newCreate="/admin/user-management/students/create"
				>
				</TableUI>
			</div>
		</section>
	)
}

export default StudentView
