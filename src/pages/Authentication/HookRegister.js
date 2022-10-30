import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { Button, Col, Label, Row } from 'reactstrap'
import veegalogo from "../../assets/images/vega.png";
import axios from 'axios';
import { configApi } from '../../helpers/config';
import Swal from 'sweetalert2';


const axios2 = axios.create()


const HookRegister = () => {
    const [fullname, setFullname] = useState('')
    const [warningFullname, setWarningFullname] = useState(
        <div className="alert alert-danger" role="alert">
            Fullname Required*
        </div>
    )
    const [phone, setPhone] = useState('')
    const [warningPhone, setWarningPhone] = useState(
        <div className="alert alert-danger" role="alert">
            Phone Number Required*
        </div>
    )

    const [password, setPassword] = useState()
    const [passwordWarning, setPasswordWarning] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [confirmPasswordWarning, setConfirmPasswordWarning] = useState()

    const [user, setUser] = useState('')
    const [userValid, setUserValid] = useState('')
    const [warningUser, setWarningUser] = useState('')

    const [email, setEmail] = useState('')
    const [emailValid, setEmailValid] = useState('')
    const [warningEmail, setWarningEmail] = useState(
        <div className="alert alert-danger" role="alert">
            Email Required*
        </div>
    )

    const [referral, setReferral] = useState('')
    const [referralValid, setReferralValid] = useState('')
    const [warningReferral, setWarningReferral] = useState(<br />)

    const [placement, setPlacement] = useState('')
    const [placementValid, setPlacementValid] = useState('')
    const [warningPlacement, setWarningPlacement] = useState(<br />)

    let history = useHistory();
    useEffect(() => {
        try {

            axios2.get(`https://veeoffice.com/api/checker/username?username=${user}`)
                .then(res => {
                    if (res.data.message === false) {
                        setWarningUser(
                            <div className="alert alert-danger" role="alert">
                                Username Already Taken
                            </div>
                        )
                        setUserValid('border-danger')
                    } else if (user === '') {
                        setUserValid('')
                        setWarningUser(
                            <div className="alert alert-danger" role="alert">
                                Placement Required*
                            </div>
                        )
                    } else {
                        setUserValid('border-success')
                        setWarningUser(
                            <div className="alert alert-success" role="alert">
                                Username Available
                            </div>
                        )
                    }
                })
        } catch (error) {

        }
    }, [user]);

    useEffect(() => {
        try {
            axios2.get(`https://veeoffice.com/api/checker/email?email=${email}`)
                .then(res => {
                    if (res.data.message === false) {
                        setWarningEmail(
                            <div className="alert alert-danger" role="alert">
                                Email Already Registered
                            </div>
                        )
                        setEmailValid('border-danger')
                    } else if (email === '') {
                        setWarningEmail(
                            <div className="alert alert-danger" role="alert">
                                Email Required*
                            </div>
                        )

                    } else {
                        setEmailValid('border-success')
                        setWarningEmail(<br />)
                    }
                })

        } catch (error) {

        }
    }, [email]);
    useEffect(() => {
        try {
            axios2.get(`https://veeoffice.com/api/checker/referral?username=${referral}`)
                .then(res => {
                    if (res.data.message === false) {
                        setReferralValid('border-success')
                        setWarningReferral(

                            <div className="alert alert-success d-flex align-items-center" role="alert">
                                Referral
                                &nbsp;
                                {referral}
                                <i className='mdi mdi-check-all text-success'></i>
                            </div>
                        )
                    } else if (referral === '') {
                        setWarningReferral(
                            <div className="alert alert-danger" role="alert">
                                Referral Required*
                            </div>
                        )
                    } else {
                        setWarningReferral(
                            <div className="alert alert-danger" role="alert">
                                Referral Not Exist
                            </div>
                        )
                        setReferralValid('border-danger')
                    }
                })
        } catch (error) {

        }
    }, [referral]);

    useEffect(() => {
        try {
            axios2.get(`https://veeoffice.com/api/checker/placement?username=${placement}`)
                .then(res => {
                    if (res.data.message === false) {
                        setPlacementValid('border-success')
                        setWarningPlacement(
                            <div className="alert alert-success d-flex align-items-center" role="alert">
                                Placement
                                &nbsp;
                                {placement}
                                <i className='mdi mdi-check-all text-success'></i>
                            </div>
                        )
                    } else if (placement === '') {
                        setUserValid('')
                        setWarningPlacement(
                            <div className="alert alert-danger" role="alert">
                                Placement Required*
                            </div>
                        )
                    } else {
                        setWarningPlacement(
                            <div className="alert alert-danger" role="alert">
                                Referral Not Exist
                            </div>
                        )
                        setPlacementValid('border-danger')
                    }
                })
        } catch (error) {

        }
    }, [placement]);

    function onChangePassword(e) {
        if (e.target.value.length < 8) {
            setPasswordWarning(
                <div className="alert alert-danger" role="alert">
                    Password minimal 8 character
                </div>
            )
        } else {
            setPassword(e.target.value)
            setPasswordWarning(null)
            if (confirmPassword !== e.target.value) {
                setConfirmPasswordWarning(
                    <div className="alert alert-danger" role="alert">
                        Password Does not match
                    </div>
                );
            } else {
                setConfirmPasswordWarning(
                    <div className="alert alert-success" role="alert">
                        Password Match
                    </div>
                );
            }
        }
    }
    function onChangeConfirmPassword(e) {
        setConfirmPassword(e.target.value)
        if (e.target.value !== password) {
            setConfirmPasswordWarning(
                <div className="alert alert-danger" role="alert">
                    Password Does not match
                </div>
            );
        } else {
            setConfirmPasswordWarning(
                <div className="alert alert-success" role="alert">
                    Password Match
                </div>
            );
        }
    }

    function handleFullname(e) {
        if (e.target.value === '') {
            setWarningFullname(
                <div className="alert alert-danger" role="alert">
                    Fullname Required*
                </div>
            )
        } else {
            setFullname(e.target.value)
            setWarningFullname(<br />)
        }
    }
    function handlePhone(e) {
        if (e.target.value === '') {
            setWarningPhone(
                <div className="alert alert-danger" role="alert">
                    Phone Required*
                </div>
            )
        } else {
            setWarningPhone('')
            setPhone(e.target.value)
        }
    }
    function handleSubmit() {
        const data = {
            fullname: fullname,
            referral: referral,
            placement: placement,
            username: user,
            email: email,
            password: password,
            phone: phone,
            password_confirmation: confirmPassword
        }
        console.log(data);
        axios2.post('https://veeoffice.com/api/register', data, configApi)
            .then(res => {
                console.log(res.data);
                Swal.fire(
                    'Congratulation',
                    'Registration Success',
                    'success'
                ).then(() => {
                    history.push('/login')
                }
                )
            }).catch(() => {
                Swal.fire(
                    'Registration Failure',
                    'Please Try Again ',
                    'error'
                )
            })
    }
    return (
        <div className='container-fluid bg-white'>
            <Col>
                <div className="authentication-page-content p-4 d-flex align-items-center min-vh-100 h-100">
                    <div className="w-100">
                        <Row className="justify-content-center">
                            <Col lg={9}>
                                <div>
                                    <div className="text-center font-contrax">
                                        <img src={veegalogo} alt="" style={{ height: '2rem' }} />
                                        <span className='p-2' style={{ color: '#188ae2' }}>VEEGA PRO</span>
                                        <h4 className="font-size-18 mt-4">Register account</h4>
                                        {/* <p className="text-muted">Get your free Nazox account now.</p> */}
                                    </div>

                                    <div className="p-2 mt-2">
                                        <div className='form'>
                                            <div className="auth-form-group-custom">
                                                <i className="ri-user-2-line auti-custom-input-icon"></i>
                                                <Label htmlFor="fullname">Fullname</Label>
                                                <input type="text" className='form-control' id='fullname' placeholder='Input your Fullname'
                                                    onChange={handleFullname}
                                                />
                                            </div>
                                            {warningFullname}
                                            <Row>
                                                <Col xl={6}>
                                                    <div className="auth-form-group-custom">
                                                        <i className="ri-user-2-line auti-custom-input-icon"></i>
                                                        <Label htmlFor="referral">Referral</Label>
                                                        <input type="text" className={`form-control ${referralValid}`} id='referral' placeholder='Input Referral'
                                                            onChange={(e) => {
                                                                setReferral(e.target.value)
                                                            }}
                                                        />
                                                    </div>
                                                    {warningReferral}
                                                </Col>
                                                <Col xl={6}>
                                                    <div className="auth-form-group-custom">
                                                        <i className="ri-user-2-line auti-custom-input-icon"></i>
                                                        <Label htmlFor="placement">Placement</Label>
                                                        <input type="text" className={` form-control ${placementValid}`} id='placement' placeholder='Input Placement'
                                                            onChange={(e) => {
                                                                setPlacement(e.target.value)
                                                            }}
                                                        />

                                                    </div>
                                                    {warningPlacement}
                                                </Col>
                                            </Row>
                                            <div className="auth-form-group-custom">
                                                <i className="ri-mail-line auti-custom-input-icon"></i>
                                                <Label htmlFor="email">Email Address</Label>
                                                <input type="text" className={`form-control ${emailValid}`} id='email' placeholder='Input Email Address'
                                                    onChange={(e) => {
                                                        setEmail(e.target.value)
                                                    }}
                                                />
                                            </div>
                                            {warningEmail}
                                            <Row>
                                                <Col xl={6}>
                                                    <div className="auth-form-group-custom">
                                                        <i className="ri-user-2-line auti-custom-input-icon"></i>
                                                        <Label htmlFor="username">Username</Label>
                                                        <input type="text" className={`form-control ${userValid} `} id='username' placeholder='Input Username'
                                                            onChange={(e) => {
                                                                setUser(e.target.value)
                                                            }}
                                                        />
                                                    </div>
                                                    {warningUser}
                                                </Col>
                                                <Col xl={6}>
                                                    <div className="auth-form-group-custom">
                                                        <i className="ri-user-2-line auti-custom-input-icon"></i>
                                                        <Label htmlFor="phone">Phone</Label>
                                                        <input type="number" className='form-control' id='phone' placeholder='Input phone number'
                                                            onChange={handlePhone}
                                                        />
                                                    </div>
                                                    {warningPhone}
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xl={6}>
                                                    <div className="auth-form-group-custom mb-4">
                                                        <i className="ri-lock-2-line auti-custom-input-icon"></i>
                                                        <Label htmlFor="userpassword">Password</Label>
                                                        <input type="password" className='form-control' id='userpassword' placeholder='Password'
                                                            onChange={onChangePassword}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col xl={6} className="mb-3">
                                                    <div className="auth-form-group-custom">
                                                        <i className="ri-lock-2-line auti-custom-input-icon"></i>
                                                        <Label htmlFor="passwordconfirmation">Password Confirmation</Label>
                                                        <input type="password" className='form-control' id='passwordconfirmation' placeholder='Confirm Password'
                                                            onChange={onChangeConfirmPassword}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col>
                                                    {passwordWarning}
                                                </Col>
                                                <Col>
                                                    {confirmPasswordWarning === '' ?
                                                        null :
                                                        confirmPasswordWarning}
                                                </Col>
                                            </Row>
                                            <div className="text-center">
                                                <Button color="primary" className="w-md waves-effect waves-light" type="submit"
                                                    onClick={handleSubmit}
                                                >Sign Up</Button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-2 text-center">
                                        <p>Already have an account ? <Link to="/login" className="fw-medium text-primary"> Login</Link> </p>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Col>
        </div>
    )
}

export default HookRegister