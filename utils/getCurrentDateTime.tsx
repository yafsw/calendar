export default function getCurrentDateTime(currentDate: string) {
  const time = new Date().toISOString().split(":");

  const [date] = currentDate.split(":");

  time[0] = date;

  const dateTime = time.join(":");

  return dateTime;
}
