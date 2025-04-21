import api from "@/api";
import TableUI from "@/components/table/TableUI";
import { columns } from "../students/columns";
import FormHeader from "@/components/common/FormHeader";

const CoordinatorStudentsView = () => {
  const { data, isFetching, refetch, isRefetching } =
    api.coordinator.getStudents.useQuery();

  return (
    <section className="m-4">
      <FormHeader
        title="Students"
        onRefresh={() => refetch()}
        isLoading={isFetching || isRefetching}
      />
      <div className="p-6 bg-white rounded-b-lg min-h-[530px]">
        <TableUI
          data={data}
          columns={columns}
          header={"Students"}
          columnVisibility={{ created_at: false }}
          filterColumns={["student_name"]}
          sortColumn="created_at"
          allowAdd={false}
        ></TableUI>
      </div>
    </section>
  );
};

export default CoordinatorStudentsView;
