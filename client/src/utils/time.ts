
export function getTimeDisplay(timestamp: number) {
  return new Date(timestamp).toLocaleDateString()
}