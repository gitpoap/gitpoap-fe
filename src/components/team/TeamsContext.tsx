import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
  Dispatch,
  SetStateAction,
} from 'react';
import {
  UserTeamsQuery,
  useUpdateTeamMutation,
  useUserTeamsQuery,
} from '../../graphql/generated-gql';
import { Notifications } from '../../notifications';
import { useTokens } from '../../hooks/useTokens';
import { useWeb3Context } from '../wallet/Web3Context';
import { useApi } from '../../hooks/useApi';

export type EditableTeamData = Partial<
  Pick<Exclude<UserTeamsQuery['teams'], null | undefined>[number], 'name' | 'description'>
>;

type TeamsContext = {
  teamsData?: UserTeamsQuery['teams'];
  teamId?: number;
  setTeamId: Dispatch<SetStateAction<number | undefined>>;
  updateTeamData: (newTeamData: EditableTeamData) => void;
  updateTeamLogo: (file: File) => void;
};

const TeamsContext = createContext<TeamsContext>({} as TeamsContext);

export const useTeamsContext = () => {
  return useContext(TeamsContext);
};

type Props = {
  children: React.ReactNode;
};

export const TeamsProvider = ({ children }: Props) => {
  const api = useApi();
  const { tokens } = useTokens();
  const { address } = useWeb3Context();
  const [teamId, setTeamId] = useState<number>();
  const [teamsData, setTeamsData] = useState<UserTeamsQuery['teams']>();

  const [result, refetch] = useUserTeamsQuery({
    variables: {
      address: address ?? '',
    },
  });
  const [updateResult, updateTeam] = useUpdateTeamMutation();

  useEffect(() => {
    refetch({ requestPolicy: 'network-only' });
  }, [updateResult]);

  /* Hook to set profile data to state */
  useEffect(() => {
    setTeamsData(result.data?.teams);
  }, [result.data]);

  const updateTeamData = useCallback(
    async (newTeamData: EditableTeamData) => {
      if (!teamId) {
        Notifications.error('Oops, something went wrong!');
        return;
      }

      const data = await updateTeam({
        teamId,
        input: { name: { set: newTeamData.name }, description: { set: newTeamData.description } },
      });

      if (data === null) {
        Notifications.error('Oops, something went wrong!');
        return;
      }

      refetch({ requestPolicy: 'network-only' });
    },
    [tokens?.accessToken, teamId, refetch],
  );

  const updateTeamLogo = useCallback(
    async (file: File) => {
      if (!teamId) {
        Notifications.error('Oops, something went wrong!');
        return;
      }

      const data = await api.team.addLogo(teamId, file);

      if (data === null) {
        Notifications.error('Oops, something went wrong!');
        return;
      }

      refetch({ requestPolicy: 'network-only' });
    },
    [tokens?.accessToken, teamId, refetch],
  );

  return (
    <TeamsContext.Provider
      value={{
        teamsData,
        teamId,
        setTeamId,
        updateTeamData,
        updateTeamLogo,
      }}
    >
      {children}
    </TeamsContext.Provider>
  );
};
