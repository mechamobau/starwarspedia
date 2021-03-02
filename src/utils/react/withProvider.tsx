import React, { ComponentType } from "react";

const withProvider = <ProviderProps extends {}>(
  Provider: ComponentType<ProviderProps>
) => <Props extends {}>(Component: ComponentType<Props>) => (
  props: Props & ProviderProps
) => (
  <Provider {...(props as ProviderProps)}>
    <Component {...(props as Props)} />
  </Provider>
);

export default withProvider;
