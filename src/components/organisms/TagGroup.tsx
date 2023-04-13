import { DetailedHTMLProps, FC, HTMLAttributes } from "react";

interface TagsProps<TData> {
  tagsData: TData[];
  children: (item: TData) => JSX.Element;
}
const classNames = (defaultStyles: string, addedStyles: string) =>
  defaultStyles.split(" ").concat(addedStyles.split(" ")).join(" ");

type Props<T> = TagsProps<T> &
  Omit<
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    "children"
  >;

const Root = <TData,>({
  tagsData,
  children,
  className,
  ...rest
}: Props<TData>) => {
  return (
    <div className={classNames(`flex flex-wrap`, className || "")} {...rest}>
      {tagsData.map((tag) => children(tag))}
    </div>
  );
};

type TagProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const Tag: FC<TagProps> = ({ children, className }) => (
  <div className={classNames("space-x-1 text-center", className || "")}>
    {children}
  </div>
);

export const Tags = Object.assign(Root, { Tag });
