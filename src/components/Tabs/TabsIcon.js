import React, { Component } from 'react';
import classname from 'classnames';
import { HorizontalBar, Chart, Bar } from 'react-chartjs-2';
import MyCalendar from '../Calender/Calender';


class TabsIcon extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isActive: 'calendar'
    }
    this.onClick = this.onClick.bind(this)
  }

  componentWillMount() {

  }

  componentDidMount() {

    Chart.pluginService.register({
      afterDraw: function (chart, easing) {

      }
    });
    // const Chart = '';

    // console.log(Chart)



  }

  onClick(e, data) {
    e.preventDefault();

    this.setState({
      isActive: data
    })
  }

  render() {
    return (
      <div className="tab-icon-wrapper">
        <div className="row top-navs">
          <div className="col-4">
            {/* Summery  */}
            <div className={classname("card card-default bg-green-opcity text-center p-4",
              { active: this.state.isActive === 'summery' })}
              onClick={(e) => this.onClick(e, 'summery')}>

              <div className="icon icon-md">
                <i className="mdi mdi-chart-pie"></i>
              </div>
              <span className="text-small d-none d-xl-block">Summary</span>
            </div>
          </div>
          <div className="col-4">
            {/* Calendar  */}
            <div className={classname("card card-default bg-teal-opcity text-center p-4",
              { active: this.state.isActive === 'calendar' })}
              onClick={(e) => this.onClick(e, 'calendar')}>

              <div className="icon icon-md">
                <i className="mdi mdi-calendar-month-outline"></i>
              </div>
              <span className="text-small d-none d-xl-block">Calendar</span>
            </div>
          </div>
          {/* Activity */}
          <div className="col-4">
            <div className={classname("card card-default bg-orange-deep-opcity text-center p-4",
              { active: this.state.isActive === 'activity' })}
              onClick={(e) => this.onClick(e, 'activity')}>
              <div className="icon icon-md">
                <i className="mdi mdi-file-check-outline"></i>
              </div>
              <span className="text-small d-none d-xl-block">Activity</span>
            </div>
          </div>
        </div>

        {/* Tab Content  */}
        <div className="tab-content">
          <div className={classname("card card-default p-0", { active: this.state.isActive === 'summery' })}>
            <div className="card-body px-0">
              <div className="single-item px-4" >
                <p className="text-dark font-size-16">Expected Value Per Stage</p>
                <HorizontalBar
                  height={80}
                  data={{
                    labels: ['New Leads', 'In Progress', 'Closing'],
                    datasets: [{
                      barThickness: 10,
                      data: [7.2, 13.3, 18.9],
                      backgroundColor: [
                        '#50acbb',
                        '#cd782c',
                        '#90a000',
                      ]
                    }]
                  }}
                  options={{



                    legend: false,


                    //   scales: {
                    //     yAxes: [{
                    //         ticks: {
                    //             // Include a dollar sign in the ticks
                    //             callback: function(value, index, values) {
                    //                 return '$' + value;
                    //             }
                    //         }
                    //     }]
                    // },


                    scales: {
                      xAxes: [{
                        // stacked: false
                      }],
                      yAxes: [{
                        stacked: true,
                        ticks: {
                          fontFamily: "'Muli', sans-serif"
                        }
                      }]
                    },
                  }}
                />
              </div>

              <hr />

              <div className="single-item px-4">
                <div className="d-flex justify-content-between text-center">
                  <div>
                    <h6 className="text-dark">total expected value</h6>
                    <span className="text-green" style={{ fontSize: '16px' }}>$40K</span>
                  </div>
                  <div>
                    <h6 className="text-dark">total potential value</h6>
                    <span className="text-orange-deep " style={{ fontSize: '16px' }}>$86K</span>
                  </div>
                </div>
              </div>

              <hr />

              <div className="single-item px-4">
                <p className="text-dark font-size-16">Average Time In Stage</p>
                <HorizontalBar
                  height={80}
                  data={{
                    labels: ['New Leads', 'In Progress', 'Closing'],
                    datasets: [{
                      barThickness: 10,
                      data: [7.2, 13.3, 18.9],
                      backgroundColor: [
                        '#50acbb',
                        '#cd782c',
                        '#90a000',
                      ]
                    }]
                  }}
                  options={{

                    legend: false,
                    scales: {
                      xAxes: [{
                        stacked: true
                      }],
                      yAxes: [{
                        stacked: true
                      }]
                    },

                  }
                  }
                />
              </div>

              <hr />

              <div className="single-item px-4">
                <p className="text-dark font-size-16">Value Won Over Time</p>
                <Bar
                  height={80}
                  data={{
                    labels: ['New Leads', 'In Progress', 'Closing'],
                    datasets: [{
                      barThickness: 10,
                      data: [7.2, 13.3, 18.9],
                      backgroundColor: [
                        '#50acbb',
                        '#cd782c',
                        '#90a000',
                      ]
                    }]
                  }}
                  options={{

                    legend: false,
                    scales: {
                      xAxes: [{
                        stacked: true
                      }],
                      yAxes: [{
                        stacked: true
                      }]
                    },

                  }
                  }
                />
              </div>

            </div>
          </div>
          <div className={classname("card card-default px-0", { active: this.state.isActive === 'calendar' })}>
            <div className="card-body px-0">
              <div className="px-4">

                <MyCalendar />
                {/* Calendar task details  */}
                <p className="text-dark mb-3 mt-5 font-size-16">Calendar Task Details</p>
                <div className="row">
                  {/* Single details  */}
                  <div className="col-12 col-xl-6">
                    <div className="bg-teal border-rounded p-2 mb-3">
                      <span className="font-weight-bold px-2 text-white border-right date">02</span>
                      <span className="font-weight-bold px-2 text-white user">Davis, Larry</span>
                    </div>
                  </div>
                  {/* Single details  */}
                  <div className="col-12 col-xl-6">
                    <div className="bg-warning border-rounded p-2 mb-3">
                      <span className="font-weight-bold px-2 text-white border-right date">02</span>
                      <span className="font-weight-bold px-2 text-white user">Davis, Larry</span>
                    </div>
                  </div>
                  {/* Single details  */}
                  <div className="col-12 col-xl-6">
                    <div className="bg-warning border-rounded p-2 mb-3">
                      <span className="font-weight-bold px-2 text-white border-right date">02</span>
                      <span className="font-weight-bold px-2 text-white user">Davis, Larry</span>
                    </div>
                  </div>
                  {/* Single details  */}
                  <div className="col-12 col-xl-6">
                    <div className="bg-teal border-rounded p-2 mb-3">
                      <span className="font-weight-bold px-2 text-white border-right date">02</span>
                      <span className="font-weight-bold px-2 text-white user">Davis, Larry</span>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
          <div className={classname("card card-default", { active: this.state.isActive === 'activity' })} >
            <div className="card-body">
              <h5>Activies</h5>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default TabsIcon;
