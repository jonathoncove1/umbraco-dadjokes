import { html, customElement, state } from "@umbraco-cms/backoffice/external/lit";
import { DadJokeService } from "../api";
import { UmbModalBaseElement } from "@umbraco-cms/backoffice/modal";

@customElement('dadjoke-header-modal')
export default class TimeHeaderModalElement extends UmbModalBaseElement {
   
  @state()
  private joke: string | undefined;
    

  async connectedCallback() {
    super.connectedCallback();
    try {
      const { data, error } = await DadJokeService.getAJoke();
      if (error) {
      } else {
        this.joke = data?.joke;
      }
    } catch (err) {
    }
  }

  #handleClose() {
    this.modalContext?.reject();
  }

  render() {

    return html`
            <uui-dialog-layout class="uui-text"
                headline="Dad says:">
                <p>${this.joke}</p> 

                <uui-button slot="actions" id="close" label="Close"
                    look='primary'  color='danger'
                     @click="${this.#handleClose}">Close</uui-button>

            </uui-dialog-layout>
        `;
  }
}
