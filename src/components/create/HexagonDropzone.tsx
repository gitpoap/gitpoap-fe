import { Dropzone } from '@mantine/dropzone';
import Image from 'next/image';
import { rem } from 'polished';
import styled from 'styled-components';

import { HexagonPath, HexagonStyles } from '../shared/elements';
import { CreationFormReturnTypes } from './useCreationForm';
import { BackgroundPanel, BackgroundPanel2, BackgroundPanel3 } from '../../colors';
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '../../lib/api/gitpoapRequest';
import { Center } from '@mantine/core';

const StyledDropzone = styled(Dropzone)`
  ${HexagonStyles}

  top: ${rem(4)};
  left: ${rem(4)};

  height: ${rem(372)};
  width: ${rem(372)};

  background: ${BackgroundPanel};
  &:hover {
    background: ${BackgroundPanel2};
  }
`;

const DropzoneBorder = styled.div`
  ${HexagonStyles}

  background-image: repeating-conic-gradient(${BackgroundPanel} 0 3deg, ${BackgroundPanel3} 3deg 6deg);

  height: ${rem(380)};
  width: ${rem(380)};
`;

type Props = {
  imageUrl: string | null;
  setFieldError: CreationFormReturnTypes['setFieldError'];
  setFieldValue: CreationFormReturnTypes['setFieldValue'];
};

export const HexagonDropzone = ({ imageUrl, setFieldError, setFieldValue }: Props) => {
  return (
    <Center mt={44}>
      <DropzoneBorder>
        <StyledDropzone
          accept={ACCEPTED_IMAGE_TYPES}
          maxSize={MAX_FILE_SIZE}
          onDrop={(files) => setFieldValue(`image`, files[0])}
          onReject={(fileRejects) => {
            const { code, message } = fileRejects[0].errors[0];
            setFieldError('image', code === 'file-too-large' ? 'Max file size is 5MB.' : message);
          }}
          styles={() => ({
            inner: {
              alignItems: 'center',
              display: 'flex',
              height: '100%',
              justifyContent: 'center',
            },
          })}
        >
          {imageUrl ? <Image src={imageUrl} layout="fill" /> : <>{'Upload Art'}</>}
        </StyledDropzone>
      </DropzoneBorder>
      <HexagonPath />
    </Center>
  );
};
