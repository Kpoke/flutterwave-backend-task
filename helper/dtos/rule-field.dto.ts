import { RuleCondition } from "../rule-condition.enum";
import { IsString, IsIn, IsNotEmpty } from "class-validator";

export class RuleFieldDto {
  @IsString({ message: "Field should be a string." })
  @IsNotEmpty({ message: "Field is required." })
  field: string;

  @IsIn(Object.values(RuleCondition))
  @IsNotEmpty({ message: "Condition is required." })
  condition: RuleCondition;

  @IsNotEmpty({ message: "condition_value is required." })
  condition_value: any;
}
