import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { pokemonApi } from './api';
import globalReducer from './globalSlice'; // import the global slice

export const store = configureStore({
  reducer: {
    // Add API slice
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    // Add your custom global reducer
    global: globalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

setupListeners(store.dispatch);
