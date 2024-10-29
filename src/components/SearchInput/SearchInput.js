import { useContext } from 'react';
import { debounce } from '../../utils/helpers/debounce.js';
import { InputWrapper, Input } from './SearchInput.styles.js';
import { SearchValueContext } from '../../context/searchValueContext.js';

export function SearchInput() {
	const { searchValue, setSearchValue } = useContext(SearchValueContext);
	return (
		<InputWrapper>
			<Input
				defaultValue={searchValue}
				onChange={(e) => debounce(setSearchValue(e.target.value))} //debounce nie dziala?
				type='search'
				placeholder='Wyszukaj kontakt'
			/>
		</InputWrapper>
	);
}
