var raptorPubsub = require('raptor-pubsub');
var button = require('src/components/app-button');
var extend = require('raptor-util/extend');

var buttonSizes = ['sm', '', 'lg'];
var buttonVariants = ['primary', 'secondary'];

var currentButtonSize = 0;
var currentButtonVariant = 0;

module.exports = {
  onInput: function(input) {
    var now = new Date().toString();

    this.state = {
      buttonSize: input.buttonSize || 'small',
      buttonVariant: input.buttonVariant || 'primary',
      overlayVisible: false,
      checked: input.checked || {
        foo: false,
        bar: true,
        baz: false
      },
      dynamicTabs: [
        {
          timestamp: now
        },
        {
          timestamp: now
        }
      ]
    };
  },

  /**
   * This demonstrates how to provide a custom state transition handler to avoid
   * a full rerender.
   */
  update_overlayVisible: function(overlayVisible) {
    this.getComponent('overlay').setVisibility(overlayVisible);
  },

  handleShowOverlayButtonClick: function() {
    // this.setState('overlayVisible', true);
    this.getComponent('overlay').show();
  },

  handleOverlayHide: function() {
    // Synchronize the updated state of the o
    this.setState('overlayVisible', false);
  },

  handleOverlayShow: function() {
    this.setState('overlayVisible', true);
  },

  handleShowNotificationButtonClick: function() {
    raptorPubsub.emit('notification', {
      message: 'This is a notification'
    });
  },

  handleOverlayOk: function() {
    raptorPubsub.emit('notification', {
      message: 'You clicked the "Done" button!'
    });
  },

  handleOverlayCancel: function() {
    raptorPubsub.emit('notification', {
      message: 'You clicked the "Cancel" button!'
    });
  },

  handleRenderButtonClick: function() {
    button
      .renderSync({
        label: 'Hello World'
      })
      .appendTo(this.getEl('renderTarget'));
  },

  handleChangeButtonSizeClick: function() {
    var nextButtonSize = buttonSizes[++currentButtonSize % buttonSizes.length];
    this.state.buttonSize = nextButtonSize;
  },

  handleChangeButtonVariantClick: function() {
    var nextButtonVariant = buttonVariants[++currentButtonVariant % buttonVariants.length];
    this.state.buttonVariant = nextButtonVariant;
  },

  handleAddTabButtonClick: function() {
    this.state.dynamicTabs = this.state.dynamicTabs.concat({
      timestamp: '' + new Date()
    });
  }
};
