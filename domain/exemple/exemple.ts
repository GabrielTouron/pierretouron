export type Status = "tata" | "toto" | "tutu"

export type Exemple = {
  prop1: OtherType
  prop2: string
  status: Status
}

export type OtherType = {
  prop1: string
  prop2: string
}

export const createExemple = (otherType: OtherType, prop2: string, status: Status) : Exemple => {
  return {
    prop1: otherType,
    prop2,
    status
  }
}