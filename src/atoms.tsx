import { atom, selector } from "recoil";
const items = window.localStorage.getItem("items");
export type Categories = string;
export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}
export const categories = atom<Categories[]>({
  key: "categories",
  default: ["TODO", "Doing", "Done"],
});
export const categoryState = atom<Categories>({
  key: "category",
  default: "TODO",
});
export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: JSON.parse(items ? items : "[]"),
});

export const toDoSelector = selector({
  key: "toDOSelector",
  get: ({ get }) => {
    const category = get(categoryState);
    const toDos = get(toDoState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
