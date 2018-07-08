import React from 'react';
import 'styles/Selection.scss';

const getSelectId = (() => {
  let counter = 0;
  return () => ++counter;
})();

export class Select extends React.PureComponent {

  render() {
    const { children, value, className = "" } = this.props;
    const { showMenu } = this.state;

    let selectOptionText = '';

    const options = React.Children.map(children, child => {
      let className = child.props.className;      
      if (child.props.value === value) {
        selectOptionText = child.props.children;
        className = className ? className + ' select' : 'select';
      } 
      return React.cloneElement(child, { 
        className,
        onClick: this.onOptionClick
      });
    });

    return (
      <div className={`selection-select ${className}`} onClick={this.onToggleSelectMenu}>
        {selectOptionText}
        <div className="selection-icon">
          <i className="fas fa-caret-up" />
          <i className="fas fa-caret-down" />
        </div>
        {
          showMenu &&
          <div className="selection-menu">
          {
            options
          }
          </div>
        }
        </div>
    );
  }


  static defaultProps = {
    onChange: f => f
  };

  state = { showMenu: false };
  selectId = getSelectId();

  onToggleSelectMenu = (e) => {
    e.target.dataset.selectId = this.selectId;
    this.setState(prevState => ({ showMenu: !prevState.showMenu }));
  };

  onOptionClick = (newValue) => {
    this.props.onChange(newValue);
  };

  onWindowClick = (e) => {
    if (+e.target.dataset.selectId !== this.selectId) {
      this.setState({showMenu: false});
    }
  };

  bindWindowClickEvent() {
    window.addEventListener('click', this.onWindowClick);
  };

  unbindWindowClickEvent() {
    window.removeEventListener('click', this.onWindowClick);
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.showMenu !== this.state.showMenu) {
      if (this.state.showMenu) {
        this.bindWindowClickEvent();
      } else {
        this.unbindWindowClickEvent();
      }
    }
  }

  componentWillUnmount() {
    this.unbindWindowClickEvent();
  }

}

export class Option extends React.PureComponent {
  render() {
    const {children, className = "", onClick, value} = this.props;
    return (
      <div className={`selection-option ${className}`} onClick={() => onClick(value)}>
      {
        children
      }
      </div>
    );
  };
}

