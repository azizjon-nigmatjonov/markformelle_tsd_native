import cls from "./style.module.scss";

export const AllRolls = ({ list = [] }: any) => {
  const HeadColumns = [
    {
      title: "Naim",
      id: "NAIM",
      width: 195,
    },
    {
      title: "MODEL",
      id: "MODEL",
    },
    {
      title: "ART",
      id: "ART",
    },
    {
      title: "NSORT",
      id: "NSORT",
    },
    {
      title: "KEDIZM",
      id: "KEDIZM",
    },
    {
      title: "KOL",
      id: "KOL",
    },
    {
      title: "NPROPER1",
      id: "NPROPER1",
      width: 150,
    },
    {
      title: "NPROPER2",
      id: "NPROPER2",
    },
    {
      title: "NPROPER3",
      id: "NPROPER3",
      width: 250,
    },
  ];

  return (
    <div className="border border-[var(--border)] rounded-lg overflow-scroll max-h-[60vh] remove-scroll">
      <ul className={`${cls.list} ${cls.header}`}>
        {HeadColumns.map((headCol: any) => (
          <li
            key={headCol.id}
            style={{ minWidth: headCol?.width || "100px" }}
            className="py-2 px-2 whitespace-nowrap"
          >
            <h2>{headCol.title}</h2>
          </li>
        ))}
      </ul>
      {list.map((item: any, index: number) => (
        <ul id="resizeMe" key={index} className={`${cls.body} ${cls.list}`}>
          {HeadColumns.map((headCol: any, ind: number) => (
            <li
              key={ind}
              style={{ minWidth: headCol?.width || "100px" }}
              className="py-2 px-2 whitespace-nowrap"
            >
              <p>{item[headCol.id]}</p>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
};
