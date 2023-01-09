import { useLocalStorage } from '@mantine/hooks';
import React, { createContext, useState, useContext, useEffect } from 'react';
import { UserTeamsQuery, useUserTeamsQuery } from '../../graphql/generated-gql';
import { useWeb3Context } from '../wallet/Web3Context';

export type EditableTeamData = Partial<
  Pick<Exclude<UserTeamsQuery['teams'], null | undefined>[number], 'name' | 'description'>
>;

type TeamsContext = {
  teamsData?: UserTeamsQuery['teams'];
  teamId?: number;
  setTeamId: (val: number) => void;
  hasFetchedTeams: boolean;
};

const TeamsContext = createContext<TeamsContext>({} as TeamsContext);

export const useTeamsContext = () => {
  return useContext(TeamsContext);
};

type Props = {
  children: React.ReactNode;
};

export const TeamsProvider = ({ children }: Props) => {
  const [teamId, setTeamId] = useLocalStorage<number | undefined>({ key: 'teamId' });
  const { address } = useWeb3Context();
  const [teamsData, setTeamsData] = useState<UserTeamsQuery['teams']>();
  const [hasFetchedTeams, setHasFetchedTeams] = useState<boolean>(false);

  const [result] = useUserTeamsQuery({
    variables: {
      address: address ?? '',
    },
  });

  /* Hook to set profile data to state */
  useEffect(() => {
    if (result.data?.teams && result.data.teams.length) {
      setTeamsData(result.data.teams);
      if (!teamId || !result.data.teams.find((team) => team.id === teamId)) {
        setTeamId(result.data.teams[0].id);
      }
      setHasFetchedTeams(true);
    }
  }, [result.data]);

  return (
    <TeamsContext.Provider
      value={{
        teamsData,
        teamId,
        setTeamId,
        hasFetchedTeams,
      }}
    >
      {children}
    </TeamsContext.Provider>
  );
};
