import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import ModalSelector from 'react-native-modal-selector';

import { Text } from '../../../../components';
import styled, { css } from '../../../../lib/styledComponents';
import { TextType } from '../../../../theme/properties';

interface PickerOption<T> {
  key: T;
  label: string;
}

interface OptionPickerProps<T> {
  options: PickerOption<T>[];
  onChange: (option: PickerOption<T>) => void;
  selectedKey?: T;
  initValue?: string;
  onReset?: () => void;
}

export const OptionPicker = <T,>({
  options,
  onChange,
  selectedKey,
  initValue,
  onReset,
}: OptionPickerProps<T>) => {
  return (
    <PickerContainer>
      <ModalSelector<PickerOption<T>>
        data={options}
        // TODO: Patch 'react-native-modal-selector' to allow genericity for prop 'selectedKey'
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        selectedKey={selectedKey}
        initValue={initValue}
        onChange={onChange}
      />
      {onReset && selectedKey && (
        <ResetButton onPress={onReset}>
          <Label>{'❌'}</Label>
        </ResetButton>
      )}
    </PickerContainer>
  );
};

const PickerContainer = styled(View)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  ${({ theme }) => css`
    padding: ${theme.spacing.x1}px;
    background-color: ${theme.colors.white};
    border-color: ${theme.colors.darkGrey};
  `}
`;

const ResetButton = styled(TouchableOpacity)`
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
`;

const Label = styled(Text).attrs({
  type: TextType.SmallButton,
})`
  justify-content: center;
`;
