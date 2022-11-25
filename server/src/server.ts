import app from "./app";
import mongoose from "mongoose";

mongoose
  .connect(`${process.env.MONGODB_LINK}`, { dbName: "list_and_group" })
  .then((res) => {
    console.log("Database Successfully Connected! ✅ ");
  })
  .catch((err) => {
    console.log("DATABASE NOT CONNECTED! ❌ ");
    console.log(err);
  });

app.listen(process.env.PORT, () => {
  console.log(
    `Server is listening on http://localhost:${process.env.PORT} ✅ `
  );
});

export default app;
