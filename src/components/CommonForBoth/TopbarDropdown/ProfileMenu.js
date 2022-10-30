import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

//i18n
import { withNamespaces } from "react-i18next";

// users
import avatar2 from '../../../assets/images/users/avatar-2.jpg';
import { Link } from 'react-router-dom';
import { get } from '../../../helpers/api_helper';

class ProfileMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menu: false,
            hasil: '',
            user: '0'
        };
        this.toggle = this.toggle.bind(this);
    }


    toggle() {
        this.setState(prevState => ({
            menu: !prevState.menu
        }));
    }
    async componentDidMount() {
        const config = {
            headers: {
                'Authorization': 'Bearer' + localStorage.getItem('token'),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        const data = await get('/me', config)

        if (data.code === 401) {
            localStorage.removeItem('token');
        } else {
            const user = data.user.balance
            this.setState({ user })
        }

        // this.setState({dataUser})
    }
    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    render() {

        // let username = "Admin";
        // if (localStorage.getItem("authUser")) {
        //     const obj = JSON.parse(localStorage.getItem("authUser"));
        //     const uNm = obj.email.split("@")[0];
        //     username = uNm.charAt(0).toUpperCase() + uNm.slice(1);
        // }



        return (
            <React.Fragment>
                <Dropdown isOpen={this.state.menu} toggle={this.toggle} className="d-inline-block user-dropdown">
                    <DropdownToggle tag="button" className="btn header-item waves-effect" id="page-header-user-dropdown">
                        <i className="mdi mdi-wallet d-none ms-1 d-xl-inline-block"></i>
                        <span className="d-none d-xl-inline-block ms-1 text-transform">{/* {username} */}{this.numberWithCommas(parseInt(this.state.user))}</span>
                        <i className="mdi mdi-chevron-down d-none ms-1 d-xl-inline-block"></i>
                        <img className="rounded-circle header-profile-user me-1" src={avatar2} alt="Header Avatar" />
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-end font-barlow">
                        <span className='px-4 my-3' style={{ fontWeight: 'bold' }}>Welcome</span>
                        <br />
                        <DropdownItem><Link to="/account"><i className="ri-wallet-2-line align-middle me-1"></i> {this.props.t('My Account')}</Link></DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem className="text-danger" href="/logout"><i className="ri-shut-down-line align-middle me-1 text-danger"></i> {this.props.t('Logout')}</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </React.Fragment>
        );
    }
}

export default withNamespaces()(ProfileMenu);
