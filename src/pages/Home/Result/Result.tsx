import ResultCard from '@components/ResultCard';
import { FC } from 'react';

import { ItemType } from '../utils';

type ResultProps = {
  items?: ItemType[];
};
const Result: FC<ResultProps> = ({ items }) => {
  if (items?.length === 0) {
    // TODO: move to component
    return <div>No Data found</div>;
  }

  return (
    <div className="w-full grid grid-cols-auto-60 gap-2">
      {items?.map(({ data, href }) => (
        <ResultCard key={data[0].nasa_id} dataHref={href} />
      ))}
    </div>
  );
};

export default Result;
