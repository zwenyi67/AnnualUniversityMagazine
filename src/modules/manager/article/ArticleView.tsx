import api from "@/api"
import TableUI from "@/components/table/TableUI"
import { columns } from "./columns"
import FormHeader from "@/components/common/FormHeader"

const ArticleView = () => {

	const { data, isFetching, refetch, isRefetching} = api.manager.getSelectedArticles.useQuery()

	return (
		<section className="m-4">
			<FormHeader
				title="Selected Articles"
				onRefresh={() => refetch()}
				isLoading={isFetching || isRefetching}
			/>
			<div className="p-6 bg-white rounded-b-lg min-h-[530px]">
				<TableUI
					data={data}
					columns={columns}
					header={"Selected Articles"}
					columnVisibility={{ created_at: false }}
					filterColumns={["name"]}
					sortColumn="created_at"
				>
				</TableUI>
			</div>
		</section>
	)
}

export default ArticleView
