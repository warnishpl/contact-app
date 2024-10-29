import { createContext, useCallback, useState } from 'react';

export const AddContactFormContext = createContext({
	nameValue: '',
	setNameValue: () => {},
	phoneValue: '',
	setPhoneValue: () => {},
	isDropdownShown: false,
	setIsDropdownShown: () => {},
	prefixValue: '+48',
	setPrefixValue: () => {},
	phoneLengthValue: 9,
	setPhoneLengthValue: () => {},
	imageSrc: null,
	setImageSrc: () => {},
	nameError: false,
	setNameError: () => {},
	phoneError: false,
	setPhoneError: () => {},
	handlerNameValue: () => {},
	handlerPhoneValue: () => {},
	handlerDropdown: () => {},
});

export const AddContactFormProvider = ({ children }) => {
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

	return (
		<AddContactFormContext.Provider
			value={{
				nameValue,
				setNameValue,
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
				setNameError,
				phoneError,
				setPhoneError,
				handlerNameValue,
				handlerPhoneValue,
				handlerDropdown
			}}
		>
			{children}
		</AddContactFormContext.Provider>
	);
};
