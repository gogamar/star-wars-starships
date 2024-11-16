import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import { MemoryRouter, useNavigate } from "react-router-dom";
import StarshipList from "./StarshipList";

// Mock the useNavigate hook
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe("StarshipList", () => {
  it("renders the list of starships", () => {
    const starships = [
      {
        name: "Millennium Falcon",
        model: "YT-1300F",
        url: "/api/starships/1/",
      },
      {
        name: "X-Wing",
        model: "T-65 X-wing starfighter",
        url: "/api/starships/2/",
      },
    ];

    render(
      <MemoryRouter>
        <StarshipList starships={starships} />
      </MemoryRouter>
    );

    expect(screen.getByText("Millennium Falcon")).toBeInTheDocument();
    expect(screen.getByText("X-Wing")).toBeInTheDocument();
  });

  it("navigates to the correct starship details page when a card is clicked", () => {
    const mockNavigate = vi.fn();
    useNavigate.mockReturnValue(mockNavigate);

    const starships = [
      {
        name: "Millennium Falcon",
        model: "YT-1300F",
        url: "/api/starships/1/",
      },
    ];

    render(
      <MemoryRouter>
        <StarshipList starships={starships} />
      </MemoryRouter>
    );

    const heading = screen.getByText("Millennium Falcon");
    const card = heading.closest(".cursor-pointer");
    fireEvent.click(card);

    expect(mockNavigate).toHaveBeenCalledWith("/starships/1");
  });

  it("does not render card if starshipId is invalid", () => {
    const starships = [
      {
        name: "Invalid Ship",
        model: "Test Model",
        url: "invalid-url", // Completely invalid URL
      },
    ];

    render(
      <MemoryRouter>
        <StarshipList starships={starships} />
      </MemoryRouter>
    );

    expect(screen.queryByText("Invalid Ship")).not.toBeInTheDocument();
  });
});
