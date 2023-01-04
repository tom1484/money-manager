const getWeekDay = (year, month, date) => {
    return new Date(year, month, date).getDay();
}

export { getWeekDay };