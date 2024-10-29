import {
	AddContactBox,
	AddContactFormWrapper,
	Background,
	Header,
	IconWrapper,
	ImagePreview,
	ImgInput,
	NameInputField,
	PhoneInputWrapper,
	PrefixList,
	PhoneInputField,
	InputTitle,
	InputsWrapper,
	ImageWrapper,
	ChevronStyled,
	AvatarSign,
	DeleteAvatarIconStyled,
	AddAvatarIconStyled,
	RedP,
} from '../AddContactForm/AddContactForm.styles.js';
import { ReactComponent as BackIcon } from '../../assets/arrow-left.svg';
import { SaveButton } from '../SaveButton/SaveButton';
import { CountryDropdownMenu } from '../CountryDropdownMenu/CountryDropdownMenu.js';
import { IsAddContactFormShown } from '../../context/IsAddContactFormShown.js';
import { useAddContactForm } from './useAddContactform.js';
import { useContext } from 'react';

export function AddContactForm() {
	const { handleIsAddContactFormShown } = useContext(IsAddContactFormShown);
	const {
		handleFileChange,
		handlerNameValue,
		handlerPhoneValue,
		handlerDropdown,
		handleAddAvatarIconClick,
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
	} = useAddContactForm();
	// TODO: dane z forumlarza wyciągać po kliknięciu przycisku

	return (
		<>
			<Background onClick={handleIsAddContactFormShown}></Background>
			<AddContactFormWrapper>
				<AddContactBox>
					<Header>
						<IconWrapper>
							<BackIcon onClick={handleIsAddContactFormShown} />
						</IconWrapper>
						<p>Dodaj kontakt</p>
					</Header>
					<InputsWrapper>
						<ImageWrapper>
							<ImagePreview $imageSrc={imageSrc}></ImagePreview>
							<ImgInput
								ref={inputRef}
								type='file'
								accept='image/*'
								onChange={handleFileChange}
							></ImgInput>
						</ImageWrapper>
						<AvatarSign as='button'>
							{!imageSrc ? (
								<AddAvatarIconStyled onClick={handleAddAvatarIconClick} />
							) : (
								<DeleteAvatarIconStyled onClick={() => setImageSrc(null)} />
							)}
						</AvatarSign>
						<InputTitle>
							<p>Nazwa</p>
							{nameError && <RedP>Wprowadź nazwe</RedP>}
						</InputTitle>
						<NameInputField
							name=''
							value={nameValue}
							onChange={handlerNameValue}
							placeholder={`Wprowadz nazwe kontaktu`}
						></NameInputField>
						<InputTitle>
							<p>Numer telefonu</p>
							{phoneError && <RedP>Błędny numer telefonu</RedP>}
						</InputTitle>
						<PhoneInputWrapper $isDropdownShown={isDropdownShown}>
							<PrefixList onClick={handlerDropdown}>
								<p>{prefixValue}</p>
								<ChevronStyled $isDropdownShown={isDropdownShown} />
							</PrefixList>
							<PhoneInputField
								value={phoneValue}
								onChange={handlerPhoneValue}
								placeholder={`Wprowadz ${phoneLengthValue}-cyfrowy numer`}
							></PhoneInputField>
							{isDropdownShown && (
								<CountryDropdownMenu
									setPhoneLengthValue={setPhoneLengthValue}
									setPrefixValue={setPrefixValue}
									setIsDropdownShown={setIsDropdownShown}
									setPhoneValue={setPhoneValue}
								></CountryDropdownMenu>
							)}
						</PhoneInputWrapper>
					</InputsWrapper>

					<SaveButton type='submit' onClick={validateForm}></SaveButton>
				</AddContactBox>
			</AddContactFormWrapper>
		</>
	);
}
