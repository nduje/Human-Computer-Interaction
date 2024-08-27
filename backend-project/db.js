const { createClient } = require("@supabase/supabase-js");

// Replace with your Supabase project URL and public API key
const SUPABASE_URL = "https://zvduxqgtfvzzfamssvdi.supabase.co";
const SUPABASE_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2ZHV4cWd0ZnZ6emZhbXNzdmRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2OTgyODAsImV4cCI6MjA0MDI3NDI4MH0.xg1vOol5Njypcn89JjpDti06hXdWRB1YTr8bGO32GxY";

// Initialize the Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);

// Function to set up the database schema
async function setupDatabase() {
  const { error } = await supabase.rpc("setup_database");

  if (error) {
    console.error("Error setting up the database:", error.message);
  } else {
    console.log("Table created or already exists.");
  }
}

// Create the 'users' table if it doesn't exist
async function createUsersTable() {
  const { data, error } = await supabase.from("users").select("*").limit(1);

  if (error && error.code === "PGRST103") {
    console.log("Table 'users' does not exist. Creating table...");

    const { error: createError } = await supabase.rpc("create_users_table");

    if (createError) {
      console.error("Error creating 'users' table:", createError.message);
    } else {
      console.log("'users' table created successfully.");
    }
  } else if (error) {
    console.error("Error checking 'users' table:", error.message);
  } else {
    console.log("'users' table already exists.");
  }
}

// Clean up resources when the application exits
function closeDatabase() {
  console.log("Database connection closed.");
}

process.on("SIGINT", closeDatabase);

module.exports = {
  setupDatabase,
  createUsersTable,
  supabase,
};

// Call setupDatabase to ensure the schema is ready
// setupDatabase().then(createUsersTable);
