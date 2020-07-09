import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Lazy from "../index";
import { LazyLoadProps } from "../interface";
import faker from "faker";
import sinon, { SinonSpy, SinonStub } from "sinon";
import { act } from "react-dom/test-utils";

const sandbox = sinon.createSandbox();

describe("Lazy tests", () => {
  let props: LazyLoadProps;

  let observeStub: SinonSpy;
  let unobserveStub: SinonSpy;
  let disconnectStub: SinonSpy;

  beforeEach(() => {
    props = {
      placeholder: faker.image.imageUrl(200),
      src: faker.image.imageUrl(300),
      ratio: 0.1,
      force: false,
    };
  });

  describe("Not support intersectionObserver environment", () => {
    it("should return image without lazy loading on one image", () => {
      // Act
      const { container } = render(<Lazy {...props} />);

      // Assert
      expect(container.getElementsByTagName("img").length).toBe(1);
      expect(container.getElementsByTagName("img")[0].src).toBe(props.src);
    });

    it("should return image without lazy loading on multiple images", () => {
      // Act
      const { container } = render(
        <div>
          <Lazy {...props} />
          <Lazy {...props} />
          <Lazy {...props} />
        </div>
      );

      // Assert
      expect(container.getElementsByTagName("img")[0].src).toBe(props.src);
      expect(container.getElementsByTagName("img")[2].src).toBe(props.src);
    });
  });

  describe("IntersectionObserver supported environment", () => {
    beforeEach(() => {
      observeStub = sandbox.spy();
      unobserveStub = sandbox.spy();
      disconnectStub = sandbox.spy();

      (window.IntersectionObserver as any) = sandbox.spy(() => ({
        observe: observeStub,
        unobserve: unobserveStub,
        disconnect: disconnectStub,
      }));
    });

    afterEach(() => {
      sandbox.verifyAndRestore();
      delete window.IntersectionObserver;
    });

    it("should render images with placeholder", () => {
      // Act
      const { container } = render(<Lazy {...props} />);

      // Assert
      expect(container.getElementsByTagName("img")[0].src).toBe(
        props.placeholder
      );
      expect(container.getElementsByTagName("img")[0].dataset.src).toBe(
        props.src
      );
    });

    it("should render without placeholder on force props is true", () => {
      props.force = true;

      // Act
      const { container } = render(<Lazy {...props} />);

      // Assets
      expect(container.getElementsByTagName("img")[0].src).toBe(props.src);
    });

    it("should call observer.observe method on img onload event fired", () => {
      // Act
      const { container } = render(<Lazy {...props} />);
      fireEvent.load(container.getElementsByTagName("img")[0]);

      // Assert
      expect(observeStub.calledOnce).toBe(true);
    });

    it("should show loaded image on observer intersectionRatio bigger than props.ratio", () => {
      // Arrange
      const intersectionObeserverSpy = (window.IntersectionObserver as unknown) as SinonSpy;

      // Act
      const { container } = render(<Lazy {...props} />);

      act(() => {
        intersectionObeserverSpy.getCalls()[0].args[0]([
          {
            intersectionRatio: 0.3,
            isIntersecting: true,
          },
        ]);
      });

      // Assert
      expect(container.getElementsByTagName("img")[0].src).toBe(props.src);
      expect(disconnectStub.calledOnce).toBe(true);
    });

    it("should show placeholder image on observer intersectionRatio bigger than props.ratio & isIntersecting is false", () => {
      // Arrange
      const intersectionObeserverSpy = (window.IntersectionObserver as unknown) as SinonSpy;

      // Act
      const { container } = render(<Lazy {...props} />);

      act(() => {
        intersectionObeserverSpy.getCalls()[0].args[0]([
          {
            intersectionRatio: 0.3,
            isIntersecting: false,
          },
        ]);
      });

      // Assert
      expect(container.getElementsByTagName("img")[0].src).toBe(
        props.placeholder
      );
      expect(disconnectStub.calledOnce).toBe(false);
    });

    it("should call onVisible callback on observer intersectionRatio bigger than props.ratio", () => {
      // Arrange
      const intersectionObeserverSpy = (window.IntersectionObserver as unknown) as SinonSpy;
      props.onVisible = sandbox.stub();

      // Act
      render(<Lazy {...props} />);

      act(() => {
        intersectionObeserverSpy.getCalls()[0].args[0]([
          {
            intersectionRatio: 0.3,
            isIntersecting: true,
          },
        ]);
      });

      // Assert
      expect((props.onVisible as SinonStub).calledOnce).toBe(true);
    });
  });
});
