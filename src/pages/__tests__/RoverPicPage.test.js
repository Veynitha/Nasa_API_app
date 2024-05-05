import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import RoverPicPage from "../RoverPicPage";
import {
  getRoverPictureData,
  getRoverManifest,
} from "../../services/ExternalAPIService";
import userEvent from "@testing-library/user-event";

jest.mock("../../services/ExternalAPIService");

describe("RoverPicPage Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders component correctly", async () => {
    const mockManifestData = {
      photo_manifest: { max_sol: 100 },
    };

    const mockPhotosData = {
      photos: [{ id: 1, img_src: "https://example.com/image.jpg" }],
    };

    getRoverManifest.mockResolvedValueOnce(mockManifestData);
    getRoverPictureData.mockResolvedValueOnce(mockPhotosData);

    render(<RoverPicPage />);

    await waitFor(() => {
      expect(screen.getByText("Mars Rover Photos")).toBeTruthy();
      expect(getRoverManifest).toHaveBeenCalledTimes(1);
      expect(getRoverPictureData).toHaveBeenCalledTimes(1);
    });
  });

  it("handles sol change and fetches photos accordingly", async () => {
    const mockPhotosData = {
      photos: [{ id: 1, img_src: "https://example.com/image.jpg" }],
    };

    getRoverManifest.mockResolvedValueOnce({
      photo_manifest: { max_sol: 100 },
    });
    getRoverPictureData.mockResolvedValueOnce(mockPhotosData);

    render(<RoverPicPage />);

    fireEvent.change(screen.getByLabelText("Sol Date:"), {
      target: { value: "2" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Find" }));

    await waitFor(() => {
      expect(getRoverPictureData).toHaveBeenCalledTimes(2); // Initial fetch + sol change fetch
    });
  });

  it("renders component correctly when both current and previous data requests fail", async () => {
    getRoverManifest.mockRejectedValueOnce(
      new Error("Failed to fetch manifest data")
    );
    getRoverPictureData.mockRejectedValueOnce(
      new Error("Failed to fetch current photos data")
    );
    getRoverPictureData.mockRejectedValueOnce(
      new Error("Failed to fetch previous photos data")
    );

    render(<RoverPicPage />);

    await waitFor(() => {
      expect(screen.getByText("Mars Rover Photos")).toBeTruthy(); // Add a specific error message displayed on failure
      expect(getRoverManifest).toHaveBeenCalledTimes(1);
      expect(getRoverPictureData).toHaveBeenCalledTimes(1); // Only two requests should be made
    });
  });
});
