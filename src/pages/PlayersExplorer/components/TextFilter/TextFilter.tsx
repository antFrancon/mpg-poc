import React, { FunctionComponent } from 'react';
import { View, TextInput } from 'react-native';
import {} from 'react-native-gesture-handler';

import styled, { css } from '../../../../lib/styledComponents';

interface TextFilterProps {
  onChange: (inputText: string) => void;
  currentValue?: string;
  placeholder?: string;
}

export const TextFilter: FunctionComponent<TextFilterProps> = ({
  onChange,
  currentValue,
  placeholder,
}) => {
  return (
    <TextInputContainer>
      <TextInput
        value={currentValue}
        onChangeText={onChange}
        placeholder={placeholder}
        editable
        maxLength={40}
      />
    </TextInputContainer>
  );
};

const TextInputContainer = styled(View)`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-radius: 4px;
  width: 150px;
  height: 35px;
  ${({ theme }) => css`
    padding: ${theme.spacing.x1}px;
    margin-horizontal: ${theme.spacing.x1}px;
    background-color: ${theme.colors.white};
    border-color: ${theme.colors.darkGrey};
  `}
`;
