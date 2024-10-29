import { useCallback, useContext } from 'react';
import { debounce } from '../../utils/helpers/debounce.js';
import { InputWrapper, Input } from './SearchInput.styles.js';
import { SearchValueContext } from '../../context/searchValueContext.js';

export function SearchInput() {
	const { searchValue, setSearchValue } = useContext(SearchValueContext);
	const debouncedSetSearchValue = useCallback(
		debounce((e) => setSearchValue(e.target.value)),
		[setSearchValue]
	);
	return (
		<InputWrapper>
			<Input
				defaultValue={searchValue}
				onChange={debouncedSetSearchValue} //debounce nie dziala?
				type='search'
				placeholder='Wyszukaj kontakt'
			/>
		</InputWrapper>
	);
}
