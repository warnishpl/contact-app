import { createContext, useState } from 'react';

export const isAscendingContext = createContext({
	isAscending: false,
	setIsAscending: () => {},
});

export const IsAscendingProvider = ({ children }) => {
	const [isAscending, setIsAscending] = useState(true);

	return (
		<isAscendingContext.Provider value={{ isAscending, setIsAscending }}>
			{children}
		</isAscendingContext.Provider>
	);
};
