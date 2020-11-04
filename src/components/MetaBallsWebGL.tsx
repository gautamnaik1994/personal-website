// @ts-nocheck
import React, { Fragment } from 'react';
import Tweakpane from 'tweakpane';
import { ThemeContext } from 'styled-components';

interface IState {
  radiusDivider: number | null;
  smallCircleRadius: number | null;
  // color: string | null;
  distributionRadius: number | null;
  xSpeed: number | null;
  ySpeed: number | null;
  // canvasCenter: [number, number] | null;
  ballCount: number | null;
  // metaBalls: [];
  r: number;
  g: number;
  b: number;
  theme: number;
}

const webglOptions = {
  powerPreference: 'high-performance',
  antialias: false,
  transparent: true,
  resolution: 0.1,
  alpha: false,
  desynchronized: true,
  depth: false,
  failIfMajorPerformanceCaveat: true,
  premultipliedAlpha: false,
  preserveDrawingBuffer: true,
};

interface MetaBallObject {
  key: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

interface IProps {
  showTweakPane: boolean;
}

declare global {
  interface Window {
    mozCancelAnimationFrame: any;
  }
}

class Metaballs extends React.Component<IProps, IState> {
  private canvasRef: React.RefObject<HTMLCanvasElement>;

  constructor(props: IProps) {
    super(props);
    this.canvasRef = React.createRef();

    this.state = {
      ballCount: 5,
      smallCircleRadius: 100,
      distributionRadius: 90,
      xSpeed: 1,
      ySpeed: 1,
      radiusDivider: 15,
      r: 0.34,
      g: 0.5,
      b: 0.89,
      theme: 0,
    };
  }

  gl: WebGLRenderingContext | null = null;
  metaballsHandle: WebGLUniformLocation | null = null;
  bgColorUniformLocation: WebGLUniformLocation | null = null;

  static contextType = ThemeContext;

  animationRequest: number | null = null;
  timerID: number | null = null;
  CANVAS_WIDTH: number | null = null;
  CANVAS_HEIGHT: number | null = null;
  CANVAS_CENTER_X: number | null = null;
  CANVAS_CENTER_Y: number | null = null;
  metaBalls: Array<MetaBallObject> = [];

  widthMultiplier = (): number => {
    if (this.CANVAS_HEIGHT > this.CANVAS_WIDTH) {
      return this.CANVAS_HEIGHT / (this.state?.radiusDivider * 100);
    } else return this.CANVAS_WIDTH / (this.state?.radiusDivider * 100);
  };

  cancelAll = (): void => {
    const cancelAnimationFrame =
      window.cancelAnimationFrame || window.mozCancelAnimationFrame;
    cancelAnimationFrame(this?.animationRequest);
    clearTimeout(this?.timerID);
  };

  componentDidMount(): void {
    this.cancelAll();

    const canvasElem = this.canvasRef.current;
    this.CANVAS_HEIGHT = canvasElem!.parentElement.clientHeight;
    this.CANVAS_WIDTH = canvasElem!.parentElement.clientWidth;
    canvasElem.setAttribute('height', this.CANVAS_HEIGHT + 'px');
    canvasElem.setAttribute('width', this.CANVAS_WIDTH + 'px');
    this.CANVAS_CENTER_X = this.CANVAS_WIDTH / 2;
    this.CANVAS_CENTER_Y = this.CANVAS_HEIGHT / 2;

    try {
      this.gl = canvasElem.getContext(
        'webgl',
        webglOptions,
      ) as WebGLRenderingContext;
    } catch (e) {}

    if (!this.gl) throw new Error('WebGL not supported');

    this.setupGL(this.gl);
    this.renderBalls(this.state.ballCount);

    // const PARAMS = {
    //   ...this.config
    // };

    // if (this.props.showTweakPane) {
    //   const pane = new Tweakpane({
    //     container: document.getElementById("tweakpaneContainer")
    //   });
    //   const f1 = pane.addFolder({
    //     title: "Tweaks"
    //   });

    //   for (const [key, val] of Object.entries(this.config)) {
    //     f1.addInput(PARAMS, key, {
    //       min: 1,
    //       max: 100,
    //       step: 1
    //     }).on("change", (val) => {
    //       this.setState({
    //         [key]: val
    //       });
    //     });
    //   }
    // }

    this.step();
  }

  step = (): void => {
    const requestAnimationFrame =
      window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame;

    const ballCount = this.state.ballCount;

    for (let i = 0; i < ballCount; i++) {
      const mb: MetaBallObject = this.metaBalls[i];
      mb.x += mb.vx;
      if (mb.x - mb.r < 0) {
        mb.x = mb.r + 1;
        mb.vx = Math.abs(mb.vx);
      } else if (mb.x + mb.r > this.CANVAS_WIDTH) {
        mb.x = this.CANVAS_WIDTH - mb.r;
        mb.vx = -Math.abs(mb.vx);
      }
      mb.y += mb.vy;
      if (mb.y - mb.r < 0) {
        mb.y = mb.r + 1;
        mb.vy = Math.abs(mb.vy);
      } else if (mb.y + mb.r > this.CANVAS_HEIGHT) {
        mb.y = this.CANVAS_HEIGHT - mb.r;
        mb.vy = -Math.abs(mb.vy);
      }
    }
    const dataToSendToGPU = new Float32Array(3 * ballCount);
    for (let i = 0; i < ballCount; i++) {
      const baseIndex = 3 * i;
      const mb = this.metaBalls[i];
      dataToSendToGPU[baseIndex + 0] = mb.x;
      dataToSendToGPU[baseIndex + 1] = mb.y;
      dataToSendToGPU[baseIndex + 2] = mb.r;
    }
    this.gl.uniform3fv(this.metaballsHandle, dataToSendToGPU);

    this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);

    this.timerID = setTimeout(() => {
      this.animationRequest = requestAnimationFrame(this.step);
    }, 1000 / 60);
  };

  generatePointsOnCircle = (
    radius: number,
    count: number,
  ): Array<{ x: number; y: number }> => {
    const points = [];
    const canvasCenter = this.state.canvasCenter;
    for (let i = 1; i <= count; i++) {
      const x = canvasCenter[0] + radius * Math.cos((2 * i * Math.PI) / count);
      const y = canvasCenter[1] + radius * Math.sin((2 * i * Math.PI) / count);
      points.push({ x, y });
    }
    return points;
  };

  choose = (choices: Array<number>): number => {
    const index = Math.floor(Math.random() * choices.length);
    return choices[index];
  };

  componentWillUnmount(): void {
    this.cancelAll();
  }

  renderBalls = (n: number): void => {
    const { xSpeed, ySpeed }: IState = this.state;
    // var points = this.generatePointsOnCircle(distributionRadius * 1.5, n);

    for (let i = 0; i < n; i++) {
      const r = Math.max(50, Math.random() * 100 + 70) * this.widthMultiplier();
      this.metaBalls.push({
        key: i,
        x: this.CANVAS_CENTER_X + r,
        y: this.CANVAS_CENTER_Y + r,
        r,
        vx: Math.random() * xSpeed * this.choose([-1, 1]),
        vy: Math.random() * ySpeed * this.choose([-1, 1]),
      });
    }
  };

  setupGL = (gl: WebGLRenderingContext): void => {
    const ballCount = this.state.ballCount;
    const vertexShader = this.compileShader(
      `
    attribute vec2 position;
    
    void main() {
        gl_Position = vec4(position.x,position.y, 0.0, 1.0);
    }
    `,
      gl.VERTEX_SHADER,
      gl,
    );

    const fragmentShader = this.compileShader(
      `
    precision highp float;
    uniform vec3 metaballs[${ballCount}];
    const float WIDTH = ${this.CANVAS_WIDTH}.0;
    const float HEIGHT = ${this.CANVAS_HEIGHT}.0;
    uniform vec4 bg_color;
    uniform vec4 metaball_color;
    
    void main(){
        float x = gl_FragCoord.x;
        float y = gl_FragCoord.y;
        float v = 0.0;
        for (int i = 0; i < ${ballCount}; i++) {
            vec3 mb = metaballs[i];
            float dx = mb.x - x;
            float dy = mb.y - y;
            float r = mb.z;
            v += r*r/(dx*dx + dy*dy) ;
        }
        if (v > 1.0) {
            gl_FragColor = vec4(metaball_color.x,y/HEIGHT,metaball_color.z ,  1.0);
        } else {
            gl_FragColor=bg_color;
            
        }
    }
    `,
      gl.FRAGMENT_SHADER,
      gl,
    );

    const program: WebGLProgram = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    const vertexData = new Float32Array([
      -1.0,
      1.0, // top left
      -1.0,
      -1.0, // bottom left
      1.0,
      1.0, // top right
      1.0,
      -1.0, // bottom right
    ]);
    const vertexDataBuffer: WebGLBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexDataBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW);

    const positionHandle = this.getAttribLocation(program, 'position', gl);
    gl.enableVertexAttribArray(positionHandle);
    gl.vertexAttribPointer(
      positionHandle,
      2, // position is a vec2
      gl.FLOAT, // each component is a float
      false, // don't normalize values
      2 * 4, // two 4 byte float components per vertex
      0, // offset into each span of vertex data
    );

    this.metaballsHandle = this.getUniformLocation(program, 'metaballs', gl);
    this.bgColorUniformLocation = this.getUniformLocation(
      program,
      'bg_color',
      gl,
    );
    const metaballColorUniformLocation = this.getUniformLocation(
      program,
      'metaball_color',
      gl,
    );

    if (this.state.theme === 0) {
      // gl_FragColor = vec4(0.12, 0.15, 0.21, 1.0);
      gl.uniform4f(this.bgColorUniformLocation, 0.12, 0.15, 0.21, 1);
    } else {
      gl.uniform4f(this.bgColorUniformLocation, 1.0, 1.0, 1.0, 1.0);
    }

    gl.uniform4f(
      metaballColorUniformLocation,
      this.state.r,
      this.state.g,
      this.state.b,
      1,
    );
  };

  changeBackground = (val: string): void => {
    if (val === 'dark' && this.gl) {
      // gl_FragColor = vec4(0.12, 0.15, 0.21, 1.0);
      this.gl.uniform4f(this.bgColorUniformLocation, 0.12, 0.15, 0.21, 1);
    } else if (val === 'light' && this.gl) {
      this.gl.uniform4f(this.bgColorUniformLocation, 1.0, 1.0, 1.0, 1.0);
    }
  };

  getAttribLocation = (
    program: WebGLProgram,
    name: string,
    gl: WebGLRenderingContext,
  ): number => {
    const attributeLocation = gl.getAttribLocation(program, name);
    if (attributeLocation === -1) {
      throw 'Can not find attribute ' + name + '.';
    }
    return attributeLocation;
  };
  getUniformLocation = (
    program: WebGLProgram,
    name: string,
    gl: WebGLRenderingContext,
  ): WebGLUniformLocation => {
    const uniformLocation = gl.getUniformLocation(program, name);
    if (uniformLocation === -1) {
      throw 'Can not find uniform ' + name + '.';
    }
    return uniformLocation;
  };
  compileShader = (
    shaderSource: string,
    shaderType: number,
    gl: WebGLRenderingContext,
  ): WebGLShader => {
    const shader: WebGLShader = gl.createShader(shaderType);
    gl.shaderSource(shader, shaderSource);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      throw 'Shader compile failed with: ' + gl.getShaderInfoLog(shader);
    }

    return shader;
  };

  render() {
    const { mode = 'dark' } = this.context;
    this.changeBackground(mode);
    return (
      <Fragment>
        <div
          style={{
            height: '100vh',
          }}
        >
          <canvas ref={this.canvasRef} id="main"></canvas>
        </div>
        {/*TODO: need tp remove this later*/}
        <div id="tweakpaneContainer" className="tweakpane-container" />
      </Fragment>
    );
  }
}

export default Metaballs;
