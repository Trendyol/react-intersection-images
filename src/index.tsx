/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useRef } from "react";
import { LazyLoadProps } from "./interface";
import { getReturnProps } from "./utils";

function Lazy(props: LazyLoadProps) {
  const returnProps = getReturnProps(props);

  const [currentSrc, setCurrentSrc] = useState(
    props.force ? props.src : props.placeholder
  );
  const el = useRef(null);

  const handleChange = ([root]: any) => {
    if (
      root.intersectionRatio > Number(props.ratio) &&
      root.isIntersecting === true
    ) {
      setCurrentSrc(props.src);
      observer.disconnect();
      if (props.onVisible) props.onVisible();
    }
  };

  if (!("IntersectionObserver" in window)) {
    return <img {...returnProps} />;
  }

  const observer = new IntersectionObserver(handleChange, {
    threshold: props.ratio,
  });

  const handleObserve = () => {
    observer.observe(el.current as any);
  };

  return (
    <img
      {...returnProps}
      data-src={props.src}
      onLoad={handleObserve}
      ref={el}
      src={currentSrc}
    />
  );
}

export default Lazy;
