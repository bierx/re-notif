import React from 'react';
import { connect } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Notif from './Notif';
import PropTypes from 'prop-types';

// This checks to see if object is immutable and properly access it
const getter = (obj, propName) => (obj.get ? obj.get(propName) : obj[propName]);

const Notifs = props => {
  const {
    notifications,
    className,
    componentClassName,
    CustomComponent,
    transitionEnterTimeout,
    transitionLeaveTimeout
  } = props;

  const renderedNotifications = notifications.map(notification => {
    if (CustomComponent) {
      return (
        <CSSTransition
          key={getter(notification, 'id')}
          className={`${componentClassName}-transition`}
          timeout={{
            exit: transitionLeaveTimeout,
            enter: transitionEnterTimeout
          }}
        >
          <CustomComponent
            {...props}
            componentClassName={componentClassName}
            id={getter(notification, 'id')}
            message={getter(notification, 'message')}
            kind={getter(notification, 'kind')}
          />
        </CSSTransition>
      );
    }
    return (
      <CSSTransition
        key={getter(notification, 'id')}
        classNames={`${componentClassName}-transition`}
        timeout={{
          exit: transitionLeaveTimeout,
          enter: transitionEnterTimeout
        }}
      >
        <Notif
          {...props}
          componentClassName={componentClassName}
          id={getter(notification, 'id')}
          message={getter(notification, 'message')}
          kind={getter(notification, 'kind')}
        />
      </CSSTransition>
    );
  });
  const classes = [`${componentClassName}__container`, className]
    .join(' ')
    .split();

  return (
    <div className={classes}>
      <TransitionGroup>{renderedNotifications}</TransitionGroup>
    </div>
  );
};

Notifs.defaultProps = {
  className: null,
  componentClassName: 'notif',
  CustomComponent: null,
  transitionEnterTimeout: 600,
  transitionLeaveTimeout: 600
};

Notifs.propTypes = {
  notifications: PropTypes.array.isRequired,
  className: PropTypes.string,
  CustomComponent: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
    PropTypes.element
  ]),
  componentClassName: PropTypes.string,
  transitionEnterTimeout: PropTypes.number,
  transitionLeaveTimeout: PropTypes.number
};

function mapStateToProps(state) {
  return { notifications: state.get ? state.get('notifs') : state.notifs };
}

export default connect(mapStateToProps)(Notifs);
