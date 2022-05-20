import NextLink from 'next/link';

type Props = React.ComponentProps<typeof NextLink>;

export const Link = (props: Props) => {
  const { children, className, ...restProps } = props;
  return (
    <NextLink {...restProps}>
      <a className={className}>{children}</a>
    </NextLink>
  );
};
