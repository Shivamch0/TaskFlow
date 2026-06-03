import { Suspense } from "react";
import { BrowserRouter, useRoutes } from "react-router-dom";
import { routeConfig } from "./routes/routes.jsx";

const AppRouter = () => {
  return useRoutes(routeConfig);
};

function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="min-h-screen bg-slate-50 p-8 text-center text-slate-700">
            Loading TaskFlow UI...
          </div>
        }
      >
        <AppRouter />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
