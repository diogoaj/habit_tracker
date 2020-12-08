function getMonth() {
    const d = new Date();
    return d.getMonth();
}

function daysInMonth(month) {
    const year = new Date().getFullYear();
    const d = new Date(year, month + 1, 0);
    return d.getDate();
  }

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  
  export { daysInMonth, getMonth, months };
  