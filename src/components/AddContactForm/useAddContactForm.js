import { useCallback, useContext, useRef, useState } from 'react';
import { LOCALSTORAGE_KEYS } from '../../utils/constants/localStorageKeys.js';
import { setLocalStorgeValue } from '../../utils/functions/localStorageFunctions.js';
import defaultAvatar from '../../assets/default_avatar_black.jpg';
import { sizes } from '../../styles/media.js';
import { ContactsListContext } from '../../context/contactsListContext.js';
import { IsAddContactFormShown } from '../../context/IsAddContactFormShown.js';

export function useAddContactForm() {
	const inputRef = useRef(null);
	const { setContactsList } = useContext(ContactsListContext);
	const { handleIsAddContactFormShown } = useContext(IsAddContactFormShown);
	const [nameValue, setNameValue] = useState('');
	const [phoneValue, setPhoneValue] = useState('');
	const [isDropdownShown, setIsDropdownShown] = useState(false);
	const [prefixValue, setPrefixValue] = useState('+48');
	const [phoneLengthValue, setPhoneLengthValue] = useState(9);
	const [imageSrc, setImageSrc] = useState(null);
	const [nameError, setNameError] = useState(false);
	const [phoneError, setPhoneError] = useState(false);
	const handlerNameValue = useCallback(
		(event) => setNameValue(event.target.value),
		[setNameValue]
	);
	const handlerPhoneValue = useCallback(
		(event) => setPhoneValue(event.target.value),
		[setPhoneValue]
	);
	const handlerDropdown = useCallback(
		() => setIsDropdownShown((prev) => !prev),
		[setIsDropdownShown]
	);

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
		console.log('addNewContact');
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

	return {
		handleFileChange,
		handlerNameValue,
		handlerPhoneValue,
		handlerDropdown,
		handleAddAvatarIconClick,
		resetValues,
		validateForm,
		inputRef,
		nameValue,
		phoneValue,
		setPhoneValue,
		isDropdownShown,
		setIsDropdownShown,
		prefixValue,
		setPrefixValue,
		phoneLengthValue,
		setPhoneLengthValue,
		imageSrc,
		setImageSrc,
		nameError,
		phoneError,
	};
}
