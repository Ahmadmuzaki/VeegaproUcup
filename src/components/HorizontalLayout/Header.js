import React, { Component } from "react";

import { connect } from "react-redux";

import { Link } from "react-router-dom";

// reactstrap
import { Form, Input, InputGroup, InputGroupAddon, Button, FormGroup } from "reactstrap";

//i18n
import { withNamespaces } from "react-i18next";

// Import menuDropdown
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu";


//Import Logos 
import veegalogo from "../../assets/images/veegalogo.png";

// Redux Store
import { toggleRightSidebar } from "../../store/actions";


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSearch: false,
            isMegaMenu: false,
            isProfile: false,
        };
        this.toggleMenu = this.toggleMenu.bind(this);
        this.toggleRightbar = this.toggleRightbar.bind(this);
        this.toggleFullscreen = this.toggleFullscreen.bind(this);
        this.toggleSearch = this.toggleSearch.bind(this);
    }

    toggleSearch = () => {
        this.setState({ isSearch: !this.state.isSearch });
    }
    /**
     * Toggle sidebar
     */
    toggleMenu() {
        this.props.openLeftMenuCallBack();
    }

    /**
     * Toggles the sidebar
     */
    toggleRightbar() {
        this.props.toggleRightSidebar();
    }

    toggleFullscreen() {
        if (
            !document.fullscreenElement &&
      /* alternative standard method */ !document.mozFullScreenElement &&
            !document.webkitFullscreenElement
        ) {
            // current working methods
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen(
                    Element.ALLOW_KEYBOARD_INPUT
                );
            }
        } else {
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
        }
    }
    


    render() {
        return (
            <React.Fragment>
                <header id="page-topbar">
                    <div className="navbar-header font-barlow">
                        <div className="d-flex">
                            <div className="navbar-brand-box">
                                <Link to="/" className="logo logo-dark">
                                    <span className="logo-sm">
                                        <img src={veegalogo} alt="" style={{ height: '1rem' }} />
                                    </span>
                                    <span className="logo-lg">
                                        <img src={veegalogo} alt="" style={{ height: '1rem' }} />
                                    </span>
                                </Link>

                                <Link to="/" className="logo logo-light">
                                    <span className="logo-sm">
                                        <img src={veegalogo} alt="" style={{ height: '1rem' }} />
                                    </span>
                                    <span className="logo-lg">
                                        <span className="font-contrax">Veega pro</span>
                                    </span>
                                </Link>
                            </div>

                            <Button color="none" type="button" size="sm" onClick={this.toggleMenu} className="px-3 font-size-24 d-lg-none header-item" data-toggle="collapse" data-target="#topnav-menu-content">
                                <i className="ri-menu-2-line align-middle"></i>
                            </Button>
                        </div>

                        <div className="d-flex">

                            <div className="dropdown d-inline-block d-lg-none ms-2">
                                <Button color="none" type="button" onClick={() => { this.setState({ isSearch: !this.state.isSearch }); }} className="header-item noti-icon waves-effect" id="page-header-search-dropdown" >
                                    <i className="ri-search-line"></i>
                                </Button>
                                <div className={this.state.isSearch ? "dropdown-menu dropdown-menu-lg dropdown-menu-end p-0 show" : "dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"}
                                    aria-labelledby="page-header-search-dropdown">

                                    <Form className="p-3">
                                        <FormGroup className="m-0">
                                            <InputGroup>
                                                <Input type="text" className="form-control" placeholder={this.props.t('Search')} />
                                                <InputGroupAddon addonType="append">
                                                    <Button color="primary" type="submit"><i className="ri-search-line"></i></Button>
                                                </InputGroupAddon>
                                            </InputGroup>
                                        </FormGroup>
                                    </Form>
                                </div>
                            </div>

                            <div className="dropdown d-none d-lg-inline-block ms-1">
                                <Button type="button" color="none" onClick={this.toggleFullscreen} className="header-item noti-icon waves-effect" data-toggle="fullscreen">
                                    <i className="ri-fullscreen-line"></i>
                                </Button>
                            </div>

                            <ProfileMenu />

                        </div>
                    </div>
                </header>
            </React.Fragment>
        );
    }
}

const mapStatetoProps = state => {
    const { layoutType } = state.Layout;
    return { layoutType };
};

export default connect(mapStatetoProps, { toggleRightSidebar })(withNamespaces()(Header));
