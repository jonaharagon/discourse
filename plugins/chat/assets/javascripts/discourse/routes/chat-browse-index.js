import DiscourseRoute from "discourse/routes/discourse";
import { inject as service } from "@ember/service";
import { defaultHomepage } from "discourse/lib/utilities";

export default class ChatBrowseIndexRoute extends DiscourseRoute {
  @service chat;
  @service siteSettings;

  beforeModel() {
    if (!this.siteSettings.enable_public_channels) {
      return this.transitionTo(`discovery.${defaultHomepage()}`);
    }
  }

  activate() {
    this.chat.activeChannel = null;
  }

  afterModel() {
    this.replaceWith("chat.browse.open");
  }
}
