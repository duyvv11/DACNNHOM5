const moment = require("moment");

module.exports = function generateDoctorDates(doctorSchedules, days = 30, bookedAppointments = []) {
  const result = [];

  for (let i = 0; i < days; i++) {
    const date = moment().add(i, "days");
    const dayName = date.format("dddd"); 
    const dateString = date.format("YYYY-MM-DD");
    const dailySchedules = doctorSchedules.filter(s => s.dayOfWeek === dayName);

    //Tạo ra tất cả các slots và đánh dấu trạng thái đặt lịch
    let slotsWithBookingStatus = dailySchedules.map(schedule => {

      const isBooked = bookedAppointments.some(appointment => {
        const scheduleMatch = appointment.scheduleId === schedule.id;
        const appointmentDateString = moment(appointment.startDateTime).format("YYYY-MM-DD");
        const dateMatch = appointmentDateString === dateString;

        return scheduleMatch && dateMatch;
      });

      return {
        startTime: schedule.startTime,
        endTime: schedule.endTime,
        scheduleId: schedule.id,
        isBooked: isBooked
      };
    });

    // bỏ slot đã được đặt
    const availableSlots = slotsWithBookingStatus.filter(slot => !slot.isBooked);
    // ngày giờ còn trống
    if (availableSlots.length > 0) {
      result.push({
        date: dateString,
        dayOfWeek: dayName,
        slots: availableSlots
      });
    }
  }

  return result;
};