import { HonoRequest } from "hono";

export interface Context {
  req: HonoRequest & {
    remoteAddr?: string
  }
}
