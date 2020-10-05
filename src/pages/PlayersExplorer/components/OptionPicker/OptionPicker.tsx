import React from 'react';
import { View } from 'react-native';
import ModalSelector from 'react-native-modal-selector';

import styled, { css } from '../../../../lib/styledComponents';

interface PickerOption<T> {
  key: T;
  label: string;
}

interface OptionPickerProps<T> {
  options: PickerOption<T>[];
  selectedKey: T;
  onChange: (option: PickerOption<T>) => void;
}

export const OptionPicker = <T,>({ options, selectedKey, onChange }: OptionPickerProps<T>) => {
  return (
    <PickerContainer>
      <ModalSelector<PickerOption<T>>
        data={options}
        // TODO: Patch 'react-native-modal-selector' to allow genericity for prop 'selectedKey'
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        selectedKey={selectedKey}
        onChange={onChange}
      />
    </PickerContainer>
  );
};

const PickerContainer = styled(View)`
  justify-content: center;
  align-items: center;
  ${({ theme }) => css`
    padding: ${theme.spacing.x1}px;
    background-color: ${theme.colors.white};
    border-color: ${theme.colors.darkGrey};
  `}
`;
