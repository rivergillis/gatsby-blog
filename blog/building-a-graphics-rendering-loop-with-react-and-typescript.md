---
date: 2019-05-09T01:26:14.876Z
title: Building a Graphics Rendering Loop with React and Typescript
cardTitle: Building a Graphics Rendering Loop
author: River Gillis
verb: and-writes
---

> My pixels have gone, my pixels have vanished! Perhaps they weren't even there to begin with. Won't someone teach me the orthopraxy?
> 
> &mdash; 16 seconds pre-coffee break. Subject: a frusterated coder.

So you've decided to build a game or animation engine, and you're interested in rendering the whole thing in React, maybe even with Typescript. After a few attempts, you've realized that building the rendering loop is trickier than you thought. Or at least, that was what happened to me as I was working on my [gameboy emulator](https://github.com/rivergillis/tsgb). After a little research, I've come to a solution that I'm happy with. Let's see how to get there.

The first thing we need is a way to get graphics onto the screen. For the purposes of this demonstration, we'll be generating our own `ImageData` and putting the pixels onto a canvas using `putImageData()`, though a similar structure could be used if you were to use WebGL. If you take a look at [Phil Nash's post on the subject](https://philna.sh/blog/2018/09/27/techniques-for-animating-on-the-canvas-in-react/), you'll learn how to go about rendering a canvas element in react the correct way. The first step is to create a component whose sole purpose to render a canvas to the DOM.

```typescript
import React, { Component } from 'react';

interface PureCanvasProps {
  contextRef: Function;
}

class PureCanvas extends Component<PureCanvasProps, any> {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <canvas
        width="160"
        height="144"
        ref={node =>
          node ? this.props.contextRef(node.getContext('2d')) : null
        }
      />
    );
  }
}
```

There are a few interesting things to note here. The first is that we've turned off all updating for this component by using `shouldComponentUpdate()`. We want that because it doesn't make sense for us to ever re-render the `<canvas>` element. Unlike most React or HTML tags, its state is not determined by its properties or children, but by a context exposed by the element itself. This means we can't update it just by passing the new `ImageData` in as a property. This presents an interesting problem, because we are unable to actually render to the canvas in any React component rendering method. We do accept one property for `PureCanvas`, a `contextRef` function. This is how we're going to manipulate the canvas data, by passing in a function that will wrap the canvas context into the state of a parent component. *Note: `getContext()` is a method exposed by the canvas element to gain access to the canvas from a reference. You can read more about it [here](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext).*

Fantastic, now we've got a target for our rendering, let's see how to use it in a loop!

```typescript
interface GraphicsRendererState {
  frameId: number;
  engine: Engine | null;
}

class GraphicsRenderer extends Component<any, GraphicsRendererState> {
  state: GraphicsRendererState = {
    frameId: 0,
    engine: null,
  };

  componentDidMount() {
    this.setState({
      frameId: requestAnimationFrame(this.updateAnimationState),
    });
  }

  componentDidUpdate() {
    if (this.state.engine) {
      this.state.engine.drawFrame();
    }
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.state.frameId);
  }

  saveContext = (ctx: CanvasRenderingContext2D) => {
    this.setState({
      engine: new Engine(ctx),
    });
  };

  updateAnimationState = () => {
    const { engine } = this.state;
    if (engine) {
      // After tick() is finished, we have a frame to draw
      engine.tick();
    }
    // This will trigger componentDidUpdate(), giving us a chance to draw
    this.setState({frameId: requestAnimationFrame(this.updateAnimationState)});
  };

  render() {
    return <PureCanvas contextRef={this.saveContext} />;
  }
}
```

Alright let's walk through this. First, the context. `GraphicsRenderer::render()` returns only the `PureCanvas` described earlier, and for the `contextRef` function, we pass in a function to wrap the `CanvasRenderingContext2D` into the state of `GraphicsRenderer`. We're doing this through the use of an `Engine` class, which acts as your game or animation engine. When we initialize `GraphicsRenderer`, we don't have any canvas context and so `engine` is `null`. To allow for this this, in `GraphicsRendererState` we use [union types](https://www.typescriptlang.org/docs/handbook/advanced-types.html) to allow `engine` to be nullable.  

So that takes care of wrapping the canvas context, how do we actually set up our frame loop? In `GraphicsRenderer`, we do that through the use of `requestAnimationFrame()`. If you've done graphics programming before, this function is like a wait frame function or an acquire frame function, depending on the API. What that means is that `requestAnimationFrame()` is an incredibly useful function that handles the work of synchronizing code to the refresh rate of the browser (60Hz). It's pretty simple too, you pass it a callback to execute and it returns a unique ID to let you cancel any requests later. It's important to note that this isn't called on an interval, you have to call `requestAnimationFrame()` again on every callback. This allows it work just fine even if your game can't hit 60fps.  

In our `updateAnimationState()` callback, we tick the engine (computing an image to draw) and request another frame, setting the component state to that frame ID. This `setState()` call is useful, as it will trigger a component update, giving us a chance to actually draw the image. Since we've been keeping track of the frame request ID, let's make sure to cancel any outbound request whenever we unmount the component. We do this with `cancelAnimationFrame()`.  

Now that we've got our loop built, let's make a simple engine and test it.

```typescript
let z = 0;

class Engine {
  ctx: CanvasRenderingContext2D;
  frameBuffer: ImageData;
  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.frameBuffer = ctx.createImageData(ctx.canvas.width, ctx.canvas.height);
  }
  tick = () => {
    // Iterate through every pixel
    for (let i = 0; i < this.frameBuffer.data.length; i += 4) {
      // Modify pixel data
      this.frameBuffer.data[i + 0] = z; // R value
      this.frameBuffer.data[i + 1] = z; // G value
      this.frameBuffer.data[i + 2] = z; // B value
      this.frameBuffer.data[i + 3] = 255; // A value
    }
    z++;
    if (z > 255) {
      z = 0;
    }
  };
  drawFrame = () => {
    this.ctx.putImageData(this.frameBuffer, 0, 0);
  };
}
```

This will render a square that slowly becomes lighter every tick. Now for the moment of truth, the performance. We can test for this by running a system trace right within the chrome devtools.

![Performance using setState](/assets/rafUsingSetState.png "Performance using setState")

The target frame time for 60fps is 16.7ms, and it looks like we're hitting that easily! But something stands out in this trace, the `setState()` calls. Every frame, we're spending a little over 2ms just on `setState()`! That time will become extremely valuable as you flesh out your engine. We need to fix this.  

So let's take a look at how we're actually using `setState()`. Since `PureCanvas` never updates, we're only using it in `GraphicsRenderer`. Even then, we're really only changing the state to account for the animation frame ID updates, and we're only using those so that we can cancel requests once the component unmounts! Let's see if we can get by without it.

```typescript
interface GraphicsRendererState {
  engine: Engine | null;
}

class GraphicsRenderer extends Component<any, GraphicsRendererState> {
  state: AnimationState = {
    engine: null,
  };

  componentDidMount() {
    requestAnimationFrame(this.updateAnimationState)
  }

  saveContext = (ctx: CanvasRenderingContext2D) => {
    this.setState({
      engine: new Engine(ctx),
    });
  };

  updateAnimationState = () => {
    const { engine } = this.state;
    if (engine) {
      // After tick() is finished, we have a frame to draw.
      engine.tick();
      // Drawing it right now is fine, let's do it!
      engine.drawFrame();
    }
    requestAnimationFrame(this.updateAnimationState);
  };

  render() {
    return <PureCanvas contextRef={this.saveContext} />;
  }
}
```

We've nixed all state modifications except for the initial engine creation, which'll only happen once. We're also drawing the frame directly after the engine tick. Since the callback is synchronized, drawing the frame then will be as well! Since we don't keep track of the frame ID, we're no longer cancelling the animation frame. How does this affect us? Well, in our setup we will only ever have one outbound request at a time, meaning there will be a chance upon unmount that `updateAnimationState()` is called after unmount. Depending on how you structure your engine, you may need to add a little bit of additional error checking, as the canvas context will no longer be valid. If the only time your component unmounts is when the app closes, then you don't even need to worry about this. So how is the performance now?

![Better performance without using setState](/assets/rafNoSetState.png "Performance without using setState")

We've saved so much time! Since our component isn't really updating, we have ample time for our engine to do computations.  

All good now, right? Nope! Think about what is happening here and what we've learned from the performance traces. **`requestAnimationFrame()` gives you a chance to draw a frame on time.** What are we doing though? We're doing some heavy work to create a frame, then we draw it, then we request another time to draw. This means that, **while the start of the animation callback is synchronized, the end is not!** Our engine ticks could take a variable amount of time, and we only draw once they are over. This means that the image displayed within the canvas isn't necessarily displayed for the same amount of time every frame. This is bad. Our fix will be a very simple one, we'll just flip the order of drawing and ticking.

```typescript
updateAnimationState = () => {
  const { engine } = this.state;
  if (engine) {
    // Draw the last frame we created
    engine.drawFrame();
    // Now let's make a new one!
    engine.tick();
  }
  requestAnimationFrame(this.updateAnimationState);
};
```

Now it doesn't matter how long the tick lasts, because the actual drawing will be synchronized to the start of every frame! There are some additional things you could do to improve this. Ideally, your tick function is running on a separate thread via a web worker, and it would be great if you had some way to double buffer your images, though these things are beyond the scope of this post. 

Hopefully this helped you along! If you want to reach out with suggestions or corrections, feel free to [email me](mailto:jrivergillis@gmail.com).

<!-- One last thing, what if we don't want to target 60fps? If your game can't hit 60fps, then something like 30fps might be a nice target that would prevent users's laptops from burning their fingers off. In my case, the gameboy targets just slightly below 60fps. Thankfully, incorporating this throttling into loop is simple ([thanks to this SO answer for the original code](https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe)).

```typescript
const targetFps: number = 30;
const fpsInterval = 1000 / fps;
class GraphicsRenderer extends Component<any, GraphicsRendererState> {
  state: AnimationState = {
    engine: null,
  };

  componentDidMount() {
    requestAnimationFrame(this.updateAnimationState)
  }

  saveContext = (ctx: CanvasRenderingContext2D) => {
    this.setState({
      engine: new Engine(ctx),
    });
  };

  updateAnimationState = (time: DOMHighResTimeStamp) => {
    const { engine } = this.state;
    if (engine) {
      // After tick() is finished, we have a frame to draw.
      engine.tick();
      // Drawing it right now is fine, let's do it!
      engine.drawFrame();
    }
    requestAnimationFrame(this.updateAnimationState);
  };

  render() {
    return <PureCanvas contextRef={this.saveContext} />;
  }
}
``` -->