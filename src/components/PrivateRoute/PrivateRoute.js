import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {userFromLocalStorage} from "../../axious-config";
//let user = userFromLocalStorage()


const PrivateRoute = ({ component: Component, auth, ...rest }) => (

    // <Route
    //     {...rest}
    //     render={props =>
    //         localStorage.getItem().token ? (
    //             <Component {...props} />
    //         ) : (
    //                 <Redirect to="/login" />
    //             )
    //     }
    // />
    <Route
        {...rest}
        render={props =>{
            if(localStorage.getItem("user") != null){

                return <Component {...props} />

            }
            return <Redirect to={{ pathname: `/login`, state: { from: props.location } }} />
        }}
    />
);

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
