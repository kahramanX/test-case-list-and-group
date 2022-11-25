import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import router from "./routes/apiRoutes";

const app = express();
dotenv.config();

// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
//const itemRouter = express.Router({ mergeParams: true });

app.use(express.json());
express.urlencoded({ extended: true, limit: "5000kb" });

app.use("/api", router);

// Test
/* import MemberModel from "./models/MemberSchema";
import GroupModel from "./models/GroupSchema";

app.get("/test/:id", (req: Request, res: Response) => {
  MemberModel.findOne({ _id: req.params.id })
    .populate("group ") // key to populate
    .exec()
    .then((user: any) => {
      console.log(user);
      res.json(user);
    });
}); */

export default app;
