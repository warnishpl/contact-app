import { useContext, memo } from 'react';
import { ReactComponent as AddIcon } from '../../assets/add-icon.svg';
import { Wrapper, Button, ParagraphStyled } from './AddContactButton.styles.js';
import { IsAddContactFormShown } from '../../context/IsAddContactFormShown.js';

export const AddContactButton = memo(function AddContactButton(props) {
	const {handleIsAddContactFormShown} = useContext(IsAddContactFormShown);

	return (
		<Wrapper>
			<Button
				onClick={handleIsAddContactFormShown}
			>
				<AddIcon />
				<ParagraphStyled>Dodaj kontakt</ParagraphStyled>
			</Button>
		</Wrapper>
	);
});
