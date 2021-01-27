import * as express from "express";
import * as cors from "cors";
import { validate } from "class-validator";

import { ResponseStructure } from "./helper/response.interface";
import { Status } from "./helper/status.enum";
import { ValidateRuleDto } from "./helper/dtos/validate-rule-route.dto";
import { RuleFieldDto } from "./helper/dtos/rule-field.dto";
import { validateRule } from "./helper/vallidateRule";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use(
  (
    error: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const response: ResponseStructure = {
      message: error.message.includes("JSON")
        ? `Invalid JSON payload passed.`
        : `${error.message}.`,
      status: Status.ERROR,
      data: null,
    };
    res.status(error.status || 500).json(response);
  }
);

app.get("/", (req: express.Request, res: express.Response) => {
  const response: ResponseStructure = {
    message: "My Rule-Validation API.",
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

app.post(
  "/validate-rule",
  async (req: express.Request, res: express.Response) => {
    const { rule, data } = req.body;
    let validateJson = new ValidateRuleDto();
    let ruleField = new RuleFieldDto();
    ruleField.field = rule.field;
    ruleField.condition = rule.condition;
    ruleField.condition_value = rule.condition_value;

    validateJson.rule = ruleField;
    validateJson.data = data;

    const errors = await validate(validateJson);
    if (errors.length > 0) {
      const response: ResponseStructure = {
        message: ``,
        status: Status.ERROR,
        data: null,
      };
      if (errors[0].children.length > 0) {
        response.message = `${
          Object.values(errors[0].children[0].constraints)[0]
        }`;
        return res.status(400).json(response);
      }
      response.message = `${Object.values(errors[0].constraints)[0]}`;
      return res.status(400).json(response);
    }

    const response: ResponseStructure = validateRule(
      validateJson.rule,
      validateJson.data
    );
    res.status(response.status === Status.ERROR ? 400 : 200).json(response);
  }
);

app.get("/*", (req: express.Request, res: express.Response) => {
  const response: ResponseStructure = {
    message: `Endpoint not found.`,
    status: Status.ERROR,
    data: null,
  };
  res.status(404);
  res.json(response);
});

app.listen(port, () => {
  console.log("server up and running");
});
