export function getScssVariableValue(variableName: string): string {
  const value = getComputedStyle(document.documentElement).getPropertyValue(variableName);
  return value;
}
