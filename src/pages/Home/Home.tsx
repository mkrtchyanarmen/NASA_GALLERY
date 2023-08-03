import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import ActionBar from './ActionBar';
import Result from './Result';
import { searchImages, SearchImagesParams } from './utils';

const Home = () => {
  const [params, setParams] = useState<SearchImagesParams>({
    q: '',
    year_start: null,
    year_end: null,
  });

  const { data, isFetching } = useQuery({
    queryFn: async () => searchImages(params),
    queryKey: ['search', params.q, params.year_start, params.year_end],
    enabled: params.q.length > 0,
  });

  return (
    <div className="p-8">
      <ActionBar
        onSubmit={(inputParams: SearchImagesParams) => {
          console.log('aaa', inputParams);
          setParams(inputParams);
        }}
      />
      {isFetching ? <div>Loading ....</div> : <Result items={data?.collection.items} />}
    </div>
  );
};

export default Home;
