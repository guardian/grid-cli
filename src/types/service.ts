import { URL } from 'url'

interface Data {
  description: string
}

interface Service {
  rel: string,
  href: URL
}

interface Services {
  data: Data,
  links: Service[]
}

export {
  Data,
  Service,
  Services,
}
