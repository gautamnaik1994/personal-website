import React, { Fragment } from 'react';
import Tweakpane from 'tweakpane';
import { ThemeContext } from 'styled-components';

interface IState {
  radiusDivider: number | null;
  smallCircleRadius: number | null;
  color: string | null;
  distributionRadius: number | null;
  xSpeed: number | null;
  ySpeed: number | null;
  svgCenter: [number, number] | null;
  ballCount: number | null;
  blurStdDeviation: number | null;
  matrixW: number | null;
  matrixAlpha: number | null;
}

declare module 'react' {
  interface HTMLProps<T> {
    vx?: number;
    vy?: number;
  }
}

interface IProps {
  showTweakPane: boolean;
}

class Metaballs extends React.Component<IProps, IState> {
  config = {
    ballCount: 5,
    smallCircleRadius: 100,
    distributionRadius: 90,
    color: '#8df',
    blurStdDeviation: 30,
    matrixAlpha: 25,
    matrixW: 20,
    xSpeed: 1,
    ySpeed: 1,
    radiusDivider: 9,
  };
  private svgRef: React.RefObject<HTMLElement>;
  private ballHolder: React.RefObject<HTMLElement>;
  constructor(props: IProps) {
    super(props);
    this.svgRef = React.createRef();
    this.ballHolder = React.createRef();
    this.state = {
      svgCenter: null,
      ...this.config,
    };
  }

  static contextType = ThemeContext;

  animationRequest: number | null = null;
  timerID: number | null = null;
  private ballHolderElem: HTMLElement | null = null;
  allCircles: NodeListOf<HTMLElement> | null = null;
  SVG_WIDTH: number | null = null;
  SVG_HEIGHT: number | null = null;
  SVG_CENTER_X: number | null = null;
  SVG_CENTER_Y: number | null = null;
  // matrixW = this.config.matrixW;

  widthMultiplier = (): number => {
    if (this.SVG_HEIGHT > this.SVG_WIDTH) {
      return this.SVG_HEIGHT / (this.state?.radiusDivider * 100);
    } else return this.SVG_WIDTH / (this.state?.radiusDivider * 100);
  };

  cancelAll = (): void => {
    const cancelAnimationFrame =
      window.cancelAnimationFrame || window.mozCancelAnimationFrame;
    cancelAnimationFrame(this?.animationRequest);
    clearTimeout(this?.timerID);
  };

  componentDidMount(): void {
    this.cancelAll();

    const svgElem = this.svgRef.current;
    this.SVG_HEIGHT = svgElem!.clientHeight;
    this.SVG_WIDTH = svgElem!.clientWidth;
    this.SVG_CENTER_X = this.SVG_WIDTH / 2;
    this.SVG_CENTER_Y = this.SVG_HEIGHT / 2;
    this.setState({
      svgCenter: [this.SVG_CENTER_X, this.SVG_CENTER_Y],
    });
    // console.log(this.config)
    const PARAMS = {
      ...this.config,
    };

    if (this.props.showTweakPane) {
      const pane = new Tweakpane({
        container: document.getElementById('tweakpaneContainer'),
      });
      const f1 = pane.addFolder({
        title: 'Tweaks',
      });

      for (const [key, val] of Object.entries(this.config)) {
        f1.addInput(PARAMS, key, {
          min: 1,
          max: 100,
          step: 1,
        }).on('change', (val) => {
          this.setState({
            [key]: val,
          });
        });
      }
    }

    this.ballHolderElem = this.ballHolder.current;
    this.allCircles = this.ballHolderElem?.childNodes;
    this.step();
    // console.log('last');
    // console.log(this.widthMultiplier());
  }

  step = (): void => {
    // console.log("stepping");
    const requestAnimationFrame =
      window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame;

    for (let i = 0; i < this.allCircles.length; i++) {
      const _mb: HTMLElement = this.allCircles[i];
      const r = parseFloat(_mb.attributes.r.nodeValue);
      const scrollY = window.scrollY;
      const mb = {
        x: parseFloat(_mb.getBoundingClientRect().left + r),
        y: parseFloat(_mb.getBoundingClientRect().top + scrollY + r),
        vx: parseFloat(_mb.attributes.vx.nodeValue),
        vy: parseFloat(_mb.attributes.vy.nodeValue),
        r: r - this.state.matrixW,
      };
      // console.log(_mb.attributes.vx.nodeValue);
      // const _vx = mb.vx;
      // const _vy = mb.vy;
      // mb.r -= 20;
      mb.x += mb.vx;
      if (mb.x - mb.r < 0) {
        mb.x = mb.r + 1;
        mb.vx = Math.abs(mb.vx);
        _mb.attributes.vx.nodeValue = mb.vx;
      } else if (mb.x + mb.r > this.SVG_WIDTH) {
        mb.x = this.SVG_WIDTH - mb.r;
        mb.vx = -Math.abs(mb.vx);
        _mb.attributes.vx.nodeValue = mb.vx;
      }

      mb.y += mb.vy;

      if (mb.y - mb.r < 0) {
        mb.y = mb.r + 1;
        mb.vy = Math.abs(mb.vy);
        _mb.attributes.vy.nodeValue = mb.vy;
      } else if (mb.y + mb.r > this.SVG_HEIGHT) {
        mb.y = this.SVG_HEIGHT - mb.r;
        mb.vy = -Math.abs(mb.vy);
        _mb.attributes.vy.nodeValue = mb.vy;

        // _mb.setAttribute("vy", mb.vy);
      }

      _mb.style.transform = `translate(${mb.x - this.SVG_CENTER_X}px,${mb.y - this.SVG_CENTER_Y
        }px )`;
      // _mb.setAttribute("vx", mb.vx);

      // debugger;
    }

    this.timerID = setTimeout(() => {
      this.animationRequest = requestAnimationFrame(this.step);
    }, 1000 / 60);
  };

  generatePointsOnCircle = (
    radius: number,
    count: number,
  ): Array<{ x: number; y: number }> => {
    const points = [];
    const svgCenter = this.state.svgCenter;
    for (let i = 1; i <= count; i++) {
      const x = svgCenter[0] + radius * Math.cos((2 * i * Math.PI) / count);
      const y = svgCenter[1] + radius * Math.sin((2 * i * Math.PI) / count);
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

  renderBalls = (n: number): Array<JSX.Element> => {
    const {
      smallCircleRadius,
      color,
      distributionRadius,
      xSpeed,
      ySpeed,
      svgCenter,
    }: IState = this.state;
    // var points = this.generatePointsOnCircle(distributionRadius * 1.5, n);
    const balls = [];
    for (let i = 0; i < n; i++) {
      balls.push(
        <circle
          key={i}
          cx={svgCenter[0]}
          cy={svgCenter[1]}
          className="balls"
          r={Math.max(50, Math.random() * 100 + 70) * this.widthMultiplier()}
          fill="black"
          vx={Math.random() * xSpeed * this.choose([-1, 1])}
          vy={Math.random() * ySpeed * this.choose([-1, 1])}
        />,
      );
    }

    return balls;
  };

  render() {
    const {
      ballCount,
      blurStdDeviation,
      matrixW,
      matrixAlpha,
    }: IState = this.state;

    const { mode } = this.context;

    return (
      <Fragment>
        <svg
          ref={this.svgRef}
          className="metaball-svg"
        // width="100%"
        // height="100%"
        >
          <defs>
            <filter id="gooey">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation={blurStdDeviation}
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values={`1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${matrixAlpha} -${matrixW}`}
                result="goo"
              />
              {/* <feDropShadow dx="0" dy="0" stdDeviation="0" /> */}
            </filter>
            <linearGradient id="myGradient" gradientTransform="rotate(90)">
              <stop offset="1%" stopColor="#0575E6" />
              <stop offset="99%" stopColor="#00F260" />
            </linearGradient>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url('#myGradient')"
            strokeWidth="0"
          />
          <rect
            width="100%"
            height="100%"
            fill={mode === 'dark' ? '#212738' : '#ffffff'}
            strokeWidth="0"
            mask="url(#metaballsMask)"
          />
          <mask id="metaballsMask">
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            <g filter="url(#gooey)" ref={this.ballHolder}>
              {this.state.svgCenter && this.renderBalls(ballCount)}
            </g>
          </mask>
        </svg>
        {/*TODO: need tp remove this later*/}
        <div id="tweakpaneContainer" className="tweakpane-container" />
      </Fragment>
    );
  }
}

export default Metaballs;
