export default class Try<T> {
  public readonly isSuccess: boolean
  private readonly result?: T

  constructor(fn: () => T) {
    try {
      this.result = fn()
      this.isSuccess = true
    } catch {
      this.isSuccess = false
    }
  }

  public getOrElse = (defaultValue: T) => {
    return this.result || defaultValue
  }

  public get = () => this.result!
}
