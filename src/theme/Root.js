import React, { useEffect } from 'react';
import { useLocation } from '@docusaurus/router';

export default function Root({ children }) {
  const location = useLocation();

  useEffect(() => {
    // Add class to body to indicate JS is active and animations should run
    document.body.classList.add('hk-animations-enabled');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('hk-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -40px 0px', threshold: 0.05 });

    const observeElements = () => {
      const elements = document.querySelectorAll('.hk-proj, .hk-thread, .hk-paper, .hk-toolbox li, .hk-now p, .hk-frame, .hk-section__h, .hk-section__sub, .hk-tagbar, .hk-aside');
      elements.forEach((el) => {
        if (!el.classList.contains('hk-revealed') && !el.classList.contains('hk-reveal-init')) {
          el.classList.add('hk-reveal-init');
          observer.observe(el);
        }
      });
    };

    // Small delay to allow React to flush to DOM
    const timeout = setTimeout(observeElements, 50);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, [location.pathname]);

  return <>{children}</>;
}