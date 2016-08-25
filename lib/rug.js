'use babel';

import RugView from './rug-view';
import { CompositeDisposable } from 'atom';

export default {

  rugView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.rugView = new RugView(state.rugViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.rugView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'rug:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.rugView.destroy();
  },

  serialize() {
    return {
      rugViewState: this.rugView.serialize()
    };
  },

  toggle() {
    console.log('Rug was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
