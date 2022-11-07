import styled from 'styled-components';
import { rem } from 'polished';
import {
  DarkGray,
  BackgroundPanel,
  BackgroundPanel2,
  ExtraRed,
  TextDarkGray,
} from '../../../colors';
import { Textarea } from '@mantine/core';
import { TextInputLabelStyles } from './Input';

type Props = React.ComponentProps<typeof Textarea> & {
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  value: string;
  textareaRef?: React.RefObject<HTMLTextAreaElement>;
};

const StyledInputBase = styled(Textarea)<{ disabled?: boolean }>`
  display: inline-block;

  .mantine-Textarea-label {
    ${TextInputLabelStyles};
    margin-bottom: ${rem(11)};
  }

  .mantine-Textarea-input {
    border-radius: ${rem(6)};
    font-family: 'PT Mono', monospace;
    font-weight: 400;
    font-size: ${rem(14)};
    color: white;
    background-color: ${BackgroundPanel};
    transition: 150ms background-color ease;
    letter-spacing: ${rem(0.2)};
    border: ${rem(1)} solid transparent;

    &:hover:not(:disabled):not(:focus) {
      background-color: ${BackgroundPanel2};
    }
    &:focus {
      background-color: ${BackgroundPanel};
      /* Must use !important since Mantine is using it */
      border: ${rem(1)} solid ${DarkGray} !important;
    }
    &::placeholder {
      color: ${TextDarkGray};
    }
    &.mantine-Textarea-invalid {
      color: ${ExtraRed};
    }
  }

  .mantine-Textarea-error {
    font-family: 'PT Mono', monospace;
    font-size: ${rem(10)};
    letter-spacing: 1.2px;
    padding-left: ${rem(16)};

    /* Must !important since Mantine is using it */
    color: ${ExtraRed} !important;
  }
`;

export function TextArea(props: Props) {
  return <StyledInputBase {...props} ref={props.textareaRef} spellCheck={false} />;
}
