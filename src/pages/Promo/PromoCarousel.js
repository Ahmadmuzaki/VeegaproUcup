import React, { Component } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button, Card } from "reactstrap";
import { Link } from "react-router-dom";
import { get} from "../../helpers/api_helper";
import { configApi } from "../../helpers/config";
import { numberWithCommas } from '../../utils/numberwithcomma';

export default class PromoCarousel extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data_reward: []
        }
    }
    settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    async componentDidMount() {
        const data = await get('/promo', configApi)
        this.setState({ data_reward: data.data })
    }
    render() {
        return (
            <div className='font-barlow'>
                <Slider {...this.settings}>
                    {this.state.data_reward && this.state.data_reward.map((data, index) => (
                        <div key={index}>
                            <Card className="px-4 pt-3 d-flex flex-column" style={{ marginRight: '1rem', height: '26rem' }}>
                                <center>
                                    <img src={`https://veegapro.com/assets/promo-image/${data.image || ''}`} alt="" className="w-50" />
                                    <div className="py-3">
                                        <h4>{data.promo_name || ''}</h4>
                                        <h4>{numberWithCommas(data.promo_price) || ''}</h4>
                                    </div>
                                </center>
                                <Link to={`/detail/${data.id}`} className="align-self-center mb-3 mt-auto">
                                    <Button color="primary mt-auto ">Get It</Button>
                                </Link>
                            </Card>
                        </div>
                    ))}

                </Slider>
            </div>
        )
    }
}
