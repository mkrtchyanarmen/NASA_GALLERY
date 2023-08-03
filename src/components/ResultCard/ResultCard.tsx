import LocationIcon from '@assets/icon/location.svg';
import { FC } from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

import { useDataFromJson } from './hook';

type ResultCardProps = {
  dataHref: string;
};

const ResultCard: FC<ResultCardProps> = ({ dataHref }) => {
  const { ref, inView } = useInView({ rootMargin: '200px', triggerOnce: true });
  const data = useDataFromJson(dataHref, inView);

  return (
    <Link
      ref={ref}
      className="p-4 rounded-md bg-white shadow-2xl cursor-pointer"
      to={`/media/${data?.id}`}
    >
      <h5 className="h-14 text-lg font-medium line-clamp-2 mb-2">{data?.title}</h5>
      <div className="w-full h-56 flex justify-center rounded-sm bg-slate-300 mb-4">
        <img alt="" className="h-full object-cover" src={data?.img.medium} />
      </div>
      <p className="text-base font-medium">Description</p>
      <p className="h-20 text-xs line-clamp-5 mb-4">{data?.tumbnail || data?.description}</p>
      <div className="flex mb-2">
        <LocationIcon className="mr-1 flex-shrink-0" height={16} width={16} />
        <p className="text-xs whitespace-nowrap max-w-full overflow-hidden overflow-ellipsis">
          {data?.location || 'Not mentioned'}
        </p>
      </div>
      {data?.photographer ? (
        <p className="text-xs">Photographer - {data?.photographer}</p>
      ) : (
        <p className="text-xs">There is no photographer</p>
      )}
    </Link>
  );
};

export default ResultCard;
