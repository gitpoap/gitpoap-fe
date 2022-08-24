import { Button, Modal } from '@mantine/core';
import { rem } from 'polished';
import React, { useEffect, useState } from 'react';
import { MdEmojiPeople } from 'react-icons/md';
import styled from 'styled-components';

import { EmptyState } from './RepoLeaderBoard';
import { LeaderBoardItem } from '../home/LeaderBoardItem';
import { Header, Text as TextUI } from '../shared/elements';
import { TextDarkGray } from '../../colors';
import { LeadersQuery, useRepoLeadersQuery } from '../../graphql/generated-gql';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';

const HeaderStyled = styled(Header)`
  font-size: ${rem(30)};
`;

export type RepoLeaderBoardProps = {
  repoId: number;
};

export const AllContributorsModal = ({ repoId }: RepoLeaderBoardProps) => {
  const [opened, setOpened] = useState(false);
  const [page, setPage] = useState(0);
  const perPage = 10;
  const [canLoadMore, setCanLoadMore] = useState(false);
  const [contributors, setContributors] = useState<LeadersQuery['mostHonoredContributors']>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [result] = useRepoLeadersQuery({
    variables: {
      repoId: repoId,
      page: page,
      perPage: perPage,
    },
  });

  /* Hook to append new data onto existing list of gitPOAPs */
  useEffect(() => {
    console.log(result.data?.repoMostHonoredContributors);

    if (result.data?.repoMostHonoredContributors) {
      setContributors([...contributors, ...result.data?.repoMostHonoredContributors]);

      // The end of the list is reached when less results than the page count is returned
      if (result.data?.repoMostHonoredContributors.length === perPage) setCanLoadMore(true);

      setIsFetching(false);
    }
  }, [result.data]);

  const loadMore = () => {
    setCanLoadMore(false);
    setPage((page: number) => page + 1);
    setIsFetching(true);
  };

  const [loadingZone] = useInfiniteScroll(canLoadMore ? loadMore : () => {}, result.fetching);

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={<HeaderStyled>Top contributors</HeaderStyled>}
      >
        {contributors && contributors?.length > 0 ? (
          contributors.map((contributor: any) => (
            <LeaderBoardItem key={contributor.profile.id} {...contributor} />
          ))
        ) : (
          <EmptyState icon={<MdEmojiPeople color={TextDarkGray} size={rem(74)} />}>
            <TextUI style={{ marginTop: rem(20) }}>{`Nobody's here yet..`}</TextUI>
          </EmptyState>
        )}
        <div ref={loadingZone}>{isFetching && <p>Fetching items...</p>}</div>
      </Modal>
      <Button onClick={() => setOpened(true)}>Open Modal</Button>
    </>
  );
};
