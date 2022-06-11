/* eslint-disable testing-library/no-render-in-setup */
import { render, screen } from "@testing-library/react";
import userEvents from "@testing-library/user-event";
import Pets from "../Pets";
import { rest } from "msw";
import { setupServer } from "msw/node";
import catsMock from "../../../mocks/cats.json";

const server = setupServer(
  rest.get("http://localhost:7000/cats", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(catsMock));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
describe("Pets", () => {
  beforeEach(() => {
    render(<Pets></Pets>);
  });

  test("should render correct amount of card component", async () => {
    const cards = await screen.findAllByRole("article");
    expect(cards.length).toBe(5);
  });
});
