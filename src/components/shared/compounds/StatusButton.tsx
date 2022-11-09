import { Button, ButtonProps } from '@mantine/core';
import { FaCheckCircle } from 'react-icons/fa';
import { MdError } from 'react-icons/md';

export enum ButtonStatus {
  INITIAL,
  LOADING,
  SUCCESS,
  ERROR,
}

const ButtonIcon = ({ status }: { status: ButtonStatus }) => {
  return status === ButtonStatus.SUCCESS ? (
    <FaCheckCircle size={18} />
  ) : status === ButtonStatus.ERROR ? (
    <MdError size={18} />
  ) : null;
};

type Props = {
  status: ButtonStatus;
  isDisabled: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  variant?: ButtonProps['variant'];
};

export const StatusButton = ({ status, isDisabled, onClick, children, variant }: Props) => {
  return (
    <Button
      loading={status === ButtonStatus.LOADING}
      disabled={isDisabled}
      leftIcon={<ButtonIcon status={status} />}
      onClick={onClick}
      variant={variant}
    >
      {children}
    </Button>
  );
};
