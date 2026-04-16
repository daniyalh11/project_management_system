exports.getReports = (req, res) => {
  res.setHeader("Content-Type", "application/json");

  const data = Array.from({ length: 1000 }, (_, i) => ({
    id: i,
    value: `Report ${i}`
  }));

  data.forEach(item => {
    res.write(JSON.stringify(item) + "\n");
  });

  res.end();
};