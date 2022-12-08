import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import WalletModal from '../../components/wallet/WalletModal';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3ContextProvider } from '../../components/wallet/Web3Context';
import { connectors } from '../../connectors';

export default {
  title: 'Modals/WalletModal',
  component: WalletModal,
} as ComponentMeta<typeof WalletModal>;

const Template: ComponentStory<typeof WalletModal> = (args) => {
  return (
    <Web3ReactProvider connectors={connectors}>
      <Web3ContextProvider>
        <WalletModal {...args} />
      </Web3ContextProvider>
    </Web3ReactProvider>
  );
};

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
  closeModal: () => {},
};
