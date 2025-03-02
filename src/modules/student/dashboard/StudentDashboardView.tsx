import TableUI from "@/components/table/TableUI";
import { columns } from "./table/column";

export type StudentArticle = {
  id: number;
  articleName: string;
};

const StudentDashboardView = () => {
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
      <TableUI
        columns={columns}
        loading={false}
        data={data}
        columnVisibility={{}}
        opt={{}}
        noToolbar={false}
      ></TableUI>
    </section>
  );
};

export default StudentDashboardView;
