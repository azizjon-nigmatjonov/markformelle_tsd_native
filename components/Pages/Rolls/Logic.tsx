import axios from "axios";
import { Alert } from "react-native";

interface Props {
  value: string;
  rolls: any;
  docId: undefined | string;
  rollObjects: any;
  setRolls: (val: any) => void;
  setRollObjects: (val: any) => void;
  setAlertInfo: (val: any) => void;
  clearFn: () => void;
  setLoading: (val: boolean) => void;
}

interface FetchFunctionProps {
  setRollObjects: (val: any) => void;
  setAlertInfo: (val: any) => void;
  clearFn: () => void;
  rollObjects: any;
  value: string;
  docId: any;
}

const GetRollFromBack = ({
  setAlertInfo,
  setRollObjects,
  clearFn,
  rollObjects,
  value,
  docId,
}: FetchFunctionProps) => {
  axios
    .get(`https://api-generator.retool.com/IIKMks/data?BARCODE=${value}`)
    .then((res: any) => {
      if (res?.data?.[0]) {
        const arrObjects = [...rollObjects];
        arrObjects.push({ ...res.data[0], documentId: docId });
        setRollObjects(arrObjects);

        setAlertInfo({
          type: "success",
          title: "Сканированный рулон" + " " + value,
        });
      }
    })
    .catch((err) => {
      setAlertInfo({
        title: "Произошла ошибка при извлечении данных с Сервера!" + err,
        type: "error",
      });
    })
    .finally(() => {
      clearFn();
    });
};

const LogicData = ({ value }: { value: string }) => {
  const Data = {
    KNA: {
      scanned_roll: {
        type: "error",
        title: `${value} штрихкод уже отсканирован!`,
      },
      not_roll_code: {
        type: "error",
        title: "Это не штрихкод рулона, попробуйте еще раз!",
      },
      not_scanned_before: {
        type: "error",
        title: "Этот рулон раньше не сканировался!",
      },
      roll_deleted: {
        type: "success",
        title: "Рулон успешно удален!",
      },
    },
  };

  return Data;
};

export const ScanLogic = () => {
  const prefix = "KNA";

  const ScanRoll = ({
    value,
    rolls,
    setAlertInfo,
    setRollObjects,
    setRolls,
    rollObjects,
    docId,
    clearFn,
    setLoading,
  }: Props) => {
    const arr: any = [...rolls];
    if (!value.includes(prefix)) value = prefix + value;
    const alertObj = LogicData({ value });

    if (value.startsWith(prefix)) {
      setRolls(arr);
      if (rolls.includes(value)) {
        setAlertInfo(alertObj[prefix].scanned_roll);
        clearFn();
      } else {
        arr.push(value);
        setLoading(true);
        GetRollFromBack({
          setAlertInfo,
          setRollObjects,
          rollObjects,
          clearFn,
          docId,
          value,
        });
      }
    } else {
      setAlertInfo(alertObj[prefix].not_roll_code);
      clearFn();
    }
  };

  const DeleteRoll = ({
    value,
    rolls,
    setAlertInfo,
    setRollObjects,
    setRolls,
    rollObjects,
    clearFn,
  }: Props) => {
    let arr: any = [...rolls];
    if (!value.includes(prefix)) value = prefix + value;
    const alertObj = LogicData({ value });
    if (value.startsWith(prefix)) {
      if (!rolls.includes(value)) {
        setAlertInfo(alertObj[prefix].not_scanned_before);
      } else {
        arr = arr.filter((item: any) => item !== value);
        let arrObjects = [...rollObjects];
        arrObjects = arrObjects.filter((item: any) => item.BARCODE !== value);

        setRollObjects(arrObjects);
        setRolls(arr);

        setAlertInfo(alertObj[prefix].roll_deleted);
      }
      clearFn();
    }
  };

  return { ScanRoll, DeleteRoll };
};
