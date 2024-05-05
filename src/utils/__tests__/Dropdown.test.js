import {
  CuriosityCameras,
  SpiritCameras,
  OpportunityCameras,
  Rovers,
} from "../constants/Dropdown"; // Import the arrays

describe("CuriosityCameras array", () => {
  it("contains the correct number of cameras", () => {
    expect(CuriosityCameras).toHaveLength(8); // Check if the array has 8 elements
  });

  it("contains the expected cameras", () => {
    const expectedCameras = [
      { value: "FHAZ", label: "Front Hazard Avoidance Camera" },
      { value: "RHAZ", label: "Rear Hazard Avoidance Camera" },
      { value: "MAST", label: "Mast Camera" },
      { value: "CHEMCAM", label: "Chemistry and Camera Complex" },
      { value: "MAHLI", label: "Mars Hand Lens Imager" },
      { value: "MARDI", label: "Mars Descent Imager" },
      { value: "NAVCAM", label: "Navigation Camera" },
      { value: "", label: "All Cameras" },
    ];
    expect(CuriosityCameras).toEqual(expect.arrayContaining(expectedCameras)); // Check if all expected cameras are present
  });
});

describe("SpiritCameras array", () => {
  it("contains the correct number of cameras", () => {
    expect(SpiritCameras).toHaveLength(6); // Check if the array has 6 elements
  });
});

describe("OpportunityCameras array", () => {
  it("contains the correct number of cameras", () => {
    expect(OpportunityCameras).toHaveLength(6); // Check if the array has 6 elements
  });
});

describe("Rovers array", () => {
  it("contains the correct number of rovers", () => {
    expect(Rovers).toHaveLength(3); // Check if the array has 3 elements
  });

  it("contains the expected rovers", () => {
    const expectedRovers = [
      { value: "Curiosity", label: "Curiosity" },
      { value: "Opportunity", label: "Opportunity" },
      { value: "Spirit", label: "Spirit" },
    ];
    expect(Rovers).toEqual(expect.arrayContaining(expectedRovers)); // Check if all expected rovers are present
  });
});
