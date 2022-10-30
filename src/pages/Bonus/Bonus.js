import React, { Component } from "react";
import { TabContent, TabPane, NavLink, Nav, Card, Row, Col, CardBody } from "reactstrap";


import classnames from "classnames";
import { TableDirectSponsor } from "./TableDirectSponsor";
import { TableLeveling } from "./TableLeveling";
import { TableGlobalPool } from "./TableGlobalPool";
import { TableRank } from "./TableRank";
import { TableLeadership } from "./TableLeadership";
import { TableExtraLeadership } from "./TableExtraLeadership";
import { get } from "../../helpers/api_helper";
import { numberWithCommas } from "../../utils/numberwithcomma";

class Bonus extends Component {
	constructor(props) {
		super(props);
		this.state = {
			customActiveTab: "1",
			dataTableGlobal: [],
			dataTableRankRate: [],
			dataTableLeadership: [],
			dataTableExtraLeadership: [],
			dataTabledataLeveling: [],
			dataTableDirectSponsor: [],
			bonusDirectSponsor: '',
			bonusLeveling: '',
			bonusGlobalPool: '',
			bonusRateRank: '',
			bonusLeadership: '',
			bonusExtraLeadership: '',

		};

		this.toggleCustom = this.toggleCustom.bind(this);
	}

	toggleCustom(tab) {
		if (this.state.customActiveTab !== tab) {
			this.setState({
				customActiveTab: tab
			});
		}
	}
	async componentDidMount() {
		const config = {
			headers: {
				'Authorization': 'Bearer' + localStorage.getItem('token'),
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}
		const directSponsor = await get('/bonus/leveling', config)
		const dataTableDirectSponsor = directSponsor.data
		const bonusDirectSponsor = directSponsor.total_bonus_direct_sponsor_leveling
		this.setState({ dataTableDirectSponsor })
		this.setState({ bonusDirectSponsor })

		const dataLeveling = await get('/bonus/leveling', config)
		const dataTabledataLeveling = dataLeveling.data
		const bonusLeveling = dataLeveling.total_bonus_direct_sponsor_leveling
		this.setState({ dataTabledataLeveling })
		this.setState({ bonusLeveling })

		const dataGlobalPool = await get('/bonus/global-pool-sponsorship', config)
		const dataTableGlobal = dataGlobalPool.data
		const bonusGlobalPool = dataGlobalPool.total_global_pool_sponsor
		this.setState({ dataTableGlobal })
		this.setState({ bonusGlobalPool })

		const dataRankRate = await get('/bonus/rank-rate', config)
		const dataTableRankRate = dataRankRate.data
		const bonusRateRank = dataRankRate.rank_rate
		this.setState({ dataTableRankRate })
		this.setState({ bonusRateRank })

		const dataLeadership = await get('/bonus/leadership', config)
		const dataTableLeadership = dataLeadership.data
		const bonusLeadership = dataLeadership.total_bonus_leadership
		this.setState({ dataTableLeadership })
		this.setState({ bonusLeadership })

		const dataExtraLeadership = await get('/bonus/extra-leadership', config)
		const dataTableExtraLeadership = dataExtraLeadership.data
		const bonusExtraLeadership = dataLeadership.total_bonus_leadership
		this.setState({ dataTableExtraLeadership })
		this.setState({ bonusExtraLeadership })
	}

	render() {
		const { bonusDirectSponsor, bonusLeveling, bonusGlobalPool, bonusRateRank, bonusLeadership, bonusExtraLeadership } = this.state
		return (
			<React.Fragment>
				<Row>
					<Col xl={12}>
						<Card>
							<CardBody>
								<Row>
									<Col md={3}>
										<Nav pills className="flex-column" id="v-pills-tab" role="tablist" aria-orientation="vertical">
											<NavLink id="v-pills-home-tab" style={{ cursor: "pointer" }}
												className={classnames({
													active: this.state.customActiveTab === "1"
												}, "mb-2")}
												onClick={() => {
													this.toggleCustom("1");
												}} aria-controls="v-pills-home" aria-selected="true">
												Direct Sponsor
											</NavLink>
											<NavLink id="v-pills-profile-tab" style={{ cursor: "pointer" }}
												className={classnames({
													active: this.state.customActiveTab === "2"
												}, "mb-2")}
												onClick={() => {
													this.toggleCustom("2");
												}} aria-controls="v-pills-home" aria-selected="true">
												Leveling
											</NavLink>
											<NavLink id="v-pills-messages-tab" style={{ cursor: "pointer" }}
												className={classnames({
													active: this.state.customActiveTab === "3"
												}, "mb-2")}
												onClick={() => {
													this.toggleCustom("3");
												}} aria-controls="v-pills-home" aria-selected="true">
												Global Pool Sponsorship
											</NavLink>
											<NavLink id="v-pills-settings-tab" style={{ cursor: "pointer" }}
												className={classnames({
													active: this.state.customActiveTab === "4"
												})}
												onClick={() => {
													this.toggleCustom("4");
												}} aria-controls="v-pills-home" aria-selected="true">
												Rate Rank
											</NavLink>
											<NavLink id="v-pills-settings-tab" style={{ cursor: "pointer" }}
												className={classnames({
													active: this.state.customActiveTab === "5"
												})}
												onClick={() => {
													this.toggleCustom("5");
												}} aria-controls="v-pills-home" aria-selected="true">
												Leadership
											</NavLink>
											<NavLink id="v-pills-settings-tab" style={{ cursor: "pointer" }}
												className={classnames({
													active: this.state.customActiveTab === "6"
												})}
												onClick={() => {
													this.toggleCustom("6");
												}} aria-controls="v-pills-home" aria-selected="true">
												Extra Leadership
											</NavLink>
										</Nav>
									</Col>
									<Col md={9}>
										<TabContent activeTab={this.state.customActiveTab} className="text-muted mt-4 mt-md-0" id="v-pills-tabContent">
											<TabPane tabId="1" role="tabpanel" aria-labelledby="v-pills-home-tab">
												<h6>Direct Sponsor</h6>
												<p>Total Bonus Direct Sponsor : Rp. {numberWithCommas(parseInt(bonusDirectSponsor))}</p>
												<TableDirectSponsor data={this.state.dataTableDirectSponsor.data} />
											</TabPane>
											<TabPane tabId="2" role="tabpanel" aria-labelledby="v-pills-profile-tab">
												<h6>Leveling</h6>
												<p>Total Bonus Leveling : Rp. {numberWithCommas(parseInt(bonusLeveling))}</p>
												<TableLeveling data={this.state.dataTabledataLeveling} />
											</TabPane>
											<TabPane tabId="3" role="tabpanel" aria-labelledby="v-pills-messages-tab">
												<h6>Global Pool Sponsorship</h6>
												<p>Total Bonus Global Pool Sponsorship : Rp. {numberWithCommas(parseInt(bonusGlobalPool))}</p>
												<TableGlobalPool data={this.state.dataTableGlobal} />
											</TabPane>
											<TabPane tabId="4" role="tabpanel" aria-labelledby="v-pills-settings-tab">
												<h6>Rank Rate</h6>
												<p>Total Bonus Rank Rate : Rp. {numberWithCommas(parseInt(bonusRateRank))}</p>
												<TableRank />
											</TabPane>
											<TabPane tabId="5" role="tabpanel" aria-labelledby="v-pills-settings-tab">
												<h6>Leadership</h6>
												<p>Total Bonus Leadership : Rp. {numberWithCommas(parseInt(bonusLeadership))}</p>
												<TableLeadership data={this.state.dataTableLeadership} />
											</TabPane>
											<TabPane tabId="6" role="tabpanel" aria-labelledby="v-pills-settings-tab">
												<h6>Extra Leadership</h6>
												<p>Total Bonus Extra Leadership : Rp. {numberWithCommas(parseInt(bonusExtraLeadership))}</p>
												<TableExtraLeadership data={this.state.dataTableExtraLeadership} />
											</TabPane>
										</TabContent>
									</Col>
								</Row>

							</CardBody>
						</Card>
					</Col>
				</Row>
			</React.Fragment>
		);
	}
}

export default Bonus;
