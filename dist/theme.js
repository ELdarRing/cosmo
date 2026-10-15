// Apply before styles load to avoid a flash of the wrong theme.
(function(){
  let saved=null;
  try{saved=localStorage.getItem('cosmo-theme');}catch{}
  const theme=saved==='dark'||saved==='light'?saved:'dark';
  document.documentElement.dataset.theme=theme;
})();
