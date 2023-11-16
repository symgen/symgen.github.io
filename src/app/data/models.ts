export const types = ["GPT-4"] as const

export type ModelType = (typeof types)[number]

export interface Model<Type = string> {
  id: string
  name: string
  description?: string
  strengths?: string
  type: Type
}

export const models: Model<ModelType>[] = [
  {
    id: "c305f976-8e38-42b1-9fb7-d21b2e34f0da",
    name: "gpt4-0613",
    type: "GPT-4",
  },
]
