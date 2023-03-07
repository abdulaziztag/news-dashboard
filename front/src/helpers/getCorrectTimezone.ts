export const getCorrectTimezone = (date: Date | number) => {
  const now = new Date(date)
  const timezoneOffset = now.getTimezoneOffset() * 60 * 1000
  now.setTime(now.getTime() - timezoneOffset)
  return now
}
