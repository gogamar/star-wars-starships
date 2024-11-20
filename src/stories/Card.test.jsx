import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import Card from "./Card";

describe("Card Component", () => {
  it("renders correctly for a pilot", () => {
    const pilotElement = {
      id: 1,
      name: "Luke Skywalker",
    };

    render(<Card element={pilotElement} />);

    expect(screen.getByText(/luke skywalker/i)).toBeInTheDocument();
    const img = screen.getByAltText(/luke skywalker/i);
    expect(img.src).toContain("characters/1.jpg");
  });

  it("renders correctly for a film", () => {
    const filmElement = {
      id: 1,
      title: "A New Hope",
      episode_id: 4,
    };

    render(<Card element={filmElement} />);

    // Check if the title of the film is rendered
    expect(screen.getByText(/a new hope/i)).toBeInTheDocument();
    // Check if the episode ID is rendered
    expect(screen.getByText(/episode 4/i)).toBeInTheDocument();
    // Check if the image source URL is correct for a film
    const img = screen.getByAltText(/a new hope/i);
    expect(img.src).toContain("films/1.jpg");
  });

  it("renders a placeholder image when there is no image URL", () => {
    const filmElement = {
      id: 999,
      title: "A New Hope",
      episode_id: 4,
    };

    render(<Card element={filmElement} />);

    const img = screen.getByAltText(/a new hope/i);
    expect(img.src).toContain("films/999.jpg");
  });
});
