import { LitElement, css, html, customElement } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { UMB_MODAL_MANAGER_CONTEXT } from "@umbraco-cms/backoffice/modal";

@customElement('dadjoke-header-app')
export default class TimeHeaderAppElement extends UmbElementMixin(LitElement) {

  #onTime() {
    // do something when you click

    this.consumeContext(UMB_MODAL_MANAGER_CONTEXT, (manager) => {
      manager.open(this, 'dadjoke.header.modal', {});
    })
  }

  render() {
    return html`
            <uui-button @click=${this.#onTime}
                look="primary"
                label="time"
                compact>
                <img src="/images/dad.png" alt="Avatar">
            </uui-button>
        `
    //      < uui - icon name = "icon-alarm-clock" > </uui-icon>
  }

  static styles = css`
        uui-button {
            font-size: 18pt;
            --uui-button-background-color: transparent;
        }
        uui-button img {
          width:2.25rem;
          transition: transform 0.3s ease;
        }
        uui-button img:hover {
          transform: rotate(-15deg);
        }
    `
}
