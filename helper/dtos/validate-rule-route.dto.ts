import { RuleFieldDto } from "./rule-field.dto";
import { ValidateNested, IsNotEmpty, IsObject } from "class-validator";

export class ValidateRuleDto {
  @ValidateNested()
  @IsNotEmpty({ message: "Rule is required." })
  @IsObject({ message: "Rule should be an object." })
  rule: RuleFieldDto;

  @IsNotEmpty({ message: "Data is required." })
  data: any;
}
