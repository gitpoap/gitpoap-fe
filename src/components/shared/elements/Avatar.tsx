import styled from 'styled-components';
import { rem } from 'polished';
import ImageUI from 'next/image';

type Props = {
  quality?: number;
  className?: string;
  src: string;
  useDefaultImageTag?: boolean;
};

const AvatarWrapper = styled.div`
  height: ${rem(80)};
  width: ${rem(80)};
  position: relative;
`;

const Image = styled(ImageUI)`
  border-radius: 50%;
`;

const DefaultImage = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
`;

export const Avatar = ({ quality = 100, className, src, useDefaultImageTag }: Props) => {
  return (
    <AvatarWrapper className={className}>
      {useDefaultImageTag ? (
        <DefaultImage src={src} alt="" />
      ) : (
        <Image
          src={src}
          fill
          quality={quality}
          alt=""
          sizes={`(max-width: 768px) ${rem(80)}, ${rem(80)}`}
        />
      )}
    </AvatarWrapper>
  );
};
