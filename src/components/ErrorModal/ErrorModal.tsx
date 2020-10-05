import React, { FunctionComponent } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

import { ErrorName, ErrorsActions, isInErrorSelectorFactory } from '../../modules';
import { useDispatchCallback } from '../../services';
import { Modal } from '../Modal';
import { Button } from '../Button';
import { Text } from '../Text';
import { I18n } from '../../lib';
import styled, { css } from '../../lib/styledComponents';
import { TextType } from '../../theme/properties';

export const ErrorModal: FunctionComponent = () => {
  const hideServerError = useDispatchCallback(() =>
    ErrorsActions.hideError(ErrorName.InternalServerError)
  );

  const isErrorModalVisible = useSelector(isInErrorSelectorFactory(ErrorName.InternalServerError));

  return (
    <Modal isVisible={!!isErrorModalVisible} onClose={hideServerError}>
      <ModalContentContainer>
        <ModalContent>
          <ModalTitle type={TextType.Title}>{I18n.t('GeneralErrors.errorTitle')}</ModalTitle>
          <ParagraphTextA type={TextType.Body}>{I18n.t('GeneralErrors.retry')}</ParagraphTextA>
          <ParagraphTextB type={TextType.Body}>
            {I18n.t('GeneralErrors.internalServerErrorMessage')}
          </ParagraphTextB>
          <Button text={I18n.t('GeneralErrors.modalOkButton')} onPress={hideServerError} />
        </ModalContent>
      </ModalContentContainer>
    </Modal>
  );
};

const ModalContent = styled(View)`
  justify-content: center;
  ${({ theme }) => css`
    background-color: ${theme.colors.white};
    margin-horizontal: ${theme.spacing.x2};
    padding: ${theme.spacing.x3}px;
  `}
  border-radius: 8;
`;

const ModalTitle = styled(Text)`
  margin-bottom: ${({ theme }): number => theme.spacing.x4};
`;

const ModalContentContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ParagraphTextA = styled(Text)`
  padding-bottom: ${({ theme }): number => theme.spacing.x1};
`;

const ParagraphTextB = styled(Text)`
  padding-bottom: ${({ theme }): number => theme.spacing.x3};
`;
