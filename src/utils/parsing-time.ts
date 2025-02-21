export const formatStandardTime = (time: string) => { 
  const date = new Date(time);
  return date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

export const formatStandardDate = (time: string) => {
  const date = new Date(time);
  return date.toLocaleString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  })
}