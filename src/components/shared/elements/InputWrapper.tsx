import styled from 'styled-components';
import { rem } from 'polished';
import { ExtraRed } from '../../../colors';
import { Input } from '@mantine/core';
import { TextInputLabelStyles } from './Input';

type Props = React.ComponentProps<typeof Input.Wrapper>;

const StyledInputWrapper = styled(Input.Wrapper)<Props & { disabled?: boolean }>`
  display: inline-block;

  .mantine-InputWrapper-label {
    ${TextInputLabelStyles};
    margin-bottom: ${rem(11)};
  }

  .mantine-InputWrapper-error {
    font-family: 'PT Mono', monospace;
    font-size: ${rem(10)};
    letter-spacing: 1.2px;
    padding-left: ${rem(16)};

    /* Must !important since Mantine is using it */
    color: ${ExtraRed} !important;
  }
`;

export const InputWrapper = (props: Props) => {
  return <StyledInputWrapper {...props} />;
};
