import { Image, Radio, Center, SimpleGrid } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';

import { Text } from '../shared/elements';
import { RadioGroup } from '../shared/elements';

type Props = {
  getInputProps: any;
  setFieldValue: any;
  values: {
    images: File[];
    shouldGitPOAPDesign: string;
  };
};

export const UploadDesigns = ({ getInputProps, setFieldValue, values }: Props) => {
  const previews = values.images.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Image
        key={index}
        src={imageUrl}
        imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
      />
    );
  });

  return (
    <>
      <Center mt="xl" mb="xl">
        <RadioGroup orientation="vertical" required {...getInputProps('shouldGitPOAPDesign')}>
          <Radio value="true" label={<Text>{'Have our designers create your GitPOAPs'}</Text>} />
          <Radio value="false" label={<Text>{'Submit your own designs'}</Text>} />
        </RadioGroup>
      </Center>

      {values.shouldGitPOAPDesign === 'false' && (
        <>
          <Dropzone
            mt="xl"
            accept={IMAGE_MIME_TYPE}
            onDrop={(files) => setFieldValue(`images`, files)}
          >
            {(status) => <Text align="center">Drop images here</Text>}
          </Dropzone>

          <SimpleGrid
            cols={4}
            breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
            mt={previews.length > 0 ? 'xl' : 0}
          >
            {previews}
          </SimpleGrid>
        </>
      )}
    </>
  );
};
