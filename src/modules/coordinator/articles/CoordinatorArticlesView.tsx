import api from "@/api";
import TableUI from "@/components/table/TableUI";
import { columns } from "../articles/columns";
import FormHeader from "@/components/common/FormHeader";

const CoordinatorArticlesView = () => {
  const { data, isFetching, refetch, isRefetching } =
    api.coordinator.getContribution.useQuery();

  const handleRefresh = () => {
    refetch();
  };
  return (
    <section className="m-4">
      <FormHeader
        title={
          "Articles" +
          (data && data?.length > 0 ? " ( " + data[0].faculty_name + " )" : "")
        }
        onRefresh={handleRefresh}
        isLoading={isFetching || isRefetching}
      />
      <div className="p-6 bg-white rounded-b-lg min-h-[530px]">
        <TableUI
          data={data?.map((item) => ({
            ...item,
            articlename: item.title || "",
            contributor: item.first_name + " " + item.last_name || "",
            faculty: item.faculty_id.toString() || "",
            comments: [],
          }))}
          columns={columns}
          header={"Articles"}
          columnVisibility={{ created_at: false }}
          filterColumns={["articlename"]}
          sortColumn="updated_at"
          allowAdd={false}
        ></TableUI>
      </div>
    </section>
  );
};

export default CoordinatorArticlesView;
