import { useEffect, useState } from "react";
import {
  gregorianToJalali,
  jalaliToGregorian,
  jalaliMonths,
} from "../../utils/jalaliDate.js";

const daysInMonth = (year, month) => {
  if (month <= 6) return 31;
  if (month <= 11) return 30;

  // Hoot: check by trying to convert day 30
  try {
    jalaliToGregorian(year, 12, 30);
    return 30;
  } catch {
    return 29;
  }
};

function JalaliDatePicker({ value, onChange, required = false }) {
  const today = gregorianToJalali(new Date());

  const initialDate = value ? gregorianToJalali(value) : today;

  const [year, setYear] = useState(initialDate?.year || today.year);
  const [month, setMonth] = useState(initialDate?.month || today.month);
  const [day, setDay] = useState(initialDate?.day || today.day);

  useEffect(() => {
    if (!value) return;

    const jalali = gregorianToJalali(value);

    if (jalali) {
      setYear(jalali.year);
      setMonth(jalali.month);
      setDay(jalali.day);
    }
  }, [value]);

  const updateDate = (newYear, newMonth, newDay) => {
    const maxDay = daysInMonth(newYear, newMonth);

    const safeDay = Math.min(newDay, maxDay);

    setYear(newYear);
    setMonth(newMonth);
    setDay(safeDay);

    const gregorianDate = jalaliToGregorian(newYear, newMonth, safeDay);

    // Important:
    // Send a normal Date to AddMember.
    onChange(gregorianDate);
  };

  return (
    <div className="grid grid-cols-3 gap-3">
      {/* DAY */}
      <select
        value={day}
        required={required}
        onChange={(e) => updateDate(year, month, Number(e.target.value))}
        className="input-field px-4"
      >
        {Array.from(
          { length: daysInMonth(year, month) },
          (_, index) => index + 1,
        ).map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      {/* MONTH */}
      <select
        value={month}
        required={required}
        onChange={(e) => updateDate(year, Number(e.target.value), day)}
        className="input-field px-4"
      >
        {jalaliMonths.map((monthName, index) => (
          <option key={index + 1} value={index + 1}>
            {monthName}
          </option>
        ))}
      </select>

      {/* YEAR */}
      <select
        value={year}
        required={required}
        onChange={(e) => updateDate(Number(e.target.value), month, day)}
        className="input-field px-4"
      >
        {Array.from({ length: 101 }, (_, index) => {
          const yearValue = today.year - 50 + index;

          return (
            <option key={yearValue} value={yearValue}>
              {yearValue}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default JalaliDatePicker;
