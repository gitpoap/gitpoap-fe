import { Button as ButtonUI, ButtonProps } from '@mantine/core';
import React from 'react';

type Props = ButtonProps & {
  className?: string;
  onClick?: React.MouseEventHandler;
  onMouseEnter?: React.MouseEventHandler;
  onMouseLeave?: React.MouseEventHandler;
  id?: string;
};

export const Button = (props: Props) => {
  return <ButtonUI {...props}>{props.children}</ButtonUI>;
};
