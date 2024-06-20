import { createContext, useState } from 'react';

export const IsAddContactFormShown = createContext({
	isAddContactFormShown: false,
	setIsAddContactFormShown: () => {},
	handleIsAddContactFormShown: () => {},
});

export const IsAddContactFormShownProvider = ({ children }) => {
	const [isAddContactFormShown, setIsAddContactFormShown] = useState(false);

	const handleIsAddContactFormShown = () => {
		setIsAddContactFormShown(prev => !prev);
	};
	return (
		<IsAddContactFormShown.Provider
			value={{
				isAddContactFormShown,
				setIsAddContactFormShown,
				handleIsAddContactFormShown,
			}}
		>
			{children}
		</IsAddContactFormShown.Provider>
	);
}; 
