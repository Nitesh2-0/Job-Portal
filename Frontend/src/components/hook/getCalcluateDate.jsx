import moment from 'moment';
const calDate = (value) => {
  const dayBefore = moment().diff(value, 'days');
  if (dayBefore === 0) return "Today"
  if (dayBefore === 1) return "Yesterday"
  if (dayBefore > 1 && dayBefore < 7) return `${dayBefore} day ago`
  const weekCal = Math.floor(dayBefore / 7);
  if (weekCal == 1) return `${weekCal} Week ago`
  return `${weekCal} Weeks ago`
}

export default calDate