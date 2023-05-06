export const MainCodeRequest = () => {
  return (
    <pre
      className={'font-SourceSansPro font-normal text-[14px] leading-5 tracking-wider pb-[15px]'}
    >
      <div>
        <span className={'text-color-text-bright-red'}>query</span>{' '}
        <span className={'text-color-text-red'}>TeamInfo</span>(
        <span className={'text-color-text-orange'}>$team:</span>{' '}
        <span className={'text-color-text-green'}>String</span>) &#123;
      </div>
      <div>
        &nbsp;&nbsp;&nbsp;&nbsp;teamMembers(team:{' '}
        <span className={'text-color-text-orange'}>$team:</span>) &#123;
      </div>
      <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name</div>
      <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;github_nickname</div>
      <div>&nbsp;&nbsp;&nbsp;&nbsp;&#125;</div>
      <div>&#125;</div>
    </pre>
  );
};
