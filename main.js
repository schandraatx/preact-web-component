import define from "preact-custom-element";
import {html, Component} from 'htm/preact';


class MyCounter extends Component {
  state = {
    count: 0,
  };

  inc = () => {
    this.setState((prev) => ({ count: prev.count + 1 }));
  };

  dec = () => {
    this.setState((prev) => ({ count: prev.count - 1 }));
  };

  render(props, state) {
    return html`
      <style>
        * {
          font-size: 200%;
        }

        span {
          width: 4rem;
          display: inline-block;
          text-align: center;
        }

        button {
          width: 4rem;
          height: 4rem;
          border: none;
          border-radius: 10px;
          background-color: seagreen;
          color: white;
        }
      </style>
      <button onClick=${this.dec}>
        -
      </button>
      <span>${state.count}</span>
      <button onClick=${this.inc}>
        +
      </button>
    `;
  }
}

define(MyCounter, "my-counter", ["count"], { shadow: true });
