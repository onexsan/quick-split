type SplitType = {
  sum: number,
  divideBy: number,
  tip?: number
}
export default function useSplit ({sum, divideBy, tip = 0}: SplitType) {
  const finalSum = tip > 0 ? sum + (sum / 100 * tip) : sum
  return finalSum / divideBy
}