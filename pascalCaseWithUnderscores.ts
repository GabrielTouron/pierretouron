import { pascalCase } from "change-case-all";

export const pascalCaseWithUnderscores = (str: string): string => {
  const result = pascalCase(str);

  if (!result) {
    return str;
  }

  // if there is a leading underscore but it's not in the converted string, add it
  if (str.indexOf("_") === 0 && result.substring(0, 1) !== "_") {
    return `_${result}`;
  }
  return result;
}

