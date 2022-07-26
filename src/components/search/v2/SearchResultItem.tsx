import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import {
  BackgroundPanel,
  BackgroundPanel2,
  ExtraHover,
  ExtraPressed,
  TextGray,
} from '../../../colors';
import { Badge, GitPOAPBadge, Header } from '../../shared/elements';
import { Link } from '../../Link';
import { useGitPoapsQuery } from '../../../graphql/generated-gql';

type Props = {
  text: string;
  subText?: string;
  type: 'profile' | 'gitpoap' | 'org' | 'repo';
  className?: string;
  href: string;
};

const ResultContainer = styled.div`
  display: flex;
  flex-direction: row;
  background: ${BackgroundPanel};
  border-radius: ${rem(6)};
  padding: ${rem(20)};
  margin-bottom: ${rem(10)};
  transition: 150ms color ease, 150ms background ease;
  cursor: pointer;

  &:hover {
    background: ${BackgroundPanel2};
    color: ${ExtraHover};
  }
  &:active {
    background: ${BackgroundPanel};
    color: ${ExtraPressed};
  }
`;

const Main = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Art = styled.div`
  border-radius: 50%;
  background: ${TextGray};
  width: ${rem(50)};
  height: ${rem(50)};
  margin-right: ${rem(20)};
  transition: 150ms color ease, 150ms background ease;

  &:hover {
    background: ${ExtraHover};
  }
  &:active {
    background: ${ExtraPressed};
  }
`;

const Name = styled(Header)`
  margin-right: ${rem(20)};
  font-size: ${rem(28)};
`;

const SubText = styled.div``;

const GitPOAPs = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Type = styled.div`
  margin-right: ${rem(10)};
`;

const StyledGitPOAPBadge = styled(GitPOAPBadge)`
  margin-right: ${rem(10)};
`;

type ProfileGitPOAPsProps = {
  addressOrEns: string;
};

const ProfileGitPOAPs = ({ addressOrEns }: ProfileGitPOAPsProps) => {
  const [results] = useGitPoapsQuery({
    variables: { address: addressOrEns },
  });

  return (
    <>
      {results.data?.userPOAPs?.gitPOAPs?.map((gitPOAP, i) => (
        <StyledGitPOAPBadge
          imgUrl={gitPOAP.event.image_url}
          size="xxs"
          key={gitPOAP.claim.gitPOAP.id}
          disableHoverEffects
        />
      ))}
    </>
  );
};

export const SearchResultItem = ({ className, type, text, subText, href }: Props) => {
  return (
    <Link passHref href={href}>
      <ResultContainer className={className}>
        <Main>
          <Art />
          <Name>{text}</Name>
          <SubText>{subText}</SubText>
          <Type>
            <Badge>{type}</Badge>
          </Type>
        </Main>
        <GitPOAPs>{type === 'profile' && <ProfileGitPOAPs addressOrEns={text} />}</GitPOAPs>
      </ResultContainer>
    </Link>
  );
};
