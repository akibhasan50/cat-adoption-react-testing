/* eslint-disable testing-library/no-render-in-setup */
import { render, screen } from "@testing-library/react";
import userEvents from "@testing-library/user-event";
import Card from "../Card";
const cardProps = {
  name: "Sydney",
  phone: "111-111-1111",
  email: "laith@hotmail.com",
  image: {
    url: "https://images.unsplash.com/photo-1548247416-ec66f4900b2e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1000&q=60",
    alt: "cute cat",
  },
  favoured: false,
};

describe("Card", () => {
  beforeEach(() => {
    render(<Card {...cardProps}></Card>);
  });
  test("should render name of card", () => {
    expect(screen.getByText(/111-111-1111/i)).toBeInTheDocument();
  });
  test("should show email of card", () => {
    expect(screen.getByText(/laith@hotmail.com/i)).toBeInTheDocument();
  });
  test("should show img with src", () => {
    expect(screen.getByAltText(/cute cat/i).src).toBe(cardProps.image.url);
  });
});

describe("Check favoured or not", () => {
  test("should show outlined heart", () => {
    render(<Card {...cardProps} favoured={false}></Card>);
    expect(screen.queryByAltText(/filled heart/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/outlined heart/i)).toBeInTheDocument();
  });
  test("should show filled heart", () => {
    render(<Card {...cardProps} favoured={true}></Card>);
    expect(screen.queryByAltText(/outlined heart/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/filled heart/i)).toBeInTheDocument();
  });
  test("should toggle heart status", () => {
    render(<Card {...cardProps}></Card>);
    userEvents.click(screen.getByRole("button"));

    expect(screen.queryByAltText(/outlined heart/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/filled heart/i)).toBeInTheDocument();

    userEvents.click(screen.getByRole("button"));

    expect(screen.queryByAltText(/filled heart/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/outlined heart/i)).toBeInTheDocument();
  });
});
