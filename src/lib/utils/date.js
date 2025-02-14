const addLeftValue = (value) => (`${value}`.length === 1 ? `0${value}` : value);

export const todayDate = () => {
  const nDate = new Date();
  const day = addLeftValue(nDate.getDate());
  const month = addLeftValue(nDate.getMonth() + 1);
  const year = nDate.getFullYear();
  return `${year}-${month}-${day}`;
};

export const dateParser = (date) => {
  const splitDate = date.split("/");
  const newDate = new Date(`${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`);
  return newDate;
};

export const nowYear = () => {
  const nowDate = new Date();
  return nowDate.getFullYear();
};

export const nowMonth = () => {
  const nowDate = new Date();
  const monthPlus = nowDate.getMonth() + 1;
  return monthPlus <= 9 ? `0${monthPlus}` : monthPlus;
};

export const pastMonthYear = () => {
  const nowDate = new Date();
  const nowMonth = nowDate.getMonth();
  const nowYear = nowDate.getFullYear();

  if (nowMonth === 0) {
    return {
      month: 12,
      year: nowYear - 1,
    };
  } else {
    const newMonth = nowMonth;
    return {
      month: newMonth <= 9 ? `0${newMonth}` : newMonth,
      year: nowYear,
    };
  }
};
