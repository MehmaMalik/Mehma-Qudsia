import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import KWBoatsPreview from "@/pages/KWBoatsPreview";
import SkinEditPreview from "@/pages/SkinEditPreview";
import GLP1StalledPreview from "@/pages/GLP1StalledPreview";
import AdminDashboard from "@/pages/AdminDashboard";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/wp-admin" component={AdminDashboard} />
      <Route path="/preview/kw-boats" component={KWBoatsPreview} />
      <Route path="/projects/kw-boats" component={KWBoatsPreview} />
      <Route path="/preview/skin-edit">{() => <SkinEditPreview />}</Route>
      <Route path="/preview/luna-skin-lab">{() => <SkinEditPreview />}</Route>
      <Route path="/projects/skin-edit">{() => <SkinEditPreview />}</Route>
      <Route path="/preview/glp1-stalled">{() => <GLP1StalledPreview />}</Route>
      <Route path="/preview/glp-1">{() => <GLP1StalledPreview />}</Route>
      <Route path="/projects/glp1-stalled">{() => <GLP1StalledPreview />}</Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
