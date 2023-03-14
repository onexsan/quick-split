type SplitType = {
  sum: number;
  divideBy: number;
  tip?: number;
};
export const useSplit = function ({
  sum,
  divideBy,
  tip = 0,
}: SplitType): number {
  if (divideBy === 0) return 0;
  const finalSum = tip > 0 ? sum + (sum / 100) * tip : sum;
  return Math.ceil(finalSum / divideBy);
}
