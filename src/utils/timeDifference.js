export function timeDifference(date1,date2) {
    const hour1 = date1.getHours() + date1.getMinutes()/60;
    const hour2 = date2.getHours() + date2.getMinutes()/60;
    return hour2 - hour1;
}