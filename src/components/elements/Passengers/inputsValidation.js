import moment from "moment";

const dateValidation = (date) => {
  const dateReg = /^\d{2}[./]\d{2}[./]\d{2}$/;
  if (date.match(dateReg) && moment(date, "DD/MM/YYYY").isValid()) {
    return true;
  }
  return false;
};

const passportSeriesValidation = (series) => {
  const seriesReg = /^\d{4}$/;
  if (series.match(seriesReg)) {
    return true;
  }
  return false;
};

const passportNumberValidation = (number) => {
  const numberReg = /^\d{6}$/;
  if (number.match(numberReg)) {
    return true;
  }
  return false;
};

const certificateValidation = (number) => {
  const numberReg = /^((?=[IVX])(X{0,3}I{0,3}|X{0,2}VI{0,3}|X{0,2}I?[VX]))[ -]?[А-Я]{2}[ -]?[0-9]{6}$/;
  if (number.match(numberReg)) {
    return true;
  }
  return false;
};

const inputsValidation = (array) => {
  const result = {
    surname: true,
    name: true,
    middle_name: true,
    birth_date: true,
    passport_series: true,
    passport_number: true,
    sertificate_number: true,
  };

  for (let item in array) {
    if (array[item] === "") {
      if (
        array[item] === "" &&
        array.document_type === "sertificate" &&
        (item === "passport_series" || item === "passport_number")
      ) {
        result[item] = true;
      } else if (
        array[item] === "" &&
        array.document_type === "passport" &&
        item === "sertificate_number"
      ) {
        result[item] = true;
      } else {
        result[item] = null;
      }
    } else {
      if (item === "birth_date" && !dateValidation(array[item])) {
        result[item] = false;
      }
      if (
        array.document_type === "passport" &&
        item === "passport_series" &&
        !passportSeriesValidation(array[item])
      ) {
        result[item] = false;
      }
      if (
        array.document_type === "passport" &&
        item === "passport_number" &&
        !passportNumberValidation(array[item])
      ) {
        result[item] = false;
      }
      if (
        array.document_type === "sertificate" &&
        item === "sertificate_number" &&
        !certificateValidation(array[item])
      ) {
        result[item] = false;
      }
    }
  }
  return result;
};

export default inputsValidation;
