import { basicStyle } from "../shared/style.mjs";

export class HomePage extends HTMLElement {
  /** @type {ShadowRoot | undefined} */
  shadowRoot = undefined;

  dayperiod = undefined;

  css = () => /* css */ `
    ${basicStyle}

    :host .home {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;

      & > timetable-component {
        height: 60%;
      }

      & > timetable-detail {
        height: 40%;
      }
    }
  `;

  html = () => /* html */ `
    <style>${this.css()}</style>
    <div class="home">
      <timetable-component></timetable-component>
      <timetable-detail dayperiod="${this.dayperiod ?? ""}"></timetable-detail>
    </div>
  `;

  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();

    this.shadowRoot.addEventListener("tableItemClick", (event) => {
      console.log(event.detail);
      this.dayperiod = event.detail;
      this.render();
    });
  }

  render() {
    this.shadowRoot.innerHTML = this.html();
  }
}
