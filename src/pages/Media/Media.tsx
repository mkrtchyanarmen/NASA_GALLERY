import LocationIcon from '@assets/icon/location.svg';
import { useQuery } from '@tanstack/react-query';
import Utils from '@utils';
import { useParams } from 'react-router-dom';

const Media = () => {
  const { nasa_id } = useParams<{ nasa_id: string }>();

  const handleGoBack = () => {
    // TODO: change history back
    // eslint-disable-next-line no-restricted-globals
    history.back();
  };
  // Here we will get all the metadata and album images
  const { data, isLoading } = useQuery({
    queryFn: async () => Utils.getMetadataAndImage(nasa_id || ''),
    enabled: !!nasa_id,
    queryKey: ['metadata-album', nasa_id],
  });

  if (isLoading) {
    // TODO: create a loading component
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 sm:p-8">
      <button onClick={handleGoBack}>{'< Back to Search'}</button>
      <div className="flex flex-col items-center">
        <h5 className="text-lg font-medium mb-2 text-center">{data?.title}</h5>
        <p className="h-20 text-xs mb-4 max-w-2xl text-center">{data?.description}</p>
        <div className="max-w-2xl">
          <img alt="" className="w-full h-full object-cover" src={data?.img.medium} />
        </div>
        <div>Date-{data?.date}</div>
        {data?.photographer ? (
          <p className="text-base">Photographer - {data?.photographer}</p>
        ) : (
          <p className="text-base">There is no photographer</p>
        )}
        <div className="flex mb-2">
          <LocationIcon className="mr-1 flex-shrink-0" height={16} width={16} />
          <p className="text-xs whitespace-nowrap max-w-full overflow-hidden overflow-ellipsis">
            {data?.location || 'Not mentioned'}
          </p>
        </div>
        {data?.keywords && data?.keywords.length > 0 ? (
          <p className="text-base">keywords - {data?.keywords.join(',')}</p>
        ) : (
          <p className="text-base">There is no Keywords</p>
        )}
      </div>
    </div>
  );
};

export default Media;
