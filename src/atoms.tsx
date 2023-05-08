import { atom, selector } from "recoil";
export const minuteState = atom({
  key: "minutes",
  default: 0,
});

export const hourSelector = selector<number>({
  key: "hours",
  get: ({ get }) => {
    const minutes = get(minuteState);
    return Math.floor(minutes / 60);
  },
  set: ({ set }, newValue) => {
    set(minuteState, +newValue * 60);
  },
});
