export function getAppointmentsForDay(state, day) {
  const result = [];
  const dayObj = state.days.filter(thisDay => thisDay.name === day);

  if (dayObj.length > 0) {
    const appointmentIds = dayObj[0].appointments;

    for (let id of appointmentIds) {
      result.push(state.appointments[id])
    }
  }
  return result;
};

export function getInterview(state, interview) {
  if (interview === null || !interview) {
    return null;
  }
      return {
        student: interview.student,
        interviewer: state.interviewers[interview.interviewer]
      };

};

export function getInterviewersForDay(state, day) {
  const result = [];
  const dayObj = state.days.filter(thisDay => thisDay.name === day);

  if (dayObj.length > 0) {
    const interviewIds = dayObj[0].interviewers;

    for (let id of interviewIds) {
      result.push(state.interviewers[id])
    }
  }
  return result;
};