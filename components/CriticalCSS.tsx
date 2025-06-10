// components/CriticalCSS.tsx
export function CriticalCSS() {
  // LCP 개선을 위한 중요 스타일만 인라인으로 처리
  const criticalStyles = `
    /* Critical CSS for above-the-fold content */
    *,::after,::before{box-sizing:border-box}
    html{-webkit-text-size-adjust:100%;line-height:1.15;scroll-behavior:smooth}
    body{margin:0;font-family:var(--font-pretendard),system-ui,-apple-system,sans-serif}
    main{display:block}
    h1,h2,h3,h4,h5,h6{margin:0}
    p{margin:0}
    button{font-family:inherit;font-size:100%;line-height:1.15;margin:0;text-transform:none}
    button,[type=button]{-webkit-appearance:button}
    :root{--background:0 0% 100%;--foreground:0 0% 0%;--primary:217 100% 50%}
    .dark{--background:0 0% 0%;--foreground:0 0% 100%;--primary:217 100% 60%}
    body{background-color:hsl(var(--background));color:hsl(var(--foreground))}
    .min-h-screen{min-height:100vh}
    .flex{display:flex}
    .flex-col{flex-direction:column}
    .relative{position:relative}
    .flex-1{flex:1 1 0%}
    
    /* Hero section critical styles */
    .hero-section{display:flex;align-items:center;justify-content:center;min-height:100vh}
    
    /* Font loading optimization */
    .font-sans{font-family:var(--font-pretendard),system-ui,sans-serif}
    
    /* Prevent layout shift */
    img,video{height:auto;max-width:100%}
    
    /* Skeleton loader for dynamic content */
    .skeleton{animation:skeleton-loading 1s linear infinite alternate}
    @keyframes skeleton-loading{0%{background-color:hsl(200,20%,80%)}100%{background-color:hsl(200,20%,95%)}}
    .dark .skeleton{animation:skeleton-loading-dark 1s linear infinite alternate}
    @keyframes skeleton-loading-dark{0%{background-color:hsl(200,20%,20%)}100%{background-color:hsl(200,20%,25%)}}
  `;

  return (
    <style
      dangerouslySetInnerHTML={{ __html: criticalStyles }}
      data-critical="true"
    />
  );
}
