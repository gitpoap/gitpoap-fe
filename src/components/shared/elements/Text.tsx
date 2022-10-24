import styled from 'styled-components';
import { Text as TextUI, TextProps } from '@mantine/core';

export const Text = styled(TextUI)<TextProps & React.ComponentPropsWithoutRef<'div'>>``;
