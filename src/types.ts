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

export interface CardCell {
  name: 'Main Paw' | 'Second Paw' | 'Main Body' | 'Second Body' | '1' | '2' | '3' | '4' | '5' | '6'
  item: string | null
}

export interface BodyBack {
  'Main Paw': CardCell,
  'Main Body': CardCell,
  'Second Paw': CardCell,
  'Second Body': CardCell
}

export interface StoreBodyBack {
  value: BodyBack
}

export interface PackBack {
  1: CardCell
  2: CardCell
  3: CardCell
  4: CardCell
  5: CardCell
  6: CardCell
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
  background: string
  bodyBack: BodyBack
  packBack: PackBack
  birthSign: string
  coat: string
  details: string
  grit: number
}

export type StatKeys = 'exp' | 'maxStr' | 'str' | 'maxDex' | 'dex' | 'maxWil' | 'wil' | 'maxHp' | 'hp' | 'startPips' | 'pips' | 'grit'

export type DescriptionKeys = 'name' | 'background' | 'birthSign' | 'coat' | 'details'

export type BackgroundKeys = 1 | 2 | 3 | 4 | 5 | 6