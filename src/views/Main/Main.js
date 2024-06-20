import { useContext, useState } from 'react';
import { MainBox } from './Main.style.js';
import { AddContactButton } from '../../components/AddContactButton/AddContactButton.js';
import { ContactsHeader } from '../../components/ContactsHeader/ContactsHeader.js';
import { SearchInput } from '../../components/SearchInput/SearchInput.js';
import { ContactItemsMap } from '../../components/ContactItemsMap/ContactItemsMap.js';
import { AddContactForm } from '../../components/AddContactForm/AddContactForm.js';
import { debounce } from '../../utils/helpers/debounce.js';
import { IsAddContactFormShown } from '../../context/IsAddContactFormShown.js';

export function Main() {
	const [searchValue, setSearchValue] = useState('');
	const { isAddContactFormShown } = useContext(IsAddContactFormShown);

	return (
		<MainBox>
			<SearchInput
				searchValue={searchValue}
				setSearchValue={debounce(setSearchValue)}
			/>
			<AddContactButton />
			<ContactsHeader />
			<ContactItemsMap searchValue={searchValue} />
			{isAddContactFormShown && <AddContactForm />}
		</MainBox>
	);
}
