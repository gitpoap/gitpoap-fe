import { useLocalStorage } from '@mantine/hooks';
import React, { createContext, useState, useContext, useEffect } from 'react';
import { generateRandomColorRGB } from '../../helpers';
import { UserTeamsQuery, useUserTeamsQuery } from '../../graphql/generated-gql';
import { useWeb3Context } from '../wallet/Web3Context';

export type TeamDataWithColor = UserTeamsQuery['teams'][number] & { color: string };

type TeamsContext = {
  currTeam?: TeamDataWithColor;
  teamsData?: TeamDataWithColor[];
  setTeamId: (val: number) => void;
  hasFetchedTeams: boolean;
  refetch: () => void;
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
  const [teamsData, setTeamsData] = useState<TeamDataWithColor[]>();
  const [hasFetchedTeams, setHasFetchedTeams] = useState<boolean>(false);

  const [result, refetch] = useUserTeamsQuery({
    variables: {
      address: address ?? '',
    },
    requestPolicy: 'network-only',
  });

  useEffect(() => {
    if (result.data?.teams && result.data.teams.length) {
      setTeamsData(
        result.data.teams.map((team) => ({
          ...team,
          color: generateRandomColorRGB(true),
        })),
      );
      if (!teamId || !result.data.teams.find((team) => team.id === teamId)) {
        setTeamId(result.data.teams[0].id);
      }
      setHasFetchedTeams(true);
    }
  }, [result.data]);

  const currTeam = teamsData?.find((team) => team.id === teamId);

  return (
    <TeamsContext.Provider
      value={{
        currTeam,
        teamsData,
        setTeamId,
        hasFetchedTeams,
        refetch,
      }}
    >
      {children}
    </TeamsContext.Provider>
  );
};
