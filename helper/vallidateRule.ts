import { RuleFieldDto } from "./dtos/rule-field.dto";
import { RuleCondition } from "./rule-condition.enum";
import { ResponseStructure } from "./response.interface";
import { Status } from "./status.enum";

export const validateRule = (
  rule: RuleFieldDto,
  data: any
): ResponseStructure => {
  if (!data[rule.field]) {
    const response: ResponseStructure = {
      message: `field ${rule.field} is missing from data.`,
      status: Status.ERROR,
      data: null,
    };

    return response;
  }
  const generateResponse = (
    error: Boolean,
    field: String
  ): ResponseStructure => {
    let message: string, status: Status;
    if (error) {
      message = `field ${field} failed validation.`;
      status = Status.ERROR;
    } else {
      message = `field ${field} successfully validated.`;
      status = Status.SUCCESS;
    }
    const response: ResponseStructure = {
      message,
      status,
      data: {
        validation: {
          error,
          field,
          field_value: data[rule.field],
          condition: rule.condition,
          condition_value: rule.condition_value,
        },
      },
    };

    return response;
  };

  switch (rule.condition) {
    case RuleCondition.NEQ:
      if (data[rule.field] !== rule.condition_value) {
        return generateResponse(false, rule.field);
      }
      return generateResponse(true, rule.field);

    case RuleCondition.GTE:
      if (data[rule.field] >= rule.condition_value) {
        return generateResponse(false, rule.field);
      }
      return generateResponse(true, rule.field);

    case RuleCondition.GT:
      if (data[rule.field] > rule.condition_value) {
        return generateResponse(false, rule.field);
      }
      return generateResponse(true, rule.field);

    case RuleCondition.EQ:
      if (data[rule.field] === rule.condition_value) {
        return generateResponse(false, rule.field);
      }
      return generateResponse(true, rule.field);

    case RuleCondition.CONTAINS:
      if (data[rule.field].includes(rule.condition_value)) {
        return generateResponse(false, rule.field);
      }
      return generateResponse(true, rule.field);
  }
};
