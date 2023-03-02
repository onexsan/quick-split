type SplitType = {
  sum: number;
  divideBy: number | undefined;
  tip?: number;
};
export default function useSplit({
  sum,
  divideBy,
  tip = 0,
}: SplitType): number {
  if (!divideBy) return 0;
  const finalSum = tip > 0 ? sum + (sum / 100) * tip : sum;
  return Math.ceil(finalSum / divideBy);
}
