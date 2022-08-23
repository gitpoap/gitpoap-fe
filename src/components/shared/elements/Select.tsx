import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Select as SelectUI } from '@mantine/core';
import { TextGray, BackgroundPanel2, TextDarkGray, TextLight, ExtraHover } from '../../../colors';
import { CaretDown } from './icons/CaretDown';
import { CaretUp } from './icons/CaretUp';

interface Props extends React.ComponentProps<typeof SelectUI> {}

const SelectUIStyled = styled(SelectUI)<{ disabled?: boolean }>`
  display: inline-flex;

  .mantine-Select-rightSection {
    pointer-events: none;
    > svg > path {
      transition: 150ms fill ease;
      ${(props) => props.disabled && `fill: ${TextGray};`}
    }
  }

  .mantine-Select-wrapper {
    .mantine-Select-input {
      background: transparent;
      border: ${rem(2)} solid ${TextGray};
      box-sizing: border-box;
      border-radius: ${rem(6)};
      font-family: PT Mono;
      font-style: normal;
      font-weight: bold;
      font-size: ${rem(12)};
      line-height: ${rem(18)};
      letter-spacing: ${rem(2)};
      text-transform: uppercase;
      color: ${TextLight};
      transition: 150ms border ease, 150ms color ease;
      padding-right: ${rem(12)};
    }

    &:hover:not(:disabled):not(:focus-within) {
      .mantine-Select-input:not(:disabled):not(:focus-within) {
        border: ${rem(2)} solid ${ExtraHover};
        color: ${ExtraHover};
      }
      .mantine-Select-rightSection > svg > path {
        ${(props) => !props.disabled && `fill: ${ExtraHover}; `}
      }
    }

    &:focus-within:not(:disabled) {
      .mantine-Select-input {
        border: ${rem(2)} solid ${TextLight} !important;
        color: ${TextLight};
      }
    }
  }
`;

export const Select = (props: Props) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  return (
    <SelectUIStyled
      styles={{
        dropdown: {
          backgroundColor: TextDarkGray,
          paddingRight: 0,
          paddingLeft: 0,
        },
        item: {
          transition: '150ms background-color ease',
          fontFamily: 'PT Mono',
          fontStyle: 'normal',
          fontWeight: 'bold',
          fontSize: rem(12),
          lineHeight: rem(18),
          letterSpacing: rem(2),
          textTransform: 'uppercase',
          color: TextLight,
          '&[data-hovered]': {
            backgroundColor: BackgroundPanel2,
          },
          '&[data-selected]': {
            backgroundColor: TextDarkGray,
            '&:hover': {
              backgroundColor: BackgroundPanel2,
            },
          },
        },
      }}
      onDropdownOpen={() => setIsOpen(true)}
      onDropdownClose={() => setIsOpen(false)}
      rightSection={isOpen ? <CaretUp /> : <CaretDown />}
      {...props}
    />
  );
};
