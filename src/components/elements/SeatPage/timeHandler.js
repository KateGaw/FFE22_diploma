import moment from "moment";

export const timeHandler = (start_date, end_date) => {
  const period_ms = moment.duration(
    moment(end_date).diff(moment(start_date), "milliseconds", true),
    "milliseconds"
  );
  const period_hours = Math.floor(period_ms.asHours());
  const period_minutes = Math.floor(period_ms.asMinutes()) - period_hours * 60;

  const last_hour = period_hours.toString().split("").pop();
  const last_min = period_minutes.toString().split("").pop();

  let hour_text, min_text;
  if (last_hour > 4 || last_hour === 0) {
    hour_text = "часов";
  } else if (last_hour < 5 && last_hour > 1) {
    hour_text = "часа";
  } else {
    hour_text = "час";
  }

  if (last_min > 4 || last_min === 0) {
    min_text = "минут";
  } else if (last_min < 5 && last_min > 1) {
    min_text = "минуты";
  } else {
    min_text = "минута";
  }

  const time_output = `${period_hours} ${hour_text} \n ${period_minutes} ${min_text}`;
  return time_output;
};
