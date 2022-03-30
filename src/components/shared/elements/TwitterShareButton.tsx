import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { FaTwitter } from 'react-icons/fa';

interface Props {
  hashtags: string;
  label: string;
  text: string;
  url: string;
}

const TwitterButton = styled.a`
  margin-top: ${rem(20)};
  height: ${rem(28)};
  width: fit-content;
  border-radius: ${rem(28)};
  padding: ${rem(1)} ${rem(12)} ${rem(1)} ${rem(12)};

  position: relative;
  box-sizing: border-box;
  background-color: #1d9bf0;
  color: #fff;
  font-weight: 500;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #0c7abf;
  }
`;

const TwitterIcon = styled(FaTwitter)`
  height: ${rem(16)};
  width: ${rem(16)};
`;

const Label = styled.span`
  margin-left: ${rem(4)};
  font: normal normal normal 12px/18px 'Helvetica Neue', Arial, sans-serif;
  font-size: ${rem(13)};
  line-height: ${rem(26)};
  font-weight: 500;
`;

export const TwitterShareButton = ({ hashtags, label, text, url }: Props) => {
  let queryParams = new URLSearchParams({ hashtags, text, url }).toString();

  return (
    <TwitterButton
      href={`https://twitter.com/intent/tweet?${queryParams}`}
      rel="noreferrer"
      target="_blank"
    >
      <TwitterIcon />
      <Label>{label}</Label>
    </TwitterButton>
  );
};
