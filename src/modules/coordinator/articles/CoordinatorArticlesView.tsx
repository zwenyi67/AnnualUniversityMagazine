import api from "@/api";
import TableUI from "@/components/table/TableUI";
import { columns, SystemSettingContext } from "../articles/columns";
import FormHeader from "@/components/common/FormHeader";
import { useState, useEffect } from "react";
import { SystemSetting } from "@/api/coordinator/types";

const CoordinatorArticlesView = () => {
  const { data, isFetching, refetch, isRefetching } =
    api.coordinator.getContribution.useQuery();

  const [systemSetting, setSystemSetting] = useState<SystemSetting | null>(
    null
  );

  useEffect(() => {
    if (data?.systemSetting) {
      setSystemSetting(data.systemSetting);
    }
  }, [data]);

  const handleRefresh = () => {
    refetch();
  };

  return (
    <section className="m-4">
      <FormHeader
        title={
          "Articles" +
          (data && data?.contributions.length > 0
            ? " ( " + data.contributions[0].faculty_name + " )"
            : "")
        }
        onRefresh={handleRefresh}
        isLoading={isFetching || isRefetching}
      />
      <div className="p-6 bg-white rounded-b-lg min-h-[530px]">
        <SystemSettingContext.Provider value={systemSetting}>
          <TableUI
            data={data?.contributions || []}
            columns={columns}
            header={"Articles"}
            columnVisibility={{ created_at: false }}
            filterColumns={["articlename"]}
            sortColumn="updated_at"
            allowAdd={false}
          />
        </SystemSettingContext.Provider>
      </div>
    </section>
  );
};

export default CoordinatorArticlesView;
