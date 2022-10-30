import React, { Component } from 'react'
import { TabContent, TabPane, NavLink, NavItem,  Nav, Row, Col } from "reactstrap";
import classnames from "classnames";
import TreeView from './TreeViewPlacement';
import TreeViewReferral from './TreeViewReferral';


export default class TabsReferral extends Component {
    constructor(props) {
        super(props)

        this.state = {
            activeTab: "1",
        }
        this.toggle = this.toggle.bind(this);

    }
    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    render() {
        return (
            <div className='mt-5'>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                                active: this.state.activeTab === "1"
                            })}
                            onClick={() => {
                                this.toggle("1");
                            }}
                        >
                            Network Tree by Sponsor
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                                active: this.state.activeTab === "2"
                            })}
                            onClick={() => {
                                this.toggle("2");
                            }}
                        >
                             Network Tree by Placement
                        </NavLink>
                    </NavItem>
                </Nav>

                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <Row>
                            <Col sm="12">
                                <TreeViewReferral/>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row>
                            <Col sm="12">
                                <TreeView/>
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>
            </div>
        )
    }
}
