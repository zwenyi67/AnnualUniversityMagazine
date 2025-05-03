import { useEffect, useState } from "react";
import { format } from "date-fns";
import api from "@/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, RefreshCcw } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { NotificationType } from "@/api/notification/types";
import { toast } from "@/hooks/use-toast";

const ManagerNotificationsView = () => {
  const { data, isFetching, refetch, isRefetching } =
    api.notification.getCoordinatorNotifications.useQuery();

  const [activeTab, setActiveTab] = useState("all");

  const [filteredNotifications, setFilteredNotifications] = useState<
    NotificationType[]
  >([]);

  useEffect(() => {
    if (data) {
      if (activeTab === "all") {
        setFilteredNotifications(data);
      } else if (activeTab === "unread") {
        setFilteredNotifications(
          data.filter((notification) => notification.is_read === 0)
        );
      } else if (activeTab === "system") {
        setFilteredNotifications(
          data.filter((notification) => notification.type === "role")
        );
      } else if (activeTab === "user") {
        setFilteredNotifications(
          data.filter((notification) => notification.type === "user")
        );
      }
    }
  }, [data, activeTab]);

  const { mutate: markNotificationAsRead } =
    api.notification.markNotificationAsRead.useMutation({
      onError: (error) => {
        toast({
          title: error.message,
          variant: "destructive",
        });
      },
      onSuccess: () => {
        refetch();
      },
    });

  const handleMarkAsRead = (notification_id: number, type: string) => {
    markNotificationAsRead({
      notification_id,
      type,
    });
  };

  const getNotificationBadge = (type: string) => {
    if (type === "role") {
      return <Badge className="bg-blue-500 hover:bg-blue-600">System</Badge>;
    }
    return <Badge className="bg-purple-500 hover:bg-purple-600">User</Badge>;
  };

  return (
    <div className="container mx-auto py-6 ">
      <Card className="shadow-lg border-0">
        <CardHeader className="bg-gray-50 rounded-t-lg border-b">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-xl font-semibold">
                Notifications
              </CardTitle>
              {data && data.filter((n) => n.is_read === 0).length > 0 && (
                <Badge className="bg-red-500">
                  {data.filter((n) => n.is_read === 0).length}
                </Badge>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={() => refetch()}
                disabled={isFetching || isRefetching}
              >
                <RefreshCcw
                  className={`h-4 w-4 ${isRefetching ? "animate-spin" : ""}`}
                />
                Refresh
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs
            defaultValue="all"
            className="w-full"
            onValueChange={setActiveTab}
          >
            <div className="border-b px-4">
              <TabsList className="h-12 bg-transparent">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none"
                >
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="unread"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none"
                >
                  Unread
                </TabsTrigger>
                <TabsTrigger
                  value="system"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none"
                >
                  System
                </TabsTrigger>
                <TabsTrigger
                  value="user"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none"
                >
                  User
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value={activeTab} className="m-0">
              {isFetching || isRefetching ? (
                <div className="p-4 space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="flex flex-col gap-2 p-4 border-b last:border-b-0"
                    >
                      <div className="flex justify-between">
                        <Skeleton className="h-6 w-32" />
                        <Skeleton className="h-6 w-20" />
                      </div>
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  ))}
                </div>
              ) : filteredNotifications && filteredNotifications.length > 0 ? (
                <div className="divide-y">
                  {filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-gray-50 transition-colors ${
                        notification.is_read === 0 ? "bg-blue-50" : ""
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-gray-900">
                            {notification.title}
                          </h3>
                          {getNotificationBadge(notification.type)}
                          {notification.is_read === 0 && (
                            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">
                            {format(
                              new Date(notification.created_at),
                              "MMM d, yyyy • h:mm a"
                            )}
                          </span>
                          {notification.is_read === 0 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 text-xs text-blue-600 hover:text-blue-800"
                              onClick={() =>
                                handleMarkAsRead(
                                  notification.id,
                                  notification.type
                                )
                              }
                            >
                              Mark as read
                            </Button>
                          )}
                        </div>
                      </div>
                      <p className="text-gray-600">{notification.message}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-12 text-center">
                  <Bell className="h-12 w-12 text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900">
                    No notifications
                  </h3>
                  <p className="text-gray-500 mt-1">
                    You don't have any notifications in this category.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManagerNotificationsView;
