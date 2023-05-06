interface IItem {
  header: string;
  codeBlock: JSX.Element;
}

interface IProps {
  items: IItem[];
  classes?: string;
}

export const MainCodeBlock = (props: IProps) => {
  return (
    <div
      className={
        'bg-color-dark-purple rounded-xl w-[30%] min-h-[480px] min-w-[450px] pt-[15px] max-w-[450px] ' +
        props.classes
      }
    >
      <div className={'pl-[9%] pr-[9%] text-white'}>
        {props.items.map((item) => {
          return (
            <div key={item.header}>
              <h2 className={'font-SourceSansPro font-semibold mb-[54px] text-[20px] text-center'}>
                {item.header}
              </h2>
              {item.codeBlock}
            </div>
          );
        })}
      </div>
    </div>
  );
};
