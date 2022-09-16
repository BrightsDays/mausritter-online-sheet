export enum ItemStat {
  Small = 'd6',
  Medium = 'd6/d8',
  None = ''
}

export enum ItemType {
  Improvised = 'Improvised',
  Light = 'Light',
  Medium = 'Medium',
  Ranged = 'Light ranged',
  Ammunition = 'Ammunition',
  Utility = 'Utility'
}

export interface Background {
  background: string,
  itemA: string,
  itemB: string
}

export interface Condition {
  title: string
  description: string
  clear: string
  group: 'conditions'
}

export interface Item {
  title: string
  stat: ItemStat
  image: string
  type: ItemType
  group: 'items'
}

export interface Character {
  name: string
  exp: number
  maxStr: number
  str: number
  maxDex: number
  dex: number
  maxWil: number
  wil: number
  maxHp: number
  hp: number
  startPips: number
  pips: number
  background: ''
  bodyBack: {}
  packBack: {}
  birthSign: string
  coat: string
  details: string
  grit: number
}

export type CharacterKeys = 'name' | 'exp' | 'maxStr' | 'str' | 'maxDex' | 'dex'
  | 'maxWil' | 'wil' | 'maxHp' | 'hp' | 'startPips' | 'pips' | 'background' | 'birthSign'
  | 'coat' | 'details' | 'grit'