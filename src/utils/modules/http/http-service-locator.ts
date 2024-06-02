import { Http } from './http-service'

function getEndpoint(serviceName: string) {
  const endpoint = import.meta.env.VITE_APP_API_ENDPOINT
  const apiPath = serviceName
  return endpoint + apiPath
}

export class ServiceLocator {
  services: { [x: string]: Http } = {}

  constructor(names: { [x: string]: string } = {}) {
    Object.values(names).forEach((name) => {
      this.services[name] = new Http(getEndpoint(name))
    })
  }

  registerService(service: Http) {
    this.services[service.name as string] = service
  }

  getService(name: string): Http {
    try {
      if (!this.services[name]) {
        throw new Error(`Service ${name} does not exist`)
      }
    } catch (error) {
      console.error(error)
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.services[name] as any
  }
}
