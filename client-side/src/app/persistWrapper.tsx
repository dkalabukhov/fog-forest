'use client';

import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from '@/store/store';

export const PersistWrapper = ({ children }: { children: React.ReactNode }) => {
  if (typeof window === 'undefined') return null;

  return (
    <PersistGate loading={null} persistor={persistor}>
      {children}
    </PersistGate>
  );
};