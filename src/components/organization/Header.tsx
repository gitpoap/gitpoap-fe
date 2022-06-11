import { rem } from 'polished';
import React from 'react';
import styled from 'styled-components';
import { Header as HeaderText } from '../shared/elements/Header';
import { Text } from '../shared/elements/Text';
import { TextAccent, TextGray } from '../../colors';
import { Link } from '../Link';
import { SEO } from '../../components/SEO';
import { Wrapper } from '../gitpoap/Header';
import { People, GitPOAP, Globe, GitHub, Project, Twitter } from '../shared/elements/icons';
import { useOrganizationDataQuery } from '../../graphql/generated-gql';
import { LinkStyles } from '../../components/shared/elements/NavLink';

const HeaderWrapper = styled(Wrapper)`
  height: ${rem(600)};
`;

const Social = styled.div`
  margin: ${rem(23)} auto 0;
`;

const IconLink = styled(Link)`
  text-decoration: none;
  margin: 0 ${rem(8)};

  & > svg {
    width: ${rem(24)};
    height: ${rem(24)};
  }
`;

const SubHeader = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  margin-top: ${rem(48)};
  min-height: ${rem(48)};
`;

const SubHeaderItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 ${rem(6)};

  & > svg {
    width: ${rem(30)};
    height: ${rem(30)};
  }

  & > * {
    margin-top: ${rem(4)};
  }
`;

// reference to InfoHexProfileDetail - Name
const SubHeaderItemCount = styled.div`
  font-family: VT323;
  font-size: ${rem(36)};
  line-height: ${rem(42)};
  color: ${TextAccent};
`;

const SubHeaderItemLabel = styled(Text)`
  font-size: ${rem(15)};
  color: ${TextGray};
`;

const OrganizationTag = styled.div`
  ${LinkStyles}
  font-size: ${rem(11)};
`;

type Props = {
  orgId: number;
};

export const Header = ({ orgId }: Props) => {
  const [result] = useOrganizationDataQuery({ variables: { orgId } });

  let org = result?.data?.organizationData;

  return (
    <HeaderWrapper>
      <SEO
        title={`${org?.name} | GitPOAP`}
        description={
          'GitPOAP is a decentralized reputation platform that represents off-chain accomplishments and contributions on chain as POAPs.'
        }
        image={'https://gitpoap.io/og-image-512x512.png'}
        url={`https://gitpoap.io/o/${orgId}`}
      />
      {org && (
        <div>
          <OrganizationTag>{'Organization'}</OrganizationTag>
          <HeaderText>{org.name}</HeaderText>
          {org.description && <Text style={{ paddingTop: rem(13) }}>{org.description}</Text>}
          <Social>
            {org.twitterHandle && (
              <IconLink
                href={`https://twitter.com/${org.twitterHandle}`}
                target="_blank"
                rel="noreferrer"
              >
                <Twitter />
              </IconLink>
            )}
            {org.name && (
              <IconLink href={`https://github.com/${org.name}`} target="_blank" rel="noreferrer">
                <GitHub />
              </IconLink>
            )}
            {org.url && (
              <IconLink href={org.url} target="_blank" rel="noreferrer">
                <Globe />
              </IconLink>
            )}
          </Social>
          <SubHeader>
            {org.contributorCount && (
              <SubHeaderItem>
                <People />
                <SubHeaderItemCount>{org.contributorCount}</SubHeaderItemCount>
                <SubHeaderItemLabel>{'Contributors'}</SubHeaderItemLabel>
              </SubHeaderItem>
            )}
            {org.gitPOAPCount && (
              <SubHeaderItem>
                <GitPOAP />
                <SubHeaderItemCount>{org.gitPOAPCount}</SubHeaderItemCount>
                <SubHeaderItemLabel>{'GitPOAPs'}</SubHeaderItemLabel>
              </SubHeaderItem>
            )}
            {org.mintedGitPOAPCount && (
              <SubHeaderItem>
                <GitPOAP />
                <SubHeaderItemCount>{org.mintedGitPOAPCount}</SubHeaderItemCount>
                <SubHeaderItemLabel>{'Minted'}</SubHeaderItemLabel>
              </SubHeaderItem>
            )}
            {org.projectCount && (
              <SubHeaderItem>
                <Project />
                <SubHeaderItemCount>{org.projectCount}</SubHeaderItemCount>
                <SubHeaderItemLabel>{'Projects'}</SubHeaderItemLabel>
              </SubHeaderItem>
            )}
          </SubHeader>
        </div>
      )}
    </HeaderWrapper>
  );
};
