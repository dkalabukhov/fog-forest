import {
  configureStore,
  combineReducers,
  ThunkAction,
  Action,
  Reducer,
} from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { cartSlice } from './cart/cart.slice';
import { PersistPartial } from 'redux-persist/es/persistReducer';

const rootReducer = combineReducers({
  cart: cartSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const persistConfig = {
  key: 'fog-forest',
  storage,
  whitelist: ['cart'],
};

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

const createReducer = (): Reducer<RootState & PersistPartial> => {
  const isClient = typeof window !== 'undefined';
  return isClient
    ? persistedReducer
    : (rootReducer as unknown as Reducer<RootState & PersistPartial>);
};

export const makeStore = () =>
  configureStore({
    reducer: createReducer(),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });

export const store = makeStore();
export const persistor = persistStore(store);

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export type TypeRootState = AppState;

