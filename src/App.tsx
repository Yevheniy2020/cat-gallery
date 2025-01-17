import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainPage from "./view/main/main-page";
import axios from "axios";
import Layout from "./components/layout/layout";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.headers.common["x-api-key"] = import.meta.env.VITE_API_KEY;
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <MainPage />
      </Layout>
    </QueryClientProvider>
  );
}

export default App;
