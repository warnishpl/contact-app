import { ContactsListProvider } from './context/contactsListContext.js';
import { IsAscendingProvider } from './context/isAscendingContext.js';
import { IsAddContactFormShownProvider } from './context/IsAddContactFormShown.js';
import { Main } from './views/Main/Main.js';
import { OwnThemeProvider } from './components/OwnThemeProider/OwnThemeProider.js';

function App() {
	return (
		<IsAscendingProvider>
			<IsAddContactFormShownProvider>
				<ContactsListProvider>
					<OwnThemeProvider>
						<Main></Main>
					</OwnThemeProvider>
				</ContactsListProvider>
			</IsAddContactFormShownProvider>
		</IsAscendingProvider>
	);
}

export default App;
