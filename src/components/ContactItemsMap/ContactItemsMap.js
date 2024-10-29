import { useContext } from 'react';
import { ContactItem } from '../ContactItem/ContactItem';
import { ContactsWrapper } from './ContactItemsMap.styles.js';
import { ContactsListContext } from '../../context/contactsListContext.js';
import { isAscendingContext } from '../../context/isAscendingContext.js';
import { SearchValueContext } from '../../context/searchValueContext.js';

export function ContactItemsMap() {
	const { searchValue } = useContext(SearchValueContext);
	const isAscendingContextValue = useContext(isAscendingContext);
	const ContactsListContextValue = useContext(ContactsListContext);
	const lowerCaseSearchValue = searchValue.toLowerCase();
	const filteredContactsList = ContactsListContextValue.contactsList.filter(
		(contact) =>
			contact.name.toLowerCase().includes(lowerCaseSearchValue) ||
			contact.phone.includes(searchValue)
	);
	const sortedContactsList = filteredContactsList.sort((a, b) => {
		if (a.name.toLowerCase() < b.name.toLowerCase()) {
			return isAscendingContextValue.isAscending ? -1 : 1;
		}
		if (a.name.toLowerCase() > b.name.toLowerCase()) {
			return isAscendingContextValue.isAscending ? 1 : -1;
		}
		return 0;
	});

	return (
		<ContactsWrapper>
			{sortedContactsList.map((element) => (
				<ContactItem personalData={element} key={element.id} />
			))}
		</ContactsWrapper>
	);
}
