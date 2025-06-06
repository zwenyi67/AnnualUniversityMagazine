import { Button } from "@/components/ui/button"
import { Pencil2Icon } from "@radix-ui/react-icons"
import { Link } from "react-router-dom"
import { Trash2Icon } from "lucide-react"
import { useState } from "react"
import api from '@/api';
import { toast } from "@/hooks/use-toast"
import { useQueryClient } from "@tanstack/react-query"
import { getManagersType } from "@/api/admin/types"

const ManageColumn = ({ data }: { data: getManagersType }) => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const queryClient = useQueryClient();


	const { mutate: deleteManager } = api.admin.managerUsers.deleteManager.useMutation({
		onSuccess: () => {
			toast({
				title: "Manager Deleted successfully",
				variant: "success",
			});

			queryClient.invalidateQueries({
				queryKey: ["getManagers"],
			});
		},
		onError: (error) => {

			toast({
				title: error.message,
				variant: "destructive",
			});
		},
	});

	const handleDelete = (id: number) => {
		deleteManager(id);
		setIsDialogOpen(false);
	};

	return (
		<div className="flex items-center justify-center">

			<Button variant={"columnIcon"} size={"icon"}>
				<Link to={`/admin/user-management/managers/${data.id}/edit`} state={{ data }}>
					<Pencil2Icon color="green" />
				</Link>
			</Button>
			<Button variant={"columnIcon"} size={"icon"} onClick={() => setIsDialogOpen(true)}>
				<Trash2Icon color="red" />
			</Button>
			{/* Dialog Box */}
			{isDialogOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white p-6 rounded-md shadow-md">
						<h2 className="text-lg font-semibold mb-4">
							Are you sure you want to delete this item?
						</h2>
						<div className="flex justify-center space-x-4">
							<Button
								variant="secondary"
								onClick={() => setIsDialogOpen(false)}
							>
								Cancel
							</Button>
							<Button variant="destructive" onClick={() => handleDelete(data.id)}>
								Confirm
							</Button>
						</div>
					</div>
				</div>
			)}

		</div>
	)
}

export default ManageColumn
