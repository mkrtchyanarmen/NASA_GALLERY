import Button from '@components/Button';
import SearchInput from '@components/SearchInput';
import YearFilter, { YearFilterProps } from '@components/YearFilter';
import { FC, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

import { SearchImagesParams } from '../utils';

export type ActionBarProps = {
  onSubmit: (params: SearchImagesParams) => void;
};

const ActionBar: FC<ActionBarProps> = ({ onSubmit }) => {
  const [params, setSearchParams] = useSearchParams();

  const { register, handleSubmit, setValue, watch } = useForm<{
    endDate: null | number;
    searchText: string;
    startDate: null | number;
  }>({
    // Set search query params as default
    // TODO: structure change because of code duplication (DRY)
    defaultValues: {
      searchText: params.get('q') || '',
      startDate: params.has('year_start') ? Number(params.get('year_start')) : null,
      endDate: params.has('year_end') ? Number(params.get('year_end')) : null,
    },
  });

  // Sync input with react-hook-form
  const { ref: searchRef, ...searchInputProps } = register('searchText');

  const endDate = watch('endDate');
  const startDate = watch('startDate');

  // Memorized to ignore unnessary renders
  const yaerFilterProps: YearFilterProps = useMemo(
    () => ({
      changeEnd: (date) => setValue('endDate', date),
      changeStart: (date) => setValue('startDate', date),
      end: endDate,
      start: startDate,
    }),
    [setValue, endDate, startDate],
  );

  return (
    <form
      className="flex items-end mb-8 gap-3"
      onSubmit={handleSubmit(({ searchText, startDate: year_start, endDate: year_end }) => {
        const queryParams: { q: string; year_end?: string; year_start?: string } = {
          q: searchText,
        };

        // Check param before add as it's optional, not to have null in URL
        if (year_start) {
          queryParams.year_start = String(year_start);
        }

        // Check param before add as it's optional, not to have null in URL
        if (year_end) {
          queryParams.year_end = String(year_end);
        }

        setSearchParams(queryParams);

        onSubmit({ q: searchText, year_end, year_start });
      })}
    >
      <SearchInput {...{ ...searchInputProps }} ref={searchRef} />
      <YearFilter {...yaerFilterProps} />
      <Button text="Search" />
    </form>
  );
};

export default ActionBar;
