import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import HowItWorks from "./pages/HowItWorks";
import CaseStudies from "./pages/CaseStudies";
import VsCompetitors from "./pages/VsCompetitors";
import Pricing from "./pages/Pricing";
import Partnerships from "./pages/Partnerships";
import { Redirect } from "wouter";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import FAQ from "./pages/FAQ";
import Glossary from "./pages/Glossary";
import Creator from "./pages/Creator";
import Admin from "./pages/Admin";
import DemoModal from "./components/DemoModal";
import { useState, createContext, useContext } from "react";

// Global demo modal context so any component can open it
interface DemoModalContextType {
  openDemo: () => void;
}
export const DemoModalContext = createContext<DemoModalContextType>({ openDemo: () => {} });
export const useDemoModal = () => useContext(DemoModalContext);

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/how-it-works" component={HowItWorks} />
      <Route path="/case-studies" component={CaseStudies} />
      <Route path="/vs-competitors" component={VsCompetitors} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/content-in-motion"><Redirect to="/how-it-works" /></Route>
      <Route path="/partnerships" component={Partnerships} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/faq" component={FAQ} />
      <Route path="/glossary" component={Glossary} />
      <Route path="/creator" component={Creator} />
      <Route path="/admin" component={Admin} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <DemoModalContext.Provider value={{ openDemo: () => setDemoOpen(true) }}>
            <Toaster />
            <Router />
            <DemoModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />
          </DemoModalContext.Provider>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
