import {
  Badge,
  BadgeProps,
  CloseButton,
  Container,
  Divider,
  Grid,
  Group,
  List,
  ScrollArea,
  Stack,
} from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import { rem } from 'polished';
import { useState } from 'react';
import { MdOutlineFileUpload } from 'react-icons/md';
import styled from 'styled-components';
import { BackgroundPanel, BackgroundPanel2, BackgroundPanel3, ExtraRed } from '../../colors';
import { useUser } from '../../hooks/useUser';
import { Button, Input, Text, TextArea } from '../shared/elements';
import { FormReturnTypes } from './types';
import Papa from 'papaparse';

const StyledContainer = styled(Container)`
  border: ${rem(1)} solid ${BackgroundPanel2};
`;

const StyledScrollArea = styled(ScrollArea)`
  height: ${rem(320)};
  max-height: 80vh;
  padding-left: ${rem(16)};
  border-top: ${rem(1)} solid ${BackgroundPanel3};
  border-bottom: ${rem(1)} solid ${BackgroundPanel3};
`;

const Contributor = styled(Group)`
  button {
    opacity: 0;
  }
  &:hover > button {
    opacity: 1;
  }
`;

type Props = {
  contributors: string[];
  errors: FormReturnTypes['errors'];
  setFieldValue: FormReturnTypes['setFieldValue'];
};

const BadgeStyled = styled(Badge)<BadgeProps & React.ComponentPropsWithoutRef<'div'>>`
  font-family: PT Mono;
`;

export const SelectContributors = ({ contributors, errors, setFieldValue }: Props) => {
  const user = useUser();
  const [searchValue, setSearchValue] = useState<string>('');
  const [contributorsTA, setContributorsTA] = useState('');
  const filteredContributors = contributors.filter((contributor) =>
    searchValue ? contributor.toLowerCase().includes(searchValue.toLowerCase()) : true,
  );

  return (
    <Grid style={{ backgroundColor: BackgroundPanel, borderRadius: 12 }}>
      <Grid.Col p={16} span={6}>
        <Stack>
          <TextArea
            label="Contributors' GitHub Usernames, E-Mails, Eth or ENS Addresses (Separated by Commas)"
            placeholder="colfax23, mail@gmail.com, dude.eth, 0x1234567890b"
            value={contributorsTA}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setContributorsTA(e.target.value);
            }}
            id="contributorsInput"
          />
          <Button
            onClick={() => {
              setFieldValue('contributors', [
                ...new Set([
                  ...contributors,
                  ...contributorsTA.split(',').map((element) => element.trim()),
                ]),
              ]);
              setContributorsTA('');
            }}
          >
            {'Add'}
          </Button>
          <Divider />
          <Text>{'Upload CSV'}</Text>
          <Dropzone
            accept={['.csv']}
            onDrop={(files) => {
              Papa.parse(files[0], {
                complete: (results) => {
                  const data = results.data[0] as string[];
                  setFieldValue('contributors', [...new Set([...contributors, ...data])]);
                },
              });
            }}
            styles={() => ({
              root: {
                width: 160,
                height: 160,
              },
              inner: {
                alignItems: 'center',
                display: 'flex',
                height: '100%',
                justifyContent: 'center',
              },
            })}
          >
            <Stack align="center">
              <MdOutlineFileUpload size={48} />
              <Text>{'Upload CSV'}</Text>
            </Stack>
          </Dropzone>
        </Stack>
      </Grid.Col>
      <Grid.Col p={16} span={6} style={{ backgroundColor: BackgroundPanel2, borderRadius: 12 }}>
        <StyledContainer p="0">
          <Text mb="xs">{`${contributors.length} Selected`}</Text>
          <StyledScrollArea>
            <List listStyleType="none" style={{ paddingBottom: rem(10) }}>
              {filteredContributors.map((contributor: string) => {
                return (
                  <List.Item key={contributor + 'list-item'}>
                    <Contributor key={contributor} mt="xs" position="apart">
                      <Text>{contributor}</Text>
                      <CloseButton
                        size="sm"
                        color="red"
                        onClick={() => {
                          setFieldValue('contributors', [
                            ...contributors.filter((c) => c !== contributor),
                          ]);
                        }}
                      />
                      {/* }
                    /> */}
                    </Contributor>
                  </List.Item>
                );
              })}
            </List>
          </StyledScrollArea>
          <Input
            placeholder={'QUICK SEARCH...'}
            value={searchValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSearchValue(e.target.value);
            }}
            style={{ marginTop: 20, width: '100%' }}
          />
        </StyledContainer>

        {errors.repos && (
          <Text style={{ color: ExtraRed }} size="xl" mt="xl" inline>
            {errors.repos}
          </Text>
        )}
      </Grid.Col>
    </Grid>
  );
};
