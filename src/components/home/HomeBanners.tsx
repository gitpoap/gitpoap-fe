import React from 'react';
import { MessageBanner } from './MessageBanner';
import { FaRobot, FaArrowRight } from 'react-icons/fa';

export const GitPOAPBotBanner = () => {
  return (
    <MessageBanner
      title="GitPOAP Bot for GitHub"
      message="Tag anyone on an Issue or PR to award them a GitPOAP & notify your contributors when they get one!"
      href="https://docs.gitpoap.io/github-bot"
      leftIcon={<FaRobot size={20} />}
      rightIcon={<FaArrowRight size={14} />}
    />
  );
};
