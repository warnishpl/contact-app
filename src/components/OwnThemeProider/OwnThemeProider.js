import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { LOCALSTORAGE_KEYS } from '../../utils/constants/localStorageKeys.js';
import { getLocalStorageValue } from '../../utils/functions/localStorageFunctions.js';
import { blueDark } from '../../styles/theme.js';
import { ThemePicker } from '../ThemePicker/ThemePicker.js';
import { SetGlobalStyle } from '../../styles/GlobalStyles.js';

export const OwnThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState(
		getLocalStorageValue(LOCALSTORAGE_KEYS.THEME) || blueDark
	);

	return (
		<ThemeProvider theme={theme}>
			<SetGlobalStyle />
			<ThemePicker setTheme={setTheme} />
			{children}
		</ThemeProvider>
	);
};
