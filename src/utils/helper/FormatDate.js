export function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatDayJsDate(date) {
  const year = date.$y;
  const month = date.$M + 1;
  const day = date.$D;
  return `${year}-${month}-${day}`;
}
