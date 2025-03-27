import TableUI from "@/components/table/TableUI";
import { columns } from "./chunks/table/column";
import FormHeader from "@/components/common/FormHeader";
import api from "@/api";

const StudentArticlesView = () => {
  const { data, refetch, isFetching, isRefetching, isLoading } =
    api.student.getContributionsByStudentID.useQuery();

  return (
    <section className="m-4">
      <FormHeader
        title="Articles"
        onRefresh={() => refetch()}
        isLoading={isFetching || isRefetching}
      />
      <div className="p-6 bg-white rounded-b-lg">
        <TableUI
          header={"Articles"}
          columns={columns}
          loading={isLoading}
          data={data}
          noToolbar={false}
          columnVisibility={{}}
          sortColumn="created_at"
          filterColumns={["title", "description", "created_at"]}
          newCreate="/student/articles/create"
        ></TableUI>
      </div>
    </section>
  );
};

export default StudentArticlesView;
