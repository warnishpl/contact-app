import { useContext } from 'react';
import { MainBox } from './Main.style.js';
import { AddContactButton } from '../../components/AddContactButton/AddContactButton.js';
import { ContactsHeader } from '../../components/ContactsHeader/ContactsHeader.js';
import { SearchInput } from '../../components/SearchInput/SearchInput.js';
import { ContactItemsMap } from '../../components/ContactItemsMap/ContactItemsMap.js';
import { AddContactForm } from '../../components/AddContactForm/AddContactForm.js';
import { IsAddContactFormShown } from '../../context/IsAddContactFormShown.js';
import { SearchValueProvider } from '../../context/searchValueContext.js';

export function Main() {
	const { isAddContactFormShown } = useContext(IsAddContactFormShown);

	return (
		<MainBox>
			<SearchValueProvider>
				<SearchInput />
				<AddContactButton />
				<ContactsHeader />
				<ContactItemsMap />
				{isAddContactFormShown && <AddContactForm />}
			</SearchValueProvider>
		</MainBox>
	);
}
