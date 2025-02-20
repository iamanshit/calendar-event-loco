import dayjs from "dayjs";

export const getDaysOfCurrentMonth = (month = dayjs().month()) => {
  const year = dayjs().year();
  const firstDayofMonth = dayjs().set("month", month).startOf("month").day();

  let dayCounter = -firstDayofMonth;

  return Array.from({ length: 5 }, () =>
    Array.from({ length: 7 }, () => dayjs(new Date(year, month, ++dayCounter)))
  );
};
