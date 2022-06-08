import { rem } from 'polished';
import React from 'react';
import { FaGithub as GithubIcon, FaTwitter as TwitterIcon } from 'react-icons/fa';
import { VscGlobe as GlobeIcon } from 'react-icons/vsc';
import styled from 'styled-components';
import Link from 'next/link';
import { Button } from '../shared/elements/Button';
import { GitPOAPBadge } from '../shared/elements/GitPOAPBadge';
import { Header as HeaderText } from '../shared/elements/Header';
import { Text } from '../shared/elements/Text';
import { TextAccent, TextGray, ExtraHover } from '../../colors';
import { useFeatures } from '../../components/FeaturesContext';
import { Title } from '../shared/elements/Title';
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

const StyledLink = styled.a`
  color: ${TextGray};
  margin: 0 ${rem(12)};

  svg {
    fill: currentColor;
  }
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
  let event = result?.data?.gitPOAPEvent?.event;
  let repo = result?.data?.gitPOAPEvent?.gitPOAP.repo;

  const { setIsOpen } = useClaimModalContext();
  const features = useFeatures();

  return (
    <Wrapper>
      <Badge size="lg" imgUrl={event?.image_url ?? ''} />
      <TitleStyled>{event?.name.replace('GitPOAP: ', '')}</TitleStyled>
      <Description>{event?.description}</Description>
      {repo && (
        <>
          <OrgName>
            {`by ${repo.organization.name}/`}
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
