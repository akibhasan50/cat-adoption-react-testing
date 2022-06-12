/* eslint-disable testing-library/no-render-in-setup */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Pets from "../Pets";
import { rest } from "msw";
import { setupServer } from "msw/node";
import catsMock from "../../../mocks/cats.json";

const server = setupServer(
  rest.get("http://localhost:7000/cats", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(catsMock));
  })
);
beforeEach(() => {
  render(<Pets></Pets>);
});
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
describe("Pets", () => {
  test("should render correct amount of card component", async () => {
    const cards = await screen.findAllByRole("article");
    expect(cards.length).toBe(5);
  });

  test("should filter male cats", async () => {
    const cards = await screen.findAllByRole("article");
    console.log({ cards });
    userEvent.selectOptions(screen.getByLabelText("Gender"));

    const maleCard = screen.getAllByRole("article");
   
    expect(maleCard).toStrictEqual([cards[1],cards[3]]);
  });
  test("should filter female cats", async () => {
    const cards = await screen.findAllByRole("article");
    console.log({ cards });
    userEvent.selectOptions(screen.getByLabelText("Gender"));

    const maleCard = screen.getAllByRole("article");
   
    expect(maleCard).toStrictEqual([cards[0],cards[4]]);
  });
});
