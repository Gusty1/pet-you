
export function showDateYMD (date) {
  date = new Date(date)
  let month = parseInt(date.getMonth() + 1)
  if (month < 10) month = '0' + month
  let day = parseInt(date.getDate())
  if (day < 10) day = '0' + day
  return date.getFullYear() + '/' + month + '/' + day
}