export namespace AddTag {

  export type Params = {
    id?: string
    name: string,
  }
  export type Result = {
    id: string
    name: string
    created_At: Date
    updated_At: Date
  } | boolean

}
export interface CreateTag {
  createTag: (tagName: AddTag.Params) => Promise<AddTag.Result>
}
