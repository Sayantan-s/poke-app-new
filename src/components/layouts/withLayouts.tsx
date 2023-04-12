import { ComponentType } from "react";

export const withLayout = <TProps extends object>(
  WrappedComponent: ComponentType<TProps>
) => {
  const Component = (props: TProps) => (
    <main className="max-w-5xl mx-auto h-screen">
      <WrappedComponent {...props} />
    </main>
  );
  return Component;
};
