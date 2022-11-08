import React from 'react';
import { MessageBanner } from './MessageBanner';
import { FaRobot, FaArrowRight } from 'react-icons/fa';
import { MdDashboardCustomize } from 'react-icons/md';

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

export const CustomGitPOAPsBanner = () => {
  return (
    <MessageBanner
      title="Create your own GitPOAPs"
      message="Celebrate & incentivize any collaborative effort. Awardable to email addresses, GitHub users, ETH addresses, & ENS Names."
      href="https://docs.gitpoap.io/github-bot"
      leftIcon={<MdDashboardCustomize size={20} />}
      rightIcon={<FaArrowRight size={14} />}
    />
  );
};
