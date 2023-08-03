// TODO: add comments

// Can be changed, config for min
const startYear = 1990;
const date = new Date();
// Current year
const thisYear = date.getFullYear();

export type OptionType = { isSelected: boolean; year: number };

export const getAvailableStartYears = (start: number | null, end: number | null) => {
  // Max is either this year or already selected end (validation)
  const maxYear = end || thisYear;
  const options: OptionType[] = [];

  for (let year = startYear; year <= maxYear; year++) {
    // To highlight already slected option
    const isSelected = year === start;

    options.push({ isSelected, year });
  }

  return options;
};
export const getAvailableEndYears = (start: number | null, end: number | null) => {
  const minYear = start || startYear;
  const options: OptionType[] = [];

  for (let year = minYear; year <= thisYear; year++) {
    const isSelected = year === end;

    options.push({ isSelected, year });
  }

  return options;
};
