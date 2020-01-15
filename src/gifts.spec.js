import { toggleReservation, addGift } from "./gifts";

const initialState = {
  users: [
    {
      id: 1,
      name: "Test user"
    },
    {
      id: 2,
      name: "Someone else"
    }
  ],
  currentUser: {
    id: 1,
    name: "Test user"
  },
  gifts: [
    {
      id: "immer_license",
      description: "Immer license",
      image: "TODO",
      reservedBy: 2
    },
    {
      id: "macbook_pro",
      description: "2019 MacBook pro",
      image: "TODO",
      reservedBy: undefined
    }
  ]
};

describe("Adding a gift", () => {
  const nextState = addGift(initialState, "mug", "Coffee mug", "");

  test("added a gift to the collection", () => {
    expect(nextState.gifts.length).toBe(3);
  });

  test("didn't modify the original state", () => {
    expect(initialState.gifts.length).toBe(2);
  });
});

describe("Reserving an unreserved gift", () => {
  const nextState = toggleReservation(initialState, "macbook_pro");

  test("correctly stores reservedBy", () => {
    expect(nextState.gifts[1].reservedBy).toBe(1); // Test user
  });

  test("didn't the original state", () => {
    expect(initialState.gifts[1].reservedBy).toBe(undefined);
  });
});

describe("Reserving an already reserved gift", () => {
  const nextState = toggleReservation(initialState, "immer_license");

  test("preserves stored reservedBy", () => {
    expect(nextState.gifts[0].reservedBy).toBe(2); // Someone else
  });
});
