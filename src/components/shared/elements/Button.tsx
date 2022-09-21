import React from 'react';
import { Button as ButtonUI, ButtonProps } from '@mantine/core';

export const Button = (props: ButtonProps) => {
  return <ButtonUI {...props}>{props.children}</ButtonUI>;
};
