import React from 'react';
import { MessageBanner } from './MessageBanner';

export const GitPOAPBotBanner = () => {
  return (
    <MessageBanner
      title="GitPOAP Bot for GitHub"
      message="Tag anyone on an Issue or PR to award them a GitPOAP & notify your contributors when they get one!"
      href="https://docs.gitpoap.io/github-bot"
    />
  );
};
