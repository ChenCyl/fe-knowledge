'use strict';

const e = React.createElement;

const isMetaMaskInstalled = () => {
  const { ethereum } = window;
  return Boolean(ethereum && ethereum.isMetaMask);
}

class SomeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { connected: false, buttonTitle: 'CONNECT' };
  }

  render() {
    if (this.state.connected) {
      return this.state.buttonTitle;
    }

    return e(
      'button',
      { onClick: async () => {
        if (!isMetaMaskInstalled()) {
          this.setState({ connected: false, buttonTitle: 'Please install and set a wallet at first!' })
          return
        }
        const accounts = await ethereum.request({method: 'eth_requestAccounts'})
        this.setState({ connected: true, buttonTitle: accounts[0] })
      }},
      this.state.buttonTitle
    );
  }
}

const domContainer = document.querySelector('#button_container');
ReactDOM.render(e(SomeButton), domContainer);