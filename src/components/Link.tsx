import NextLink from 'next/link';

type Props = React.ComponentProps<typeof NextLink>;

export const Link = (props: Props) => {
  const { children, ...restProps } = props;
  return (
    <NextLink {...restProps}>
      <a>{props.children}</a>
    </NextLink>
  );
};
