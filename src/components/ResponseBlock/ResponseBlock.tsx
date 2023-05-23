import { ResponseHeader } from '@/components/ResponseHeader/ResponseHeader';
import { Response } from '@/components/Response/Response';

export function ResponseBlock() {
  return (
    <div className="flex mt-[8px]">
      <div className="p-8 grow text-black font-SourceSansPro">
        <ResponseHeader />
        <Response />
      </div>
    </div>
  );
}
