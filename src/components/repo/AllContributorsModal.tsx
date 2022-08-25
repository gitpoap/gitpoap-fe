import { Modal } from '@mantine/core';
import { useListState } from '@mantine/hooks';
import { rem } from 'polished';
import React, { useCallback, useEffect, useState } from 'react';
import { MdEmojiPeople } from 'react-icons/md';
import styled from 'styled-components';

import { EmptyState } from './RepoLeaderBoard';
import { LeaderBoardItem } from '../home/LeaderBoardItem';
import { Header, Text as TextUI } from '../shared/elements';
import { TextDarkGray } from '../../colors';
import { LeadersQuery, useRepoLeadersQuery } from '../../graphql/generated-gql';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';

const HeaderStyled = styled(Header)`
  font-size: ${rem(30)};
`;

export type Props = {
  onClose: () => void;
  opened: boolean;
  repoId: number;
};

type Contributor = LeadersQuery['mostHonoredContributors'][number];

export const AllContributorsModal = ({ onClose, opened, repoId }: Props) => {
  const [page, setPage] = useState(1);
  const perPage = 10;
  const [canLoadMore, setCanLoadMore] = useState(false);
  const [contributors, contributorsHandlers] = useListState<Contributor>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [result] = useRepoLeadersQuery({
    variables: {
      repoId: repoId,
      page: page,
      perPage: perPage,
    },
  });

  /* Hook to append new data onto existing list of contributors */
  useEffect(() => {
    if (result.data?.repoMostHonoredContributors) {
      contributorsHandlers.append(...result.data?.repoMostHonoredContributors);

      // If a full page of results is returned, we assume that there is more data available
      if (result.data?.repoMostHonoredContributors.length === perPage) {
        setCanLoadMore(true);
      }

      setIsFetching(false);
    }
  }, [result.data]);

  const loadMore = useCallback((page: number) => {
    setCanLoadMore(false);
    setPage(page + 1);
    setIsFetching(true);
  }, []);

  const [loadingZone] = useInfiniteScroll(
    canLoadMore ? () => loadMore(page) : null,
    result.fetching,
  );

  return (
    <Modal
      centered
      opened={opened}
      onClose={onClose}
      title={<HeaderStyled>All Contributors</HeaderStyled>}
    >
      {contributors && contributors?.length > 0 ? (
        contributors.map((contributor: Contributor) => (
          <LeaderBoardItem key={contributor.profile.id} {...contributor} />
        ))
      ) : (
        <EmptyState icon={<MdEmojiPeople color={TextDarkGray} size={rem(74)} />}>
          <TextUI style={{ marginTop: rem(20) }}>{`Nobody's here yet..`}</TextUI>
        </EmptyState>
      )}
      <div ref={loadingZone}>{isFetching && <p>Fetching items...</p>}</div>
    </Modal>
  );
};
