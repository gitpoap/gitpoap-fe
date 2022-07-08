import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { FaGithub as GithubIcon, FaTwitter as TwitterIcon } from 'react-icons/fa';
import { VscGlobe as GlobeIcon } from 'react-icons/vsc';
import { Link, IconLink } from '../Link';
import { Text, Button, Header as HeaderText, Title, GitPOAPBadge } from '../shared/elements';
import { TextAccent, TextGray, ExtraHover } from '../../colors';
import { useFeatures } from '../../components/FeaturesContext';
import { useClaimModalContext } from '../ClaimModal/ClaimModalContext';
import { useGitPoapEventQuery } from '../../graphql/generated-gql';

type Props = {
  gitPOAPId: number;
};

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: auto;
  width: ${rem(480)};
  max-width: 90%;

  a {
    text-decoration: none;
    &:hover {
      color: ${ExtraHover};
      cursor: pointer;
    }
  }
`;

const TitleStyled = styled(HeaderText)`
  margin-top: ${rem(24)};
`;

const Description = styled(Text)`
  margin-top: ${rem(16)};
  font-size: ${rem(16)};
`;

export const OrgName = styled(Text)`
  margin-top: ${rem(30)};
  font-weight: 700;
  color: ${TextGray};
`;

export const OrgLink = styled(Title)`
  font-size: ${rem(16)};
  color: ${TextAccent};
`;

const OrgDescription = styled(Text)`
  font-size: ${rem(12)};
  margin-top: ${rem(12)};
  color: ${TextGray};
`;

const Badge = styled(GitPOAPBadge)`
  margin-top: ${rem(64)};
  cursor: default;
`;

const Links = styled.div`
  margin-top: ${rem(18)};
`;

const StyledLink = styled(IconLink)`
  margin: 0 ${rem(12)};
`;

const CheckEligibilityButton = styled(Button)`
  margin-top: ${rem(40)};
`;

export const Header = ({ gitPOAPId }: Props) => {
  const [result] = useGitPoapEventQuery({
    variables: {
      id: gitPOAPId,
    },
  });
  const event = result?.data?.gitPOAPEvent?.event;
  const repo = result?.data?.gitPOAPEvent?.gitPOAP.repo;
  const org = result?.data?.gitPOAPEvent?.gitPOAP.repo.organization;

  const { setIsOpen } = useClaimModalContext();
  const features = useFeatures();

  return (
    <Wrapper>
      <Badge size="lg" disableHoverEffects imgUrl={event?.image_url ?? ''} />
      <TitleStyled>{event?.name.replace('GitPOAP: ', '')}</TitleStyled>
      <Description>{event?.description}</Description>
      {repo && org && (
        <>
          <OrgName>
            {`by `}
            <Link href={`/org/${org.id}`} passHref>
              <OrgLink>{`${repo.organization.name}`}</OrgLink>
            </Link>
            {`/`}
            <Link href={`/rp/${repo.id}`} passHref>
              <OrgLink>{repo.name}</OrgLink>
            </Link>
          </OrgName>
          <Links>
            {features.hasOrganizations && repo.organization.twitterHandle && (
              <StyledLink
                href={`https://twitter.com/${repo.organization.twitterHandle}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwitterIcon size={24} />
              </StyledLink>
            )}
            <StyledLink
              href={`https://github.com/${repo.organization.name}/${repo.name}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon size={24} />
            </StyledLink>
            {features.hasOrganizations && repo.organization.url && (
              <StyledLink href={repo.organization.url} target="_blank" rel="noopener noreferrer">
                <GlobeIcon size={24} />
              </StyledLink>
            )}
          </Links>
        </>
      )}
      <CheckEligibilityButton onClick={() => setIsOpen(true)} leftIcon={<GithubIcon size={20} />}>
        {"Check If I'm Eligible"}
      </CheckEligibilityButton>
    </Wrapper>
  );
};
