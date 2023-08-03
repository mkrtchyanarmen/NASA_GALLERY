import Hooks from '@hooks';
import { FC, useRef, useState } from 'react';

import { getAvailableEndYears, getAvailableStartYears, OptionType } from './utils';

type FilterDropDownProps = {
  onSelect: (year: number) => void;
  options: OptionType[];
  placeholder: string;
  selected: number | null;
};

// Reusable dropdown for selecting year range
const FilterDropDown: FC<FilterDropDownProps> = ({ options, onSelect, placeholder, selected }) => {
  // For catching outside click
  const dropDownRef = useRef(null);
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);

  // Close dropdown on outside click
  Hooks.useOutSideClick(dropDownRef, () => {
    setIsDropdownOpened(false);
  });

  const handleOpenClose = () => {
    setIsDropdownOpened((prev) => !prev);
  };

  return (
    <div
      ref={dropDownRef}
      className="h-8 w-16 block relative px-2 border rounded border-gray-500 bg-white"
    >
      <button
        className="w-full h-full flex items-center cursor-pointer pr-1"
        onClick={handleOpenClose}
        type="button"
      >
        {selected || placeholder}
      </button>
      {isDropdownOpened && (
        <div className="w-48 h-52w-full flex items-center cursor-pointer min-w-32 bg-white absolute top-10 -right-1/2 border border-solid border-grey-verylight rounded-sm z-20">
          <div className="w-full h-auto">
            <ul className="w-full max-h-52 overflow-y-auto vertical-scrollbar">
              {options.map(({ year }) => (
                <li
                  key={year}
                  className="w-full h-10 border-b hover:bg-slate-400 cursor-pointer pl-3 pr-1 flex items-center"
                  onClick={() => {
                    // Close the dropdown on select
                    setIsDropdownOpened(false);
                    onSelect(year);
                  }}
                >
                  {year}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export type YearFilterProps = {
  changeEnd: (year: number) => void;
  changeStart: (year: number) => void;
  end: number | null;
  start: number | null;
};

const YearFilter: FC<YearFilterProps> = ({ start, end, changeStart, changeEnd }) => {
  const startYears = getAvailableStartYears(start, end);
  const endYears = getAvailableEndYears(start, end);

  return (
    <div>
      <h4 className="text-gray-500 mb-1">Select Date Range</h4>
      <div className="flex gap-4">
        <FilterDropDown
          onSelect={changeStart}
          options={startYears}
          placeholder="Start"
          selected={start}
        />
        <FilterDropDown onSelect={changeEnd} options={endYears} placeholder="End" selected={end} />
      </div>
    </div>
  );
};

export default YearFilter;
