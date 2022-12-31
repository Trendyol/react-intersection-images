# React Lazy Images

React lazy load images with IntersectionObserver.

## Usage

```js
import React from 'react';
import Lazy from "react-intersection-images"

const App = () => {
  const placeholder = "https://picsum.photos/id/237/500/300"

  const generateImg = () => `https://picsum.photos/id/${Math.floor(Math.random() * 999)}/500/300`

  return (
    <div>
      <Lazy placeholder={placeholder} force={true} src={generateImg()} ratio={0.1} />
      <Lazy placeholder={placeholder} src={generateImg()} ratio={0.1} />
      <Lazy placeholder={placeholder} src={generateImg()} ratio={0.1} />
      <Lazy placeholder={placeholder} src={generateImg()} ratio={0.1} />
      <Lazy placeholder={placeholder} src={generateImg()} ratio={0.1} />
      <Lazy placeholder={placeholder} src={generateImg()} ratio={0.1} />
    </div>
  );
}

export default App;

```
test
