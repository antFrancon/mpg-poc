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
  placeholder?: string;
  onReset?: () => void;
}

export const OptionPicker = <T,>({
  options,
  onChange,
  selectedKey,
  placeholder,
  onReset,
}: OptionPickerProps<T>) => {
  return (
    <PickerContainer>
      <Picker<PickerOption<T>>
        data={options}
        // TODO: Patch 'react-native-modal-selector' to allow genericity for prop 'selectedKey'
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        selectedKey={selectedKey}
        initValue={placeholder}
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
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  border-width: 1px;
  border-radius: 4px;
  height: 35px;
  ${({ theme }) => css`
    padding: ${theme.spacing.x1}px;
    margin-horizontal: ${theme.spacing.x1}px;
    background-color: ${theme.colors.white};
    border-color: ${theme.colors.darkGrey};
  `}
`;

const Picker = (styled(ModalSelector).attrs({
  selectStyle: { borderWidth: 0, padding: 0 },
})`` as React.ComponentType) as new <T>() => ModalSelector<T>;

const ResetButton = styled(TouchableOpacity)`
  align-items: center;
  justify-content: center;
  height: 35px;
  width: 35px;
  ${({ theme }) => css`
    padding: ${theme.spacing.x1}px;
    margin-top: ${-theme.spacing.x1}px;
  `}
`;

const Label = styled(Text).attrs({
  type: TextType.SmallButton,
})`
  justify-content: center;
`;
