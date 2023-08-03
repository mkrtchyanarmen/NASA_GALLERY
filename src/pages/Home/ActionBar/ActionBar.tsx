import Button from '@components/Button';
import SearchInput from '@components/SearchInput';
import YearFilter, { YearFilterProps } from '@components/YearFilter';
import { FC, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { SearchImagesParams } from '../utils';

export type ActionBarProps = {
  onSubmit: (params: SearchImagesParams) => void;
};

const ActionBar: FC<ActionBarProps> = ({ onSubmit }) => {
  const { register, handleSubmit, setValue, watch } = useForm<{
    endDate: null | number;
    searchText: string;
    startDate: null | number;
  }>({
    defaultValues: { searchText: '', startDate: null, endDate: null },
  });
  const { ref: searchRef, ...searchInputProps } = register('searchText');

  const endDate = watch('endDate');
  const startDate = watch('startDate');
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
      onSubmit={handleSubmit((data) => {
        onSubmit({ q: data.searchText, year_end: data.endDate, year_start: data.startDate });
      })}
    >
      <SearchInput {...{ ...searchInputProps }} ref={searchRef} />
      <YearFilter {...yaerFilterProps} />
      <Button text="Search" />
    </form>
  );
};

export default ActionBar;
