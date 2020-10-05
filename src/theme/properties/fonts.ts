export enum TextType {
  Placeholder = 'placeholder',
  InputValue = 'inputValue',
  TabHeader = 'tabHeader',
  TabRow = 'tabRow',
  TabRowBold = 'tabRowBold',
  Title = 'title',
  Body = 'body',
  Button = 'button',
  SmallButton = 'smallButton',
}

interface FontType {
  family: string;
  size: number;
  weight: 'normal' | 'bold';
}

export const fonts: Record<TextType, FontType> = {
  placeholder: {
    family: 'System',
    size: 16,
    weight: 'normal',
  },
  inputValue: {
    family: 'System',
    size: 16,
    weight: 'bold',
  },
  tabHeader: {
    family: 'System',
    size: 14,
    weight: 'bold',
  },
  tabRow: {
    family: 'System',
    size: 14,
    weight: 'normal',
  },
  tabRowBold: {
    family: 'System',
    size: 14,
    weight: 'bold',
  },
  title: {
    family: 'System',
    size: 18,
    weight: 'bold',
  },
  body: {
    family: 'System',
    size: 14,
    weight: 'normal',
  },
  button: {
    family: 'System',
    size: 16,
    weight: 'bold',
  },
  smallButton: {
    family: 'System',
    size: 12,
    weight: 'normal',
  },
};
