const Try = (fn: () => any) => {
  try {
    return fn()
  } catch {
    return false
  }
}

export default Try
