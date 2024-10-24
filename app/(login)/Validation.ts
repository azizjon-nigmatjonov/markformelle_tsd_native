import * as yup from "yup";

export const Validation = () => {
  return yup.object().shape({
    login: yup.string().required("Обязательное поле"), // "Required field" in Russian
  });
};
