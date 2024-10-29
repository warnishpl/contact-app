import { useCallback, useContext, useRef } from 'react';
import { AddContactFormContext } from '../../context/AddContactFormContext';
import { LOCALSTORAGE_KEYS } from '../../utils/constants/localStorageKeys';
import { setLocalStorgeValue } from '../../utils/functions/localStorageFunctions';
import defaultAvatar from '../../assets/default_avatar_black.jpg';
import { sizes } from '../../styles/media.js';
import { ContactsListContext } from '../../context/contactsListContext.js';
import { IsAddContactFormShown } from '../../context/IsAddContactFormShown.js';

export function useAddContactForm() {
	const inputRef = useRef(null);
	const { setContactsList } = useContext(ContactsListContext);
	const { handleIsAddContactFormShown } = useContext(IsAddContactFormShown);
	const {
		nameValue,
		setNameValue,
		phoneValue,
		setPhoneValue,
		prefixValue,
		setPrefixValue,
		phoneLengthValue,
		setPhoneLengthValue,
		imageSrc,
		setImageSrc,
		setNameError,
		setPhoneError,
		handlerNameValue,
		handlerPhoneValue,
		handlerDropdown,
	} = useContext(AddContactFormContext);

	const handleFileChange = useCallback(
		(event) => {
			const file = event.target.files[0];
			if (file) {
				const reader = new FileReader();

				reader.onload = (e) => {
					setImageSrc(e.target.result); // Ustaw stan z wczytanymi danymi pliku
				};

				reader.readAsDataURL(file); // Wczytaj plik jako URL
			}
		},
		[setImageSrc]
	);

	const handleAddAvatarIconClick = useCallback(() => {
		inputRef.current.click();
	}, []);
	const resetValues = useCallback(() => {
		setNameValue('');
		setPhoneValue('');
		setPrefixValue('+48');
		setPhoneLengthValue(9);
		setImageSrc(null);
		setNameError(false);
		setPhoneError(false);
		if (window.innerWidth <= sizes.lg) handleIsAddContactFormShown(false);
	}, [
		setNameValue,
		setPhoneValue,
		setPrefixValue,
		setPhoneLengthValue,
		setImageSrc,
		setNameError,
		setPhoneError,
		handleIsAddContactFormShown,
	]);

	const addNewContact = useCallback(() => {
		setContactsList((prev) => {
			const updatedContactsList = [
				{
					id: crypto.randomUUID(),
					name: nameValue,
					prefix: prefixValue,
					phone: phoneValue,
					picture: imageSrc || defaultAvatar,
				},
				...prev,
			];
			setLocalStorgeValue(LOCALSTORAGE_KEYS.CONTACTS, updatedContactsList);
			resetValues(); //reset
			return updatedContactsList;
		});
	}, [
		imageSrc,
		nameValue,
		phoneValue,
		prefixValue,
		resetValues,
		setContactsList,
	]);

	const validateForm = useCallback(() => {
		const reg = new RegExp(`^[0-9+]{${phoneLengthValue}}$`);
		if (nameValue === '') {
			setNameError(true);
			setTimeout(() => {
				setNameError(false);
			}, 1000);
			return;
		} else if (!reg.test(phoneValue)) {
			setPhoneError(true);
			setTimeout(() => {
				setPhoneError(false);
			}, 1000);
			return;
		} else addNewContact();
	}, [
		addNewContact,
		nameValue,
		phoneLengthValue,
		phoneValue,
		setNameError,
		setPhoneError,
	]);

	return [
		handleFileChange,
		handlerNameValue,
		handlerPhoneValue,
		handlerDropdown,
		handleAddAvatarIconClick,
		resetValues,
		addNewContact,
		validateForm,
		inputRef,
	];
}
