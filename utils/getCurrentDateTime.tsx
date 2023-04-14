export default function getCurrentDateTime(currentDate: string) {
  const time = new Date().toISOString().split(":");

  time[0] = currentDate.split(":")[0];

  const dateTime = time.join(":");

  return dateTime;
}
