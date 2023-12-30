const map = {
  Active: "bg-emerald-500",
  Completed: "bg-sky-500",
  Canceled: "bg-rose-500",
  "Not Started": "bg-orange-500",
};

export function convertStatusClass(
  status: "Active" | "Completed" | "Canceled" | "Not Started"
): string {
  if (!status) {
    return "";
  }
  return map[status];
}
