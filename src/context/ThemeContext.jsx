useEffect(() => {
  document.body.setAttribute("data-bs-theme", theme);
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}, [theme]);
