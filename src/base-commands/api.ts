import HttpCommand from './http'

export default abstract class ApiCommand extends HttpCommand {
  protected async fetchImage(id: string, suffix?: string) {
    const mainEndpoint = `${this.profile!.mediaApiHost}images`

    const endpoint = id ? `${mainEndpoint}/${id}${suffix ? `/${suffix}` : ''}` : mainEndpoint

    const url = new URL(endpoint)
    return this.http!.get(url).then(_ => _.json())
  }
}
