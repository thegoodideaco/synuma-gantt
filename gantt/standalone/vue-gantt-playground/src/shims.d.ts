import * as D3 from "d3"
import Vue, { VueConstructor } from "vue"

declare global {
  interface Window {
    d3: D3
    vue: VueConstructor & typeof Vue
  }
}
