import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ClaimModal } from '../components/ClaimModal';

const url =
  'https://s3-alpha-sig.figma.com/img/b518/bcca/25eeb427351cd564be419de8eaaed58e?Expires=1644796800&Signature=JjaV7mRbJwrA7dhpZFHmMUL0vs8RrvXlzf7GTdGrZ5Y8WqZceOjSnqZRyPltG8V0GfofJwpTO7CiE-cl2FhhOWA22RXMM662w~7EYQ4Hb6vc~qDrbfI3-AmXKN9xCGRpHijCs8YWEpFamceMcCCgK1j36ulaQxAE4im08KpT9OpoRu~emmRCDRV3Sd28HcIRCdXIeq4g1FGpQaadg36Nstr3CK995OJNZLMFq8aAMmuRgH415oL-xK6aKfQNtG1m9fNiiZ00IHLoq4cvnMjoc5Q6kNYGLaVlYwCSpf5hrNse51KXeYS6XXMz5iVUfSf679tNRAKB4g9PMWfMAELksg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA';

export default {
  title: 'Modals/Claim',
  component: ClaimModal,
  argTypes: {},
} as ComponentMeta<typeof ClaimModal>;

const Template: ComponentStory<typeof ClaimModal> = (args: any) => {
  return <ClaimModal {...args} />;
};

export const SingleClaim = Template.bind({});
SingleClaim.args = { numClaims: 1, isOpen: true };

export const MultipleClaims = Template.bind({});
MultipleClaims.args = { numClaims: 2, isOpen: true };

export const NoClaims = Template.bind({});
NoClaims.args = { numClaims: 0, isOpen: true };
