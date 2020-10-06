import RNModal from 'react-native-modal';
import React, { FunctionComponent } from 'react';
import SafeAreaView from 'react-native-safe-area-view';

import styled from '../../lib/styledComponents';

interface IModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export const Modal: FunctionComponent<IModalProps> = ({ isVisible, onClose, children }) => (
  <FullScreenModal
    isVisible={isVisible}
    useNativeDriver
    onBackButtonPress={onClose}
    onBackdropPress={onClose}
    hideModalContentWhileAnimating>
    <SafeAreaViewContainer>{children}</SafeAreaViewContainer>
  </FullScreenModal>
);

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
const FullScreenModal = styled(RNModal)`
  margin: 0px;
`;

const SafeAreaViewContainer = styled(SafeAreaView)`
  flex: 1;
  justify-content: center;
`;
