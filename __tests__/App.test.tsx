import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";
import { Footer } from "@/components/footer";

jest.mock("three", () => ({}));
jest.mock("three/examples/jsm/controls/OrbitControls.js", () => ({ OrbitControls: class {} }));
jest.mock("three/examples/jsm/geometries/RoundedBoxGeometry.js", () => ({ RoundedBoxGeometry: class {} }));
jest.mock("three/examples/jsm/environments/RoomEnvironment.js", () => ({ RoomEnvironment: class {} }));
jest.mock("framer-motion", () => ({
  motion: new Proxy({}, { get: (_target, key) => key === "article" || key === "div" ? "div" : "div" })
}));
jest.mock("@/components/ui/agentic-factory-3d", () => ({
  __esModule: true,
  default: (props: { embed?: boolean }) => <div className="agentic-factory-3d" data-testid="agentic-factory-3d" data-embed={String(!!props.embed)} />
}));

describe("Site Fleet application", () => {
  it("renders the homepage without crashing", () => {
    render(<HomePage />);
    expect(screen.getByRole("heading", { name: /Field operations,/i })).toBeInTheDocument();
  });
  it("renders the contact email in the footer", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: /zaid\.shafqat@rungta\.org/i })).toHaveAttribute("href", "mailto:zaid.shafqat@rungta.org");
  });
  it("injects the AgenticFactory3D wrapper into the homepage", () => {
    render(<HomePage />);
    expect(screen.getByTestId("agentic-factory-3d")).toHaveAttribute("data-embed", "true");
  });
});
