import { createContext, useEffect, useState } from 'react';
import { getLocalStorageValue, setLocalStorgeValue } from '../utils/functions/localStorageFunctions';
import { LOCALSTORAGE_KEYS } from '../utils/constants/localStorageKeys';
import { TEMP_CONTACT_DATA } from '../utils/constants/temp_contact_data';
import { blueDark } from '../styles/theme';

export const ContactsListContext = createContext({
	contactsList: null,
	setContactsList: () => {},
});

export const ContactsListProvider = ({ children }) => {
	const [contactsList, setContactsList] = useState(
		getLocalStorageValue(LOCALSTORAGE_KEYS.CONTACTS) || TEMP_CONTACT_DATA
	);

	useEffect(() => {
		setContactsList(
			getLocalStorageValue(LOCALSTORAGE_KEYS.CONTACTS)
		);

		if (!getLocalStorageValue(LOCALSTORAGE_KEYS.CONTACTS)) {
			setLocalStorgeValue(LOCALSTORAGE_KEYS.CONTACTS, TEMP_CONTACT_DATA); // docelowo []
		}
		if (!getLocalStorageValue(LOCALSTORAGE_KEYS.THEME)) {
			setLocalStorgeValue(LOCALSTORAGE_KEYS.THEME, blueDark);
			setLocalStorgeValue(LOCALSTORAGE_KEYS.THEME_NAME, 'blueDark');
		}
	}, []); //[] <= wywola sie przy 1. renderze


	return (
		<ContactsListContext.Provider value={{ contactsList, setContactsList }}>
			{children}
		</ContactsListContext.Provider>
	);
};
