import SearchIcon from '@assets/icon/search.svg';
import { forwardRef } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

export type SearchInputProps = UseFormRegisterReturn<string>;

// ForwardRef is used as this is react-hook-form component and shouldn'r work with referance
const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>((props, ref) => {
  return (
    <div className="max-w-3xl grow">
      <h4 className="text-gray-500 mb-1">Search</h4>
      <div className="h-8 flex justify-between items-center gap-2 px-2 border rounded border-gray-500 bg-white">
        <SearchIcon height={20} width={20} />
        <input
          className="grow focus:outline-none"
          placeholder="Search for topic"
          {...props}
          ref={ref}
        />
      </div>
    </div>
  );
});

export default SearchInput;
