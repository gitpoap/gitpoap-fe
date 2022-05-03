import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Button } from '../elements/Button';
import { GitPOAP } from './GitPOAP';
import { FaCheckCircle } from 'react-icons/fa';

type Props = {
  gitPOAPId: number;
  imgSrc: string;
  name: string;
  orgName: string;
  description: string;
  onClickClaim: () => void;
  onClickBadge?: () => void;
  isClaimed?: boolean;
  isLoading?: boolean;
};

const Wrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: ${rem(340)};
`;

const ButtonWrapper = styled.div`
  flex: 1;
  margin-top: ${rem(14)};
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export const ClaimBlock = ({
  gitPOAPId,
  imgSrc,
  name,
  orgName,
  description,
  onClickClaim,
  onClickBadge,
  isClaimed,
  isLoading,
}: Props) => {
  return (
    <Wrapper>
      <GitPOAP
        gitPOAPId={gitPOAPId}
        imgSrc={imgSrc}
        name={name}
        orgName={orgName}
        description={description}
        onClick={onClickBadge}
      />
      <ButtonWrapper>
        <Button
          onClick={onClickClaim}
          loading={isLoading}
          leftIcon={isClaimed ? <FaCheckCircle /> : undefined}
          disabled={isClaimed}
        >
          {isClaimed ? 'Minted' : 'Mint'}
        </Button>
      </ButtonWrapper>
    </Wrapper>
  );
};
