export const formatInputMoney = (value: any) => {
  const onlyNumbers = String(value).replace(/,/g, "").replace(/\./g, "");
  const leftZerosRemoved = String(Number(onlyNumbers));
  return leftZerosRemoved
    .padStart(3, "0")
    .replace(/(\d+)(\d{2})/g, "$1,$2")
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
};

export const inputMoneyMask = (event: any) => {
  const value = event.target.value;

  if (!value.toString().match(/^[0-9]/)) {
    event.target.value = "";
    return;
  }

  event.target.value = formatInputMoney(value);
};
