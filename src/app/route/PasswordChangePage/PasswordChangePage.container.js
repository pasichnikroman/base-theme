/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import BreadcrumbsDispatcher from 'Store/Breadcrumbs/Breadcrumbs.dispatcher';
import { updateMeta } from 'Store/Meta/Meta.action';
import MyAccountDispatcher from 'Store/MyAccount/MyAccount.dispatcher';
import { showNotification } from 'Store/Notification/Notification.action';

import PasswordChangePage from './PasswordChangePage.component';

export const mapStateToProps = state => ({
    passwordResetStatus: state.MyAccountReducer.passwordResetStatus
});

export const mapDispatchToProps = dispatch => ({
    updateMeta: meta => dispatch(updateMeta(meta)),
    updateBreadcrumbs: (breadcrumbs) => {
        BreadcrumbsDispatcher.update(breadcrumbs, dispatch);
    },
    resetPassword(options) {
        MyAccountDispatcher.resetPassword(options, dispatch);
    },
    updateCustomerPasswordResetStatus(options) {
        MyAccountDispatcher.updateCustomerPasswordResetStatus(options, dispatch);
    },
    showNotification(type, message) {
        dispatch(showNotification(type, message));
    }
});

export class PasswordChangePageContainer extends PureComponent {
    static propTypes = {
        updateMeta: PropTypes.func.isRequired
    };

    componentDidMount() {
        const { updateMeta } = this.props;

        updateMeta({ title: __('Password Change Page') });
    }

    render() {
        return (
            <PasswordChangePage
              { ...this.props }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordChangePageContainer);
