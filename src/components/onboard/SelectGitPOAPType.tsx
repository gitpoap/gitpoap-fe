import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { Stack, Radio, Text, TextProps, Button, Group } from '@mantine/core';
import { rem } from 'polished';
import styled from 'styled-components';
import { TextLight, TextGray } from '../../colors';
import { RadioGroup } from '../shared/elements';

const Description = styled(Text)<TextProps>`
  color: ${TextGray};
`;

const SelectionContainer = styled(Stack)`
  max-width: ${rem(500)};
`;

enum GitPOAPType {
  CUSTOM = 'Custom',
  GITHUB_BASED = 'Github-based',
  DISCORD_BASED = 'Discord-based',
}

export const SelectGitPOAPType = () => {
  const router = useRouter();

  const [gitPOAPType, setGitPOAPType] = useState<string>(GitPOAPType.GITHUB_BASED);

  return (
    <Group position="center">
      <SelectionContainer align="flex-start" py={0} px={rem(20)}>
        <RadioGroup value={gitPOAPType} onChange={setGitPOAPType} orientation="vertical" required>
          <Stack>
            <Radio
              value={GitPOAPType.CUSTOM}
              label={
                <Text size={20} color={TextLight}>
                  {'Custom'}
                </Text>
              }
            />
            <Description size={12} ml={rem(30)}>
              {
                'Description text description text description text description text description text description text'
              }
            </Description>
          </Stack>
          <Stack mt={rem(10)}>
            <Radio
              value={GitPOAPType.GITHUB_BASED}
              label={
                <Text size={20} color={TextLight}>
                  {'Github-based'}
                </Text>
              }
            />
            <Description size={12} ml={rem(30)}>
              {'Description text description text'}
            </Description>
          </Stack>
          <Stack mt={rem(10)}>
            <Radio
              value={GitPOAPType.DISCORD_BASED}
              label={<Description size={20}>{'Discord-based'}</Description>}
              disabled
            />
            <Description size={12} ml={rem(30)}>
              {'Coming soon'}
            </Description>
          </Stack>
        </RadioGroup>

        <Button onClick={() => router.push(`/onboard`)} mt={rem(30)}>
          {'Continue'}
        </Button>
      </SelectionContainer>
    </Group>
  );
};
