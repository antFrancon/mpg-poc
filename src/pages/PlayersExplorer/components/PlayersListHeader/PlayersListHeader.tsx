import React, { FunctionComponent } from 'react';
import { View } from 'react-native';

import styled, { css } from '../../../../lib/styledComponents';
import { I18n } from '../../../../lib';
import { Text } from '../../../../components';
import { TextType, ThemeColor } from '../../../../theme/properties';

export const PlayersListHeader: FunctionComponent<{}> = ({}) => {
  return (
    <LabelsRow>
      <LabelContainer flex={3}>
        <Label>{I18n.t('PlayersExplorer.playerName')}</Label>
      </LabelContainer>
      <LabelContainer flex={1}>
        <Label>{I18n.t('PlayersExplorer.fieldPosition')}</Label>
      </LabelContainer>
      <LabelContainer flex={1}>
        <Label>{I18n.t('PlayersExplorer.club')}</Label>
      </LabelContainer>
      <LabelContainer flex={1}>
        <Label>{I18n.t('PlayersExplorer.avgRate')}</Label>
      </LabelContainer>
      <LabelContainer flex={1}>
        <Label>{I18n.t('PlayersExplorer.sumGoals')}</Label>
      </LabelContainer>
      <LabelContainer flex={1}>
        <Label>{I18n.t('PlayersExplorer.quotation')}</Label>
      </LabelContainer>
      <LabelContainer flex={1.5}>
        <Label>{I18n.t('PlayersExplorer.percentageStarter')}</Label>
      </LabelContainer>
    </LabelsRow>
  );
};

const LabelsRow = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  ${({ theme }) => css`
    padding: ${theme.spacing.x1}px;
    background-color: ${theme.colors.lightGrey};
  `}
`;

const LabelContainer = styled(View)<{ flex: number }>`
  justify-content: center;
  align-items: center;
  ${({ flex }) => css`
    flex: ${flex};
  `}
`;

const Label = styled(Text).attrs({
  color: ThemeColor.DarkGrey,
  type: TextType.TabHeader,
})``;
