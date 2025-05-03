import { Button } from "@/components/ui/button"
import { Info } from "lucide-react"
import { SelectedArticlesType } from "@/api/guest/types"
import { Link } from "react-router-dom"

const ManageColumn = ({ data }: { data: SelectedArticlesType }) => {

	return (
		<div className="flex items-center justify-center">
			<Button variant={"columnIcon"} size={"icon"}>
				<Link to={`/guest/articles/${data.id}`} state={{ data }}>
				<Info color="blue" />
				</Link>
			</Button>
		</div>
	)
}

export default ManageColumn
