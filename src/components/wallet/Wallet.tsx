import { Box, Menu } from '@mantine/core';
import { NextLink } from '@mantine/next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FaEthereum } from 'react-icons/fa';
import styled from 'styled-components';

import { WalletStatus } from './WalletStatus';
import { useWeb3Context } from './Web3ContextProvider';
import { DisconnectPopover } from '../DisconnectPopover';
import { useFeatures } from '../FeaturesContext';
import { Button } from '../shared/elements/Button';

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: white;
`;

const POPOVER_HOVER_TIME = 400;

type Props = {
  hideText?: boolean;
  isMobile: boolean;
};

export const Wallet = ({ hideText, isMobile }: Props) => {
  const { hasSettingsPage } = useFeatures();
  const router = useRouter();
  const [isHovering, setIsHovering] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { connectionStatus, address, connect, disconnect, ensName } = useWeb3Context();

  /* Ensure the popover is closed when the button switches to a connected state */
  useEffect(() => {
    if (connectionStatus === 'connected') {
      setIsOpen(false);
      setIsHovering(false);
    }
  }, [connectionStatus]);

  return (
    <Content>
      {connectionStatus === 'connected' && address ? (
        hasSettingsPage && !isMobile ? (
          <Menu
            closeDelay={POPOVER_HOVER_TIME}
            closeOnClickOutside
            openDelay={POPOVER_HOVER_TIME}
            position="bottom-end"
            radius="md"
            trigger="hover"
            width={160}
          >
            <Menu.Target>
              <Box>
                <WalletStatus
                  onClick={() => {
                    router.push(`/p/${ensName ?? address}`);
                  }}
                  address={address}
                  ensName={ensName}
                  hideText={hideText}
                />
              </Box>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item component={NextLink} href={`/p/${ensName ?? address}`}>
                {'Profile'}
              </Menu.Item>
              <Menu.Item component={NextLink} href="/settings">
                {'Settings'}
              </Menu.Item>
              <Menu.Item component="a" href="https://docs.gitpoap.io" target="_blank">
                {'Help'}
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item onClick={() => disconnect()}>{'Disconnect'}</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        ) : (
          <DisconnectPopover
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onClose={() => setIsOpen(false)}
            handleOnClick={() => {
              setIsOpen(false);
              setIsHovering(false);
              disconnect();
            }}
            icon={<FaEthereum size={16} />}
            buttonText={'DISCONNECT'}
            isHovering={isHovering}
            target={
              <WalletStatus
                onClick={() => {
                  router.push(`/p/${ensName ?? address}`);
                }}
                address={address}
                ensName={ensName}
                hideText={hideText}
              />
            }
          />
        )
      ) : (
        <Button onClick={() => connect()}>
          {!hideText ? 'Connect Wallet' : <FaEthereum size={16} />}
        </Button>
      )}
    </Content>
  );
};
