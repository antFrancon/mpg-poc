export enum TextType {
  Placeholder = 'placeholder',
  InputValue = 'inputValue',
  TabHeader = 'tabHeader',
  TabRow = 'tabRow',
  TabRowBold = 'tabRowBold',
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
};
