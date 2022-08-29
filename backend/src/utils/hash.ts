import fnv from "fnv-plus";

export const hash = (str: string) => {
  return fnv.hash(str, 63).dec()
}