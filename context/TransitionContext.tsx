'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type TransitionContextType = {
  isTransitioning: boolean;
  setIsTransitioning: (value: boolean) => void;
};

const TransitionContext = createContext<TransitionContextType>({
  isTransitioning: false,
  setIsTransitioning: () => {},
});

export const TransitionProvider = ({ children }: { children: ReactNode }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  return (
    <TransitionContext.Provider value={{ isTransitioning, setIsTransitioning }}>
      {children}
    </TransitionContext.Provider>
  );
};

export const useTransition = () => useContext(TransitionContext);
