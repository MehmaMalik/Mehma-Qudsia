import { useEffect } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
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

function RouteSeoManager() {
  const [location] = useLocation();

  useEffect(() => {
    let title = "Mehma Qudsia — Founder of Brandit | Portfolio";
    let desc =
      "Portfolio of Mehma Qudsia, Founder of Brandit — showcasing high-performance custom websites, GoHighLevel funnels & automations, Shopify builds, and AI applications.";

    if (location.includes("kw-boats")) {
      title = "Key West Boat Tours & Charters — Case Study | Mehma Qudsia";
      desc =
        "Live interactive preview and conversion breakdown for Key West Boat Tours luxury marine booking platform built by Mehma Qudsia.";
    } else if (location.includes("skin-edit") || location.includes("luna-skin-lab")) {
      title = "Luna Skin Lab — Med Spa & Aesthetic Clinic Funnel | Mehma Qudsia";
      desc =
        "Live preview of the high-ticket medical aesthetics lead generation and booking funnel engineered by Mehma Qudsia.";
    } else if (location.includes("glp1") || location.includes("glp-1")) {
      title = "GLP-1 Weight Loss Telehealth Funnel | Mehma Qudsia";
      desc =
        "High-converting direct response telehealth sales funnel for GLP-1 weight loss protocols built with custom GoHighLevel automations.";
    } else if (location.startsWith("/admin") || location.startsWith("/wp-admin")) {
      title = "CMS Database & Project Manager | Brandit";
      desc = "Secure administrative interface for managing portfolio websites and case studies.";
    }

    document.title = title;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", desc);
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute("content", title);
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute("content", desc);
    }
  }, [location]);

  return null;
}

function Router() {
  return (
    <>
      <RouteSeoManager />
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
    </>
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
