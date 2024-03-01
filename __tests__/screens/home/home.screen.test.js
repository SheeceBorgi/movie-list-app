import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react-native";
import Home from "../../../screens/home.screen";
import { discoverMoviesService } from "../../../api/movie-service";

jest.mock("../../../api/movie-service");

describe("Home Component Tests", () => {
  it("should renders loading indicator when data is being fetched", async () => {
    discoverMoviesService.mockResolvedValueOnce({ data: { results: [] } });
    const { getByTestId } = render(<Home />);
    await waitFor(() => expect(getByTestId("loader")).toBeTruthy());
  });

  it("should renders movie list when data is fetched", async () => {
    discoverMoviesService.mockResolvedValueOnce({
      data: {
        results: [
          { id: 1, title: "Movie 1" },
          { id: 2, title: "Movie 2" },
        ],
      },
    });
    const { getByText } = render(<Home />);
    await waitFor(() => expect(getByText("Movie 1")).toBeTruthy());
    expect(getByText("Movie 2")).toBeTruthy();
  });

  it("should renders load more button when there are more pages", async () => {
    discoverMoviesService.mockResolvedValueOnce({
      data: { results: [{ id: 1, title: "Movie 1" }], total_pages: 2 },
    });
    const { getByTestId } = render(<Home />);
    await waitFor(() => expect(getByTestId("loadMore")).toBeTruthy());
  });

  it("should load more function when click on load more button", async () => {
    discoverMoviesService.mockResolvedValueOnce({
      data: { results: [{ id: 1, title: "Movie 1" }], total_pages: 2 },
    });
    const { getByText, getByTestId } = render(<Home />);
    const loadMoreButton = await waitFor(() => getByTestId("loadMore"));
    expect(loadMoreButton).toBeTruthy();
    fireEvent(loadMoreButton, "onPress");
    await waitFor(() => expect(getByText("Movie 1")).toBeTruthy());
  });

  it("should not render load more button when there are no more pages", async () => {
    discoverMoviesService.mockResolvedValueOnce({
      data: { results: [{ id: 1, title: "Movie 1" }], total_pages: 1 },
    });
    const { queryByText } = render(<Home />);
    await waitFor(() => expect(queryByText("Load More")).toBeNull());
  });
});
