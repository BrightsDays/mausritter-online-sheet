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

export enum ItemGroup {
  Items = 'items'
}

export interface BackgroundList {
  [key: string] : {
    [key: string] : Background
  }
}

export interface Background {
  background: string,
  itemA: string,
  itemB: string
}

export interface ConditionsList {
  [key: string] : {
    title: string,
    description: string,
    clear: string
  }
}

export interface Condition {
  title: string,
  description: string,
  clear: string
}

export interface Item {
  title: string;
  stat: ItemStat;
  image: string;
  type: ItemType;
  group: ItemGroup;
}