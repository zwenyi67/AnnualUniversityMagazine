import api from "@/api";
import TableUI from "@/components/table/TableUI";
import { columns } from "../guests/columns";
import FormHeader from "@/components/common/FormHeader";

const CoordinatorGuestsView = () => {
  const { data, isFetching, refetch, isRefetching } =
    api.guest.getGuest.useQuery();

  return (
    <section className="m-4">
      <FormHeader
        title="Articles"
        onRefresh={() => refetch()}
        isLoading={isFetching || isRefetching}
      />
      <div className="p-6 bg-white rounded-b-lg min-h-[530px]">
        <TableUI
          data={data}
          columns={columns}
          header={"Guests"}
          columnVisibility={{ created_at: false }}
          filterColumns={["guestname"]}
          sortColumn="created_at"
          allowAdd={false}
        ></TableUI>
      </div>
    </section>
  );
};

export default CoordinatorGuestsView;
