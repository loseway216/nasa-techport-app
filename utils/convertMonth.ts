export function convertMonth(month: number): string {
  // check number 1~12
  const reg = new RegExp(/^[1-9]$|^1[0-2]$/);
  if (reg.test(month + "") === false) {
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
    "Nov",
    "Dec",
  ];
  return map[month - 1];
}
