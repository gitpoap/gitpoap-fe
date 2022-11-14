import React from 'react';
import { MessageBanner } from './MessageBanner';
import { FaMedal, FaRobot } from 'react-icons/fa';

export const GitPOAPBotBanner = () => {
  return (
    <MessageBanner
      title="GitPOAP Bot for GitHub"
      message="Tag anyone on an Issue or PR to award them a GitPOAP & notify your contributors when they get one!"
      href="https://docs.gitpoap.io/github-bot"
      leftIcon={<FaRobot size={16} />}
    />
  );
};

export const CreateGitPOAPsBanner = () => {
  return (
    <MessageBanner
      title="Create your own GitPOAPs 🥳"
      message="Celebrate & incentivize any collaborative effort! Awardable to emails, GitHub users, ETH addresses, & ENS Names."
      href="/create"
      leftIcon={<FaMedal size={16} />}
    />
  );
};
