const preloaderScript = `
  (function() {
    if (sessionStorage.getItem('hasVisited')) {
      var style = document.createElement('style');
      style.innerHTML = '#preloader { display: none !important; }';
      document.head.appendChild(style);
    } else {
      sessionStorage.setItem('hasVisited', 'true');
    }
  })();
`;

export const PreloaderScript = () => (
  <script dangerouslySetInnerHTML={{ __html: preloaderScript }} />
);