const today = new Date();

// today - 7 days = '2023-12-25'
// convert a interval number to YYYY-MM-DD string
export function convertDateStr(interval: number) {
  if (Number.isNaN(interval) || interval < 0) {
    return "";
  }

  const daysAgo = new Date(today.getTime() - interval * 24 * 60 * 60 * 1000);
  const year = daysAgo.getFullYear();
  const month = daysAgo.getMonth() + 1;
  const date = daysAgo.getDate();

  return `${year}-${month}-${date}`;
}
