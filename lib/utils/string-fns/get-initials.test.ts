import { describe, expect, test } from "bun:test"

import { getInitials } from "./get-initials"

const testNames = [
  { initials: "MV", name: "matt   venables" },
  { initials: "TB", name: "Thomas Edward Brady" },
  { initials: "U", name: "user@email.com" },
  { initials: "AD", name: "Albus Percival Wulfric Brian dumbledore" },
  { initials: "HP", name: "Harry Potter" },
  { initials: "R", name: "Ron" },
  { initials: "", name: "" },
  { initials: "ÇÉ", name: "Çigkofte With Érnie" },
  { initials: "H", name: "Hermione " },
  { initials: "NL", name: "Neville LongBottom " },
  { initials: "", name: null },
  { initials: "", name: undefined }
]

describe("getInitials()", () => {
  testNames.forEach(({ name, initials }) => {
    test(`properly handles '${name}'`, () => {
      expect(getInitials(name)).toEqual(initials)
    })
  })
})
