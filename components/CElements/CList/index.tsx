import { useMemo, useState } from "react";
import "./style.scss";
import CModal from "../CModal";
import mergeList from "../../../utils/mergeList";
import { EyeOpenIcon } from "../../UI/Icons";
import { AllRolls } from "./AllRolls";

interface Props {
  list: any;
}

export const CList = ({ list = [] }: Props) => {
  const [modalOpen, setModalOpen]: any = useState({});
  const newList = useMemo(() => {
    const { allObj } = mergeList(list);
    return allObj;
  }, [list]);

  const SummUp = useMemo(() => {
    const obj = {
      quantity: 0,
      weight: 0,
    };
    Object.entries(newList).forEach(([_, item]: any) => {
      for (let i = 0; i < item.length; i++) {
        const newObj = item[i];

        obj.quantity += i;
        obj.weight += Number(newObj.NPROPER2);
      }
    });

    return obj;
  }, [newList]);

  return (
    <>
      <div className="list">
        <div className="header">
          <div className="cell">
            <span>назания полотно</span>
          </div>
          <div className="cell">
            <span>Сорт</span>
          </div>
          <div className="cell">
            <span>Количество</span>
          </div>
          <div className="cell">
            <span>вэс</span>
          </div>
          <div className="cell"></div>
        </div>

        <div className="body">
          {Object.entries(newList).map(([key, item]: any) => (
            <div key={key} className="row" onClick={() => setModalOpen(item)}>
              <div className="cell">
                <p className="font-[600]">{item[0].ART}</p>
                <p className="text-[var(--grey)]">{item[0].NAIM}</p>
              </div>
              <div className="cell">
                <p>{item[0].NSORT}</p>
              </div>
              <div className="cell">
                <p>{item.length}</p>
              </div>
              <div className="cell">
                <p>
                  {parseInt(
                    item.reduce(
                      (acc: any, item: any) => acc + Number(item.KOL),
                      0
                    )
                  )}
                </p>
              </div>
              <div className="cell">
                <div className="flex justify-center">
                  <EyeOpenIcon />
                </div>
              </div>
            </div>
          ))}
          <div className="row">
            <div className="cell">
              <p className="font-[600]  uppercase">итого </p>
            </div>
            <div className="cell"></div>
            <div className="cell">
              <p className="font-[600]">{SummUp.quantity}</p>
            </div>
            <div className="cell">
              <p className="font-[600]">{SummUp.weight}</p>
            </div>
            <div className="cell"></div>
          </div>
        </div>
      </div>

      <CModal
        title="Роллы"
        open={!!modalOpen?.length}
        handleClose={() => setModalOpen(false)}
        footerActive={false}
      >
        <AllRolls list={modalOpen} />
      </CModal>
    </>
  );
};
