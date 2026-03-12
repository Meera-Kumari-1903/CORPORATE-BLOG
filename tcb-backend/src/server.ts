import app from "./app.js";
import listEndpoints from "express-list-endpoints";

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);

  // Show all routes for debugging
  console.log("\n📌 Available Routes:");
  console.table(listEndpoints(app));
});

// Handle server errors (like port already in use)
server.on("error", (error: any) => {
  if (error.code === "EADDRINUSE") {
    console.error(`❌ Port ${PORT} is already in use.`);
    console.log("👉 Kill the process or change the port.");
  } else {
    console.error("❌ Server Error:", error);
  }
});