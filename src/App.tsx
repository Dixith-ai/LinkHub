import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Projects from "./pages/Projects";
import { useState, useEffect } from "react";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="page-transition">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="*" element={<div className="min-h-screen flex items-center justify-center text-foreground/60">Page not found</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
