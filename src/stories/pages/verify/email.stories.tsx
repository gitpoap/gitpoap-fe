import { ComponentStory, ComponentMeta } from '@storybook/react';
import { rest } from 'msw';
import React from 'react';

import { Layout } from '../../../components/Layout';
import { VerifyEmail as Component } from '../../../components/verify/VerifyEmail';

export default {
  title: 'Pages/VerifyEmail',
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = () => {
  return (
    <Layout>
      <Component token="1234567890" />
    </Layout>
  );
};

export const Valid = Template.bind({});
Valid.args = {};

Valid.parameters = {
  msw: {
    handlers: [
      rest.post('*/email/verify', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ msg: 'VALID' }));
      }),
    ],
  },
};

export const Invalid = Template.bind({});
Invalid.args = {};

Invalid.parameters = {
  msw: {
    handlers: [
      rest.post('*/email/verify', (req, res, ctx) => {
        return res(ctx.status(404), ctx.json({ msg: 'INVALID' }));
      }),
    ],
  },
};

export const Expired = Template.bind({});
Expired.args = {};

Expired.parameters = {
  msw: {
    handlers: [
      rest.post('*/email/verify', (req, res, ctx) => {
        return res(ctx.status(400), ctx.json({ msg: 'EXPIRED' }));
      }),
    ],
  },
};

export const Used = Template.bind({});
Used.args = {};

Used.parameters = {
  msw: {
    handlers: [
      rest.post('*/email/verify', (req, res, ctx) => {
        return res(ctx.status(400), ctx.json({ msg: 'USED' }));
      }),
    ],
  },
};

export const OtherError = Template.bind({});
OtherError.args = {};

OtherError.parameters = {
  msw: {
    handlers: [
      rest.post('*/email/verify', (req, res, ctx) => {
        return res(ctx.status(400), ctx.json({}));
      }),
    ],
  },
};
