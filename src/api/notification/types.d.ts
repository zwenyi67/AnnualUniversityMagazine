export type NotificationType = {
  id: number;
  title: string;
  message: string;
  created_at: string;
  active_flag: number;
  is_read: number;
  type: "user" | "role";
};
