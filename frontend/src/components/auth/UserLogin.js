import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { userLogin } from '../../actions/auth'

import PropTypes from 'prop-types'


const UserLogin = ({ userLogin,isAuthenticated }) => {

    const [formData,setFormData] = useState({
        email:"",
        password:"",
    })

    const {email,password} = formData;

    const onChange = e=>setFormData({...formData,[e.target.name]:e.target.value})
    const onSubmit =async e => {
        e.preventDefault()
        userLogin(email,password)
    }


    // Redirect to seach buses//
    if(isAuthenticated){
        return <Redirect to="/searchBuses" />
    }

    return (
        <Fragment>
        <div class="fluid-container limit">
                <div class="login-container">
                    <div class="bb-login">
                        <form class="bb-form validate-form" onSubmit={e => onSubmit(e)}> <span class="bb-form-title p-b-26"> Welcome </span> <span class="bb-form-title p-b-48"> <i class="mdi mdi-symfony"></i> </span>
                            <div class="wrap-input100 validate-input" data-validate="Valid email is: a@b.c"> <input class="input100" type="email" name="email" value={email} onChange={e => onChange(e)}/> <span class="bbb-input" data-placeholder="Email"></span> </div>
                            <div class="wrap-input100 validate-input" data-validate="Enter password"> <span class="btn-show-pass"> <i class="mdi mdi-eye show_password"></i> </span>
                             <input class="input100" type="password" name="password" value={password} onChange={e => onChange(e)} /> <span class="bbb-input" data-placeholder="Password"></span> </div>
                            <div class="login-container-form-btn">
                                <div class="bb-login-form-btn">
                                    <div class="bb-form-bgbtn"></div> <button class="bb-form-btn"> Login </button>
                                </div>
                            </div>
                            <div class="text-center p-t-115"> <span class="txt1"> Don’t have an account? </span> <Link class="txt2" to="/user/register"> Sign Up </Link> </div>
                        </form>
                    </div>
                </div>
            </div>
            </Fragment>
    )
}


UserLogin.propTypes = {
    userLogin:PropTypes.func.isRequired,
    isAuthenticated:PropTypes.bool.isRequired,
}


const mapStateToProps = state => ({
    isAuthenticated:state.auth.isAuthenticated
})



export default connect(mapStateToProps,{ userLogin })(UserLogin)