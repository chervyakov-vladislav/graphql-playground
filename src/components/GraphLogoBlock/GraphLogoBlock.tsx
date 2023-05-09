import GraphLogo from '../ui/GraphLogo/GraphLogo';

type Props = {
  children: JSX.Element;
};

function GraphLogoBlock({ children }: Props) {
  return (
    <div
      className={
        'bg-color-light-gray rounded-xl w-[30%] min-h-[480px] min-w-[450px] max-w-[450px] pt-[15px] max-[500px]:min-w-[90%]'
      }
    >
      <div className={'pl-[3.7%] pr-[3.7%] text-color-bright-black text-center'}>
        <div className={'flex justify-center items-center h-[50px] mt-12 mb-11'}>
          <span className={'w-[44px] h-[50px] mr-[23px]'}>
            <GraphLogo id={'test'} className={'fill-color-purple'} viewBox={'0.92 0 31.5 35'} />
          </span>
          <p className={'font-SourceSansPro font-semibold text-3xl text-color-purple'}>GraphQL</p>
        </div>
        {children}
      </div>
    </div>
  );
}

export default GraphLogoBlock;
