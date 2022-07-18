import { rem } from 'polished';
import React from 'react';
import styled from 'styled-components';
import { LinkStyles } from '../../components/shared/elements/NavLink';
import { OrganizationDataQuery } from '../../graphql/generated-gql';
import { Wrapper } from '../gitpoap/Header';
import { Header as HeaderText } from '../shared/elements/Header';
import { GitHub, GitPOAP, Globe, Minted, People, Project, Twitter } from '../shared/elements/icons';
import { Text } from '../shared/elements/Text';
import {
  Social,
  StyledLink,
  SubHeader,
  SubHeaderItem,
  SubHeaderItemCount,
  SubHeaderItemLabel,
} from '../repo/Header';

const HeaderWrapper = styled(Wrapper)`
  height: ${rem(600)};
`;

const OrganizationTag = styled.div`
  ${LinkStyles}
  font-size: ${rem(11)};
`;

type Props = {
  org: Exclude<OrganizationDataQuery['organizationData'], null | undefined>;
};

export const Header = ({ org }: Props) => (
  <HeaderWrapper>
    <OrganizationTag>{'Organization'}</OrganizationTag>
    <HeaderText>{org.name}</HeaderText>
    {org.description && <Text style={{ paddingTop: rem(13) }}>{org.description}</Text>}
    <Social>
      {org.twitterHandle && (
        <StyledLink
          href={`https://twitter.com/${org.twitterHandle}`}
          target="_blank"
          rel="noopener noreferrer"
          passHref
        >
          <Twitter />
        </StyledLink>
      )}
      <StyledLink
        href={`https://github.com/${org.name}`}
        target="_blank"
        rel="noopener noreferrer"
        passHref
      >
        <GitHub />
      </StyledLink>
      {org.url && (
        <StyledLink href={org.url} target="_blank" rel="noopener noreferrer" passHref>
          <Globe />
        </StyledLink>
      )}
    </Social>
    <SubHeader>
      <SubHeaderItem>
        <People />
        <SubHeaderItemCount>{org.contributorCount}</SubHeaderItemCount>
        <SubHeaderItemLabel>{'Contributors'}</SubHeaderItemLabel>
      </SubHeaderItem>
      <SubHeaderItem>
        <GitPOAP />
        <SubHeaderItemCount>{org.gitPOAPCount}</SubHeaderItemCount>
        <SubHeaderItemLabel>{'GitPOAPs'}</SubHeaderItemLabel>
      </SubHeaderItem>
      <SubHeaderItem>
        <Minted />
        <SubHeaderItemCount>{org.mintedGitPOAPCount}</SubHeaderItemCount>
        <SubHeaderItemLabel>{'Minted'}</SubHeaderItemLabel>
      </SubHeaderItem>
      <SubHeaderItem>
        <Project />
        <SubHeaderItemCount>{org.repoCount}</SubHeaderItemCount>
        <SubHeaderItemLabel>{'Repos'}</SubHeaderItemLabel>
      </SubHeaderItem>
    </SubHeader>
  </HeaderWrapper>
);
