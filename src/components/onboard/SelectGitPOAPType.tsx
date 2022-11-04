import React, { useState } from 'react';
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
      <SelectionContainer align="center" py={0} px={rem(20)}>
        <RadioGroup value={gitPOAPType} onChange={setGitPOAPType} orientation="vertical" required>
          <Stack spacing="xs">
            <Radio
              value={GitPOAPType.CUSTOM}
              label={
                <Text size={20} color={TextLight}>
                  {'Custom'}
                </Text>
              }
              sx={{ label: { display: 'flex', alignItems: 'center' } }}
            />
            <Description size={14} ml={rem(33)}>
              {
                'Description text description text description text description text description text description text'
              }
            </Description>
          </Stack>
          <Stack mt={rem(10)} spacing="xs">
            <Radio
              value={GitPOAPType.GITHUB_BASED}
              label={
                <Text size={20} color={TextLight}>
                  {'Github-based'}
                </Text>
              }
              sx={{ label: { display: 'flex', alignItems: 'center' } }}
            />
            <Description size={14} ml={rem(33)}>
              {'Description text description text'}
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
