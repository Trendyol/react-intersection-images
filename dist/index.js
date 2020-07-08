var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useRef } from 'react';
import { getReturnProps } from "./utils";
function Lazy(props) {
    var returnProps = getReturnProps(props);
    var _a = useState(props.force ? props.src : props.placeholder), currentSrc = _a[0], setCurrentSrc = _a[1];
    var el = useRef(null);
    var handleChange = function (_a) {
        var root = _a[0];
        if (root.intersectionRatio > Number(props.ratio) && root.isIntersecting === true) {
            setCurrentSrc(props.src);
            observer.disconnect();
            if (props.onVisible)
                props.onVisible();
        }
    };
    if (!("IntersectionObserver" in window)) {
        return (React.createElement("img", __assign({}, returnProps)));
    }
    ;
    var observer = new IntersectionObserver(handleChange, { threshold: props.ratio });
    var handleObserve = function () {
        observer.observe(el.current);
    };
    return (React.createElement("img", __assign({}, returnProps, { "data-src": props.src, onLoad: handleObserve, ref: el, src: currentSrc })));
}
export default Lazy;
