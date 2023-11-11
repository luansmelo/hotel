(async () => {
  const app = (await import("./config/app")).default;
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
  });
})();
