export function convertMonth(month: number): string {
  if (month < 1 || month > 12) {
    return "";
  }

  const map = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
  ];
  return map[month - 1];
}
