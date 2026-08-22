import { toJalaali, toGregorian } from "jalaali-js";

export const jalaliMonths = [
  "Hamal",
  "Sawr",
  "Jawza",
  "Saratan",
  "Asad",
  "Sunbula",
  "Mizan",
  "Aqrab",
  "Qaws",
  "Jadi",
  "Dalwa",
  "Hoot",
];

export const formatJalaliDate = (date) => {
  if (!date) return "";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "";

  const { jy, jm, jd } = toJalaali(
    parsedDate.getFullYear(),
    parsedDate.getMonth() + 1,
    parsedDate.getDate(),
  );

  return `${jd} ${jalaliMonths[jm - 1]} ${jy}`;
};

export const gregorianToJalali = (date) => {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return null;

  const { jy, jm, jd } = toJalaali(
    parsedDate.getFullYear(),
    parsedDate.getMonth() + 1,
    parsedDate.getDate(),
  );

  return {
    year: jy,
    month: jm,
    day: jd,
  };
};

export const jalaliToGregorian = (year, month, day) => {
  const { gy, gm, gd } = toGregorian(Number(year), Number(month), Number(day));

  return new Date(gy, gm - 1, gd);
};
