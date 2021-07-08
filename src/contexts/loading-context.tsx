import React from "react";

export const LoadingContext = React.createContext(
  {} as {
    show: () => void;
    hide: () => void;
  }
);

export const useLoadingContext = () => React.useContext(LoadingContext);
