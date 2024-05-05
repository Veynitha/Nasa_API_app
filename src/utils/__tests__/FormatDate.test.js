import { formatDate, formatDayJsDate } from "../helper/FormatDate"; // Import the functions

describe("formatDate", () => {
  it("formats date correctly", () => {
    const date = new Date("2024-05-03");
    expect(formatDate(date)).toBe("2024-05-03");
  });

  it("formats single digit month and day correctly", () => {
    const date = new Date("2024-01-01");
    expect(formatDate(date)).toBe("2024-01-01");
  });

  it("formats date with zero-padded month and day correctly", () => {
    const date = new Date("2024-10-10");
    expect(formatDate(date)).toBe("2024-10-10");
  });
});

describe("formatDayJsDate", () => {
  it("formats Day.js date correctly", () => {
    const date = { $y: 2024, $M: 4, $D: 3 }; // Month is zero-indexed in Day.js
    expect(formatDayJsDate(date)).toBe("2024-5-3");
  });

  it("formats Day.js date with single digit month and day correctly", () => {
    const date = { $y: 2024, $M: 0, $D: 1 };
    expect(formatDayJsDate(date)).toBe("2024-1-1");
  });

  it("formats Day.js date with zero-padded month and day correctly", () => {
    const date = { $y: 2024, $M: 9, $D: 10 };
    expect(formatDayJsDate(date)).toBe("2024-10-10");
  });
});
