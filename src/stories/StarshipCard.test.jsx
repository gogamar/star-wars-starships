import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import StarshipCard from "./StarshipCard";

describe("StarshipCard", () => {
  const mockStarship = {
    name: "Millennium Falcon",
    starship_class: "Light freighter",
    passengers: "6",
    hyperdrive_rating: "0.5",
    model: "YT-1300 light freighter",
    max_atmosphering_speed: "1050",
    cost_in_credits: "100000",
    manufacturer: "Corellian Engineering Corporation",
    length: "34.37",
    crew: "4",
  };

  it("renders starship name in the header", () => {
    render(<StarshipCard selectedStarship={mockStarship} />);
    expect(screen.getByText("Millennium Falcon")).toBeInTheDocument();
  });

  it("renders the starship description with class, passengers, and hyperdrive rating", () => {
    render(<StarshipCard selectedStarship={mockStarship} />);
    const description = screen.getByText(
      /This starship is of Light freighter class, it's for 6 passengers and has a hyperdrive rating of 0.5\./
    );
    expect(description).toBeInTheDocument();
  });

  it("renders all technical specifications correctly", () => {
    render(<StarshipCard selectedStarship={mockStarship} />);

    expect(screen.getByText("Model:")).toBeInTheDocument();
    expect(screen.getByText("YT-1300 light freighter")).toBeInTheDocument();

    expect(screen.getByText("Max Atmosphering Speed:")).toBeInTheDocument();
    expect(screen.getByText("1050 km/h")).toBeInTheDocument();

    expect(screen.getByText("Cost in credits:")).toBeInTheDocument();
    expect(screen.getByText("100000")).toBeInTheDocument();

    expect(screen.getByText("Manufacturer:")).toBeInTheDocument();
    expect(
      screen.getByText("Corellian Engineering Corporation")
    ).toBeInTheDocument();

    expect(screen.getByText("Length:")).toBeInTheDocument();
    expect(screen.getByText("34.37 meters")).toBeInTheDocument();

    expect(screen.getByText("Crew:")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
  });

  it("maintains correct layout structure", () => {
    const { container } = render(
      <StarshipCard selectedStarship={mockStarship} />
    );

    const mainContainer = container.firstChild;
    expect(mainContainer).toHaveClass(
      "border-l-4",
      "border-red-500",
      "bg-gray-900",
      "p-6",
      "rounded-r-lg",
      "relative",
      "overflow-hidden"
    );

    const headerSection = screen.getByText(mockStarship.name).closest("div");
    expect(headerSection).toHaveClass("z-10", "mb-5", "text-gray-500");

    const gridSection = screen.getByText(/Model:/).closest(".grid");
    expect(gridSection).toHaveClass(
      "grid",
      "grid-cols-1",
      "sm:grid-cols-2",
      "text-gray-500"
    );
  });
});
