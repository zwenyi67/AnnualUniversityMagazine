import TableUI from "@/components/table/TableUI";
import { columns } from "./chunks/table/column";
import { StudentArticle } from "@/api/student/types";
import FormHeader from "@/components/common/FormHeader";

const StudentArticlesView = () => {
  const data: StudentArticle[] = [
    {
      id: 1,
      articleName: "Article 1",
    },
    {
      id: 2,
      articleName: "Article 2",
    },
    {
      id: 3,
      articleName: "Article 3",
    },
  ];

  return (
    <section className="m-4">
      <FormHeader
        title="Articles"
        // onRefresh={() => refetch()}
        // isLoading={isFetching || isRefetching}
      />
      <div className="p-6 bg-white rounded-b-lg">
        <TableUI
          columns={columns}
          loading={false}
          data={data}
          columnVisibility={{}}
          opt={{}}
          noToolbar={false}
          newCreate="/student/articles/create"
        ></TableUI>
      </div>
    </section>
  );
};

export default StudentArticlesView;
