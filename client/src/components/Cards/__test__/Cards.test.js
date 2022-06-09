/* eslint-disable testing-library/no-render-in-setup */
import { render, screen } from "@testing-library/react";
import userEvents from "@testing-library/user-event";
import Cards from "../Cards";
import cats from "../../../mocks/cats.json";

describe("Cards", () => {
  beforeEach(() => {
    render(<Cards cats={cats}></Cards>);
  });

  test("should render five card component", () => {
    expect(screen.getAllByRole("article").length).toBe(5);
  });
});
