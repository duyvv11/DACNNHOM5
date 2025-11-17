const moment = require("moment");

const DAYS_MAP = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

module.exports = function generateDoctorDates(doctorSchedules, days = 30) {
  const result = [];

  for (let i = 0; i < days; i++) {
    const date = moment().add(i, "days");
    const dayName = date.format("dddd"); // Monday, Tuesday, ...

    // tìm xem lịch DB có khớp thứ không
    const slots = doctorSchedules.filter(s => s.dayOfWeek === dayName);

    if (slots.length > 0) {
      result.push({
        date: date.format("YYYY-MM-DD"),
        dayOfWeek: dayName,
        slots: slots.map(s => ({
          startTime: s.startTime,
          endTime: s.endTime,
          scheduleId: s.id
        }))
      });
    }
  }

  return result;
};
