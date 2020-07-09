import { getReturnProps } from "../utils";
import faker from "faker";
import { LazyLoadProps } from "../interface";
import sinon from "sinon";

const sandbox = sinon.createSandbox();

describe("Utils tests", () => {
  it("should return props without onVisible & force", () => {
    // Arrange
    let props: LazyLoadProps;
    props = {
      ratio: 0.1,
      placeholder: faker.random.word(),
      force: true,
      onVisible: sandbox.stub(),
      src: faker.random.word(),
    };

    // Act
    const returnProps = getReturnProps(props);

    // Assert
    expect(returnProps.onVisible).toBeUndefined();
    expect(returnProps.force).toBeUndefined();
    expect(returnProps.src).toBe(props.src);
  });
});
