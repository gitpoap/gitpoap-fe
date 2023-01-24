import styled from 'styled-components';
import { rem } from 'polished';
import ImageUI from 'next/image';

type Props = {
  quality?: number;
  size?: number;
  className?: string;
  src: string;
  useDefaultImageTag?: boolean;
};

const AvatarWrapper = styled.div<{ size: number }>`
  height: ${({ size }) => rem(size)};
  width: ${({ size }) => rem(size)};
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

export const Avatar = ({ quality = 100, size = 80, className, src, useDefaultImageTag }: Props) => (
  <AvatarWrapper className={className} size={size}>
    {useDefaultImageTag ? (
      <DefaultImage src={src} alt="" />
    ) : (
      <Image src={src} quality={quality} alt="" width={size} height={size} />
    )}
  </AvatarWrapper>
);
