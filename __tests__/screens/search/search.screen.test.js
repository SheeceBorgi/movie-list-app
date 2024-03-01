import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import Search from "../../../screens/search/search.screen";

jest.mock("../../../api/movie-service", () => ({
  searchMoviesService: jest.fn(() =>
    Promise.resolve({
      data: {
        results: [
          { id: 1, title: "Movie 1" },
          { id: 2, title: "Movie 2" },
        ],
        total_pages: 2,
      },
    })
  ),
}));

describe("Search Component Tests", () => {
  it("should renders search header with correct query text", async () => {
    const { getByText, getByTestId } = render(<Search />);
    fireEvent(getByTestId("searchTextInput"), "onSubmitEditing", {
      nativeEvent: { text: "Avengers" },
    });
    await waitFor(() =>
      expect(getByText('Search results for "Avengers"')).toBeTruthy()
    );
  });

  it("should render loader after query search", async () => {
    const { getByTestId } = render(<Search />);
    const searchElement = getByTestId("searchTextInput");
    fireEvent(searchElement, "onSubmitEditing", {
      nativeEvent: { text: "Avengers" },
    });
    await waitFor(() => expect(getByTestId("loader")).toBeTruthy());
  });

  it("should render movie list on search", async () => {
    const { getByTestId, findByText } = render(<Search />);
    const searchElement = getByTestId("searchTextInput");
    fireEvent(searchElement, "onSubmitEditing", {
      nativeEvent: { text: "Movie" },
    });
    expect(await findByText("Movie 1")).toBeTruthy();
    expect(await findByText("Movie 2")).toBeTruthy();
  });

  it("should renders load more button when there are more pages", async () => {
    const { getByText, getByTestId } = render(<Search />);
    const searchElement = getByTestId("searchTextInput");
    fireEvent(searchElement, "onSubmitEditing", {
      nativeEvent: { text: "Movie" },
    });
    await waitFor(() => expect(getByText("Load More")).toBeTruthy());
  });

  it("should call load more function when click on load more button", async () => {
    const { getByText, getByTestId } = render(<Search />);
    const searchElement = getByTestId("searchTextInput");
    fireEvent(searchElement, "onSubmitEditing", {
      nativeEvent: { text: "Movie" },
    });
    const loadMoreButton = await waitFor(() => getByTestId("loadMore"));
    expect(loadMoreButton).toBeTruthy();
    fireEvent(loadMoreButton, "onPress");
    await waitFor(() => expect(getByText("Movie 1")).toBeTruthy());
  });

  it("should not render load more button when there are no more pages", async () => {
    const { getByTestId, queryByText } = render(<Search />);
    const searchElement = getByTestId("searchTextInput");
    fireEvent(searchElement, "onSubmitEditing", {
      nativeEvent: { text: "Avengers" },
    });

    await waitFor(() => expect(getByTestId("loadMore")).toBeTruthy());
    fireEvent(getByTestId("loadMore"), "onPress");
    await waitFor(() => expect(queryByText("Load More")).toBeNull());
  });
});
