import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import ActionBar from './ActionBar';
import Result from './Result';
import { searchImages, SearchImagesParams } from './utils';

const Home = () => {
  const [searchParams] = useSearchParams();

  // Set search query params as default
  const [params, setParams] = useState<SearchImagesParams>({
    q: searchParams.get('q') || '',
    year_start: searchParams.has('year_start') ? Number(searchParams.get('year_start')) : null,
    year_end: searchParams.has('year_end') ? Number(searchParams.get('year_end')) : null,
  });

  const { data, isFetching } = useQuery({
    queryFn: async () => searchImages(params),
    // Should have all the dinamic data included not to face catching issue
    queryKey: ['search', params.q, params.year_start, params.year_end],
    // Should not send request if the query is empty string
    enabled: params.q.length > 0,
  });

  return (
    <div className="p-8">
      <ActionBar
        onSubmit={(inputParams: SearchImagesParams) => {
          setParams(inputParams);
        }}
      />
      {/* TODO: Add Loading component */}
      {isFetching ? <div>Loading ....</div> : <Result items={data?.collection.items} />}
    </div>
  );
};

export default Home;
