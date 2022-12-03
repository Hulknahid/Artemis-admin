import React, { Component } from 'react';

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';
import TabsIcon from '../../components/Tabs/TabsIcon';
import classnames from 'classnames';

import axios from '../../axious-config';
import authHeader from "../../helper/authHeader";
//import LinesPreloader from "../../components/Preloaders/LinesPreloader";

// Custom Component
// import { CardDefault } from '../../components/UI/Card/Card'; // not valid

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      viewing: '',
      groupBy: 'companies',
      loading: true,
      refData: {}
    }
    this.handleHomeFilter = this.handleHomeFilter.bind(this);

  }

  componentDidMount() {
    this.loadSetting();
  }

  loadSetting() {
    const requestOptions = {
      headers: authHeader()
    }

    axios.get('/app-settings', requestOptions)
      .then(res => {
        localStorage.setItem('appSettings', JSON.stringify(res.data))
        this.setState({
          loading: false,
          refData: res.data.refData
        })
      })
      .catch()
  }



  handleHomeFilter(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  //filter from home screen
  homeFilter = () => {
    //
  }

  render() {
    const { loading } = this.state;
    return (

      <div className="container-fluid">

        <div className="row">
          <div className="col-lg-8">

            {/* Home top card  */}
            <div className="row home-top-card">
              {/* Card  */}
              <div className="col-md-6 col-xl-3">
                <div className="card card-default mb-3">
                  <h6 className="text-dark font-weight-bold">Recruiting </h6>
                  <div className="d-flex justify-content-between">
                    <div className="left">
                      <span className="d-block">7 Jobs</span>
                    </div>
                    <div className="right">
                      <span className="text-dark">7 For You</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Card  */}
              <div className="col-md-6 col-xl-3">
                <div className="card card-default mb-3">
                  <h6 className="text-green font-weight-bold ">Sales </h6>
                  <div className="d-flex justify-content-between">
                    <div className="left">
                      <span className="d-block">8 Total</span>
                      <span className="d-block">1 Leads</span>
                    </div>
                    <div className="right">
                      <span className="text-dark">8 For You</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card  */}
              <div className="col-md-6 col-xl-3">
                <div className="card card-default mb-3">
                  <h6 className="text-dark font-weight-bold"> Intake </h6>
                  <div className="d-flex justify-content-between">
                    <div className="left">
                      <span className="d-block">0 Total</span>
                      <span className="d-block">0 Recent</span>
                    </div>
                    <div className="right">
                      <span className="text-dark">0 For You</span>
                    </div>
                  </div>
                </div>
              </div>


              <div className="card-md-6 col-xl-3">
                <div className="d-flex flex-wrap">
                  <label className="mr-3">Month</label>
                  <div className="custom-control custom-switch">
                    <input type="checkbox" className="custom-control-input" id="customSwitch1" />
                    <label className="custom-control-label" htmlFor="customSwitch1">Year</label>
                  </div>
                </div>
              </div>

            </div>

            {/***** Home Filter  *****/}
            <div className="home-filter d-flex align-items-center flex-wrap">
              <div className="d-flex align-items-center mr-7 mb-3">
                <span className="text-secondary">Vewing</span>

                <select name="viewing" id="" className="form-control select-custom" onChange={this.homeFilter}>
                  <option value="allJobs" selected>All Jobs</option>
                  <option value="sinlg1">Single Jobs One</option>
                  <option value="sinle2">Single Jobs Two</option>
                  <option value="sinle3">Single Jobs Three</option>
                </select>
              </div>
              <div className="d-flex align-items-center mb-3">
                <span className="text-secondary text-nowrap">Group by</span>

                <select name="groupBy" className="form-control select-custom" onChange={this.handleHomeFilter}>
                  <option value="companies" selected>Companies</option>
                  <option value="status">Status</option>
                </select>

              </div>
            </div>



            {/***** Companies List  *****/}
            <div className={classnames('companies-list', { 'active': this.state.groupBy === 'companies' })} >
              <Accordion allowMultipleExpanded className="accordion-default"
                preExpanded={['a', 'b']}>
                {/* Single Item  */}
                <AccordionItem uuid="a">
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      ABC inc (3)
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <div className="row">

                      <div className="col-md-6">
                        <div className="card border">
                          <div className="media p-3">
                            <div className="icon mr-2">
                              <i className="mdi mdi-account-multiple text-dark"></i>
                            </div>
                            <div className="media-body">
                              <h5 className="mt-0 text-dark">ABC inc - Accountant</h5>
                              <p className="mb-1">#781 - In Progress - <i className="mdi mdi-account-multiple"></i> 13 </p>
                              <p className="mb-1">Ian Remington</p>
                              <time>Today 11:53</time>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="card border">
                          <div className="media p-3">
                            <div className="icon mr-2">
                              <i className="mdi mdi-account-multiple"></i>
                            </div>
                            <div className="media-body">
                              <h5 className="mt-0 text-dark">ABC inc - Sales Associate</h5>
                              <p className="mb-1">#781 - In Progress - <i className="mdi mdi-account-multiple"></i> 13 </p>
                              <p className="mb-1">Ian Remington</p>
                              <time>Today 11:53</time>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="card border">
                          <div className="media p-3">
                            <div className="icon mr-2">
                              <i className="mdi mdi-account-multiple"></i>
                            </div>
                            <div className="media-body">
                              <h5 className="mt-0 text-dark">ABC inc - Accountant</h5>
                              <p className="mb-1">#781 - In Progress - <i className="mdi mdi-account-multiple"></i> 13 </p>
                              <p className="mb-1">Ian Remington</p>
                              <time>Today 11:53</time>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </AccordionItemPanel>
                </AccordionItem>
                {/* Single Item  */}
                <AccordionItem uuid="b">
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      Closet Company (3)
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <div className="row">

                      <div className="col-md-6">
                        <div className="card border">
                          <div className="media p-3">
                            <div className="icon mr-2">
                              <i className="mdi mdi-account-multiple"></i>
                            </div>
                            <div className="media-body">
                              <h5 className="mt-0 text-dark">Closet Company - Accountant</h5>
                              <p className="mb-1">#781 - In Progress - <i className="mdi mdi-account-multiple"></i> 13 </p>
                              <p className="mb-1">Ian Remington</p>
                              <time>Today 11:53</time>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="card border">
                          <div className="media p-3">
                            <div className="icon mr-2">
                              <i className="mdi mdi-account-multiple"></i>
                            </div>
                            <div className="media-body">
                              <h5 className="mt-0 text-dark">ABC inc - Sales Associate</h5>
                              <p className="mb-1">#781 - In Progress - <i className="mdi mdi-account-multiple"></i> 13 </p>
                              <p className="mb-1">Ian Remington</p>
                              <time>Today 11:53</time>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="card border">
                          <div className="media p-3">
                            <div className="icon mr-2">
                              <i className="mdi mdi-account-multiple"></i>
                            </div>
                            <div className="media-body">
                              <h5 className="mt-0 text-dark">ABC inc - Accountant</h5>
                              <p className="mb-1">#781 - In Progress - <i className="mdi mdi-account-multiple"></i> 13 </p>
                              <p className="mb-1">Ian Remington</p>
                              <time>Today 11:53</time>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </AccordionItemPanel>
                </AccordionItem>

              </Accordion>
            </div>

            {/***** Status  *****/}
            <div className={classnames('show-status', { 'active': this.state.groupBy === 'status' })}>
              <Accordion allowMultipleExpanded className="accordion-default"
                preExpanded={['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k']}>
                {/* Single Item  */}
                <AccordionItem uuid="a">
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      New(5)
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <div className="row">
                      {/* card */}
                      <div className="col-xl-2 col-md-4">
                        <div className="card card-default bg-primary mb-3 d-flex justify-content-between flex-column mb-2 text-white">
                          <p className="mb-0">Md. Aliul Islam</p>
                          <span className="text-right">2min ago</span>
                        </div>
                      </div>

                      {/* card */}
                      <div className="col-xl-2 col-md-4">
                        <div className="card card-default bg-primary mb-3 d-flex justify-content-between flex-column mb-2 text-white">
                          <p className="mb-0">Ruble Ahmed</p>
                          <span className="text-right">2min ago</span>
                        </div>
                      </div>

                      {/* card */}
                      <div className="col-xl-2 col-md-4">
                        <div className="card card-default bg-primary mb-3 d-flex justify-content-between flex-column mb-2 text-white">
                          <p className="mb-0">Ujwala</p>
                          <span className="text-right">2min ago</span>
                        </div>
                      </div>

                      {/* card */}
                      <div className="col-xl-2 col-md-4">
                        <div className="card card-default bg-primary mb-3 d-flex justify-content-between flex-column mb-2 text-white">
                          <p className="mb-0">Asif Yasin</p>
                          <span className="text-right">2min ago</span>
                        </div>
                      </div>

                      {/* card */}
                      <div className="col-xl-2 col-md-4">
                        <div className="card card-default bg-primary mb-3 d-flex justify-content-between flex-column mb-2 text-white">
                          <p className="mb-0">Furqan Saeed</p>
                          <span className="text-right">2min ago</span>
                        </div>
                      </div>

                    </div>
                  </AccordionItemPanel>
                </AccordionItem>
                {/* Single Item  */}
                <AccordionItem uuid="b">
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      Awaiting Response(4)
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <div className="row">
                      {/* card */}
                      <div className="col-xl-2 col-md-4">
                        <div className="card card-default bg-dark mb-3 d-flex justify-content-between flex-column mb-2 text-white">
                          <p className="mb-0">Md. Aliul Islam</p>
                          <span className="text-right">2min ago</span>
                        </div>
                      </div>

                      {/* card */}
                      <div className="col-xl-2 col-md-4">
                        <div className="card card-default bg-dark mb-3 d-flex justify-content-between flex-column mb-2 text-white">
                          <p className="mb-0">Ruble Ahmed</p>
                          <span className="text-right">2min ago</span>
                        </div>
                      </div>

                      {/* card */}
                      <div className="col-xl-2 col-md-4">
                        <div className="card card-default bg-dark mb-3 d-flex justify-content-between flex-column mb-2 text-white">
                          <p className="mb-0">Ujwala</p>
                          <span className="text-right">2min ago</span>
                        </div>
                      </div>

                      {/* card */}
                      <div className="col-xl-2 col-md-4">
                        <div className="card card-default bg-dark mb-3 d-flex justify-content-between flex-column mb-2 text-white">
                          <p className="mb-0">Asif Yasin</p>
                          <span className="text-right">2min ago</span>
                        </div>
                      </div>

                      {/* card */}
                      <div className="col-xl-2 col-md-4">
                        <div className="card card-default bg-dark mb-3 d-flex justify-content-between flex-column mb-2 text-white">
                          <p className="mb-0">Furqan Saeed</p>
                          <span className="text-right">2min ago</span>
                        </div>
                      </div>

                    </div>
                  </AccordionItemPanel>
                </AccordionItem>

                {/* Single Item  */}
                <AccordionItem uuid="c">
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      Screening(0)
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <p>There is no information.</p>
                  </AccordionItemPanel>
                </AccordionItem>

                {/* Single Item  */}
                <AccordionItem uuid="d">
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      Interviewing(0)
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <p>There is no information.</p>
                  </AccordionItemPanel>
                </AccordionItem>

                {/* Single Item  */}
                <AccordionItem uuid="e">
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      Submited Client(0)
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <p>There is no information.</p>
                  </AccordionItemPanel>
                </AccordionItem>

                {/* Single Item  */}
                <AccordionItem uuid="f">
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      Offer(0)
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <p>There is no information.</p>
                  </AccordionItemPanel>
                </AccordionItem>

                {/* Single Item  */}
                <AccordionItem uuid="g">
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      Placed(0)
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <p>There is no information.</p>
                  </AccordionItemPanel>
                </AccordionItem>

                {/* Single Item  */}
                <AccordionItem uuid="h">
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      Pass(0)
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <p>There is no information.</p>
                  </AccordionItemPanel>
                </AccordionItem>

                {/* Single Item  */}
                <AccordionItem uuid="i">
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      Pass - client Rejected(0)
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <p>There is no information.</p>
                  </AccordionItemPanel>
                </AccordionItem>

                {/* Single Item  */}
                <AccordionItem uuid="j">
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      Pass - Candidate Uninterested(0)
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <p>There is no information.</p>
                  </AccordionItemPanel>
                </AccordionItem>

                {/* Single Item  */}
                <AccordionItem uuid="k">
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      Candidate Care (Mailer)(0)
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <p>There is no information.</p>
                  </AccordionItemPanel>
                </AccordionItem>

              </Accordion>
            </div>
          </div>

          {/*****  Righ Sidebar  *****/}
          <div className="col-lg-4">
            <TabsIcon />
          </div>
        </div>





      </div>
    )
  }
}

export default Home;
