import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import DailyPage from "../DailyPage";
import { getDailyPictureData } from "../../services/ExternalAPIService";
import { formatDate } from "../../utils/helper/FormatDate";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

jest.mock("../../services/ExternalAPIService");

describe("DailyPage Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Renders DailyPage component with daily data", async () => {
    const mockImageData = {
      url: "https://example.com/image.jpg",
      title: "Test Image",
      explanation: "This is a test image",
    };
    const formattedDate = formatDate(new Date());

    getDailyPictureData.mockResolvedValueOnce(mockImageData);

    render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DailyPage />
      </LocalizationProvider>
    );

    expect(getDailyPictureData).toHaveBeenCalledTimes(1);
    expect(getDailyPictureData).toHaveBeenCalledWith({ date: formattedDate });

    await waitFor(() => {
      expect(screen.getByText(mockImageData.title)).toBeTruthy();
    });

    await waitFor(() => {
      expect(screen.getByAltText(mockImageData.title)).toBeTruthy();
    });

    await waitFor(() => {
      expect(screen.getByText(mockImageData.explanation)).toBeTruthy();
    });
  });

  it("Renders DailyPage component with previous daily data if current data request fails", async () => {
    const mockImageData = {
      url: "https://example.com/image.jpg",
      title: "Test Image",
      explanation: "This is a test image",
    };
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);

    const previousDate = new Date();
    previousDate.setDate(currentDate.getDate());
    const formattedPreviousDate = formatDate(previousDate);

    getDailyPictureData
      .mockResolvedValueOnce(undefined) // Current date request fails
      .mockResolvedValueOnce(mockImageData); // Previous date request succeeds

    render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DailyPage />
      </LocalizationProvider>
    );

    expect(getDailyPictureData).toHaveBeenCalledTimes(1);
    expect(getDailyPictureData).toHaveBeenCalledWith({ date: formattedDate });
    expect(getDailyPictureData).toHaveBeenCalledWith({
      date: formattedPreviousDate,
    });

    await waitFor(() => {
      expect(screen.getByText(mockImageData.title)).toBeTruthy();
    });

    await waitFor(() => {
      expect(screen.getByAltText(mockImageData.title)).toBeTruthy();
    });

    await waitFor(() => {
      expect(screen.getByText(mockImageData.explanation)).toBeTruthy();
    });
  });
});
