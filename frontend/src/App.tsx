import React from 'react';
import { ReactQueryDevtools } from "react-query/devtools";
import AppRoutes from "./routes";
import { ThemeProvider } from "styled-components";
import { theme, GlobalStyle } from "./styles";
import { QueryClientProvider, QueryClient } from "react-query";
import { AuthProvider } from "./hooks/useAuth";
import { AuthService } from "./utils";

const queryClient = new QueryClient();
const Auth = new AuthService();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <AuthProvider initialState={Auth.getAuth()}>
          <AppRoutes />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}