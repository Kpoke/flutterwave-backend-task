import * as express from "express";
import * as cors from "cors";

import { ResponseStructure } from "./helper/response.interface";
import { Status } from "./helper/status.enum";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req: express.Request, res: express.Response) => {
  const response: ResponseStructure = {
    message: "My Rule-Validation API",
    status: Status.SUCCESS,
    data: {
      name: "Daniel Olojakpoke",
      github: "@Kpoke",
      email: "danielolojakpoke@gmail.com",
      mobile: "08142216263",
      twitter: "@danielholodja",
    },
  };
  res.json(response);
});

app.listen(port, () => {
  console.log("server up and running");
});
