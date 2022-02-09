/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface Payload {
  statName: string,
  statValue: number
}

interface BackgroundList {
  [key: string] : {
    [key: string] : Background
  }
}

interface Background {
  background: string,
  itemA: string,
  itemB: string
}

interface ConditionsList {
  [key: string] : {
    title: string,
    description: string,
    clear: string
  }
}
