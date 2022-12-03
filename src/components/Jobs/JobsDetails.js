import React, { Component } from 'react';
//import { connect } from 'react-redux';
import classname from 'classnames';
//import { Input } from 'reactstrap'

import 'react-perfect-scrollbar/dist/css/styles.css';
//import { opportuniesVisible, opportuniesInvisible } from '../../actions/job-action';



class JobDetails extends Component {
  constructor(props) {
    super(props)

    this.state = {
      opportunityIn: false,
      isOpen: false,
    }

  }



  render() {
    const { data, detailsIn, toggle } = this.props;

    return (
      <div className={classname("opportunity-wrapper", { active: detailsIn })}>

        <div className="opportunity-header">
          <span className="close" onClick={() => toggle(null)}>
            <i className="mdi mdi-close"></i>
          </span>

          {/* <div className="row pt-3 pb-5">
            <div className="col-md-6">
              <h2 className="text-dark">Job Opening Deatils</h2>
            </div>

            <div className="col-md-6">
              <ul className="list-unstyled d-flex justify-content-end mb-0 align-items-center">
                <li className=" "><a className="text-danger border-right pr-3">Not Published</a></li>
                <li>
                  <Input type="select" className="py-0 border-0">
                    <option>Open</option>
                    <option>Close</option>
                  </Input>
                </li>
              </ul>
            </div>
          </div> */}

        </div>


        <div className="opportunity-body text-dark">
          {
            data &&
            <div className="mb-5">
              <h2 className="mt-3 text-primary">{data.title}</h2>
              <h5 >{data.workLocation}</h5>
            </div>
          }

          <div className="row">
            <div className="col-xl-6">

              {/* About This job  */}
              <h4 className='mb-3'>About This Job</h4>

              <table className="table table-borderless">
                <thead></thead>
                <tbody>
                  <tr>
                    <td>Client Req Num</td>
                    <td>{data && data.clientReqNum}</td>
                  </tr>

                  <tr>
                    <td>Job Type</td>
                    <td>{data && data.hiringType}</td>
                  </tr>

                  <tr>
                    <td>Contract Wage</td>
                    <td>
                      {data && data.contractWage ?
                        `$${data.contractWage.minimum} - $${data.contractWage.maximum}/hr` : null}
                    </td>
                  </tr>

                  <tr>
                    <td>Full Time Wage</td>
                    <td>
                      {data && data.fullTimeWage ?
                        `$${data.fullTimeWage.minimum} - $${data.fullTimeWage.maximum}` : null
                      }
                    </td>
                  </tr>

                  <tr>
                    <td>Priority</td>
                    <td>
                      {data && data.priority}
                    </td>
                  </tr>

                  <tr>
                    <td>Expiration Date</td>
                    <td>
                      {data && data.expirationDate}
                    </td>
                  </tr>

                  <tr>
                    <td>Keywords</td>
                    <td>
                      {data && data.keywords ? data.keywords.map(e => {
                        return <span className="px-2 py-1 rounded-pill bg-info text-white mr-1 mb-1" key={e}>{e}</span>

                      }) : null}
                    </td>
                  </tr>

                  <tr>
                    <td>Referral Compensation Amount</td>
                    <td>
                      {data && data.referralCompensationAmount}
                    </td>
                  </tr>

                  <tr>
                    <td>Remote Work</td>
                    <td>
                      {data && data.remoteWorkPercent} %
                    </td>
                  </tr>

                  <tr>
                    <td>Status</td>
                    <td>
                      {data && data.status}
                    </td>
                  </tr>

                  <tr>
                    <td>Work Authorizations</td>
                    <td>
                      {data && data.workAuthorizations ? data.workAuthorizations.map(e => {
                        return <span className="px-2 py-1 rounded-pill bg-info text-white mr-1 mb-1" key={e}>{e}</span>

                      }) : null}
                    </td>
                  </tr>


                </tbody>
              </table>

              {/* <p className="mb-2 text-info">client Req Num:
                <span className="text-dark">{data && data.clientReqNum}</span>
              </p> */}

              {/* <p className="mb-2 text-info">Job Type:
                <span className="text-dark">{data && data.hiringType}</span>
              </p> */}

              {/* <p className="mb-2 text-info">Contract Wage:
                <span className="text-dark">
                  {data && data.contractWage ?
                    `$${data.contractWage.minimum} - $${data.contractWage.maximum}/hr` : ''
                  }
                </span>
              </p> */}

              {/* <p className="mb-2 text-info">Full Time Wage:
                <span className="text-dark">
                  {data && data.fullTimeWage ?
                    `$${data.fullTimeWage.minimum} - $${data.fullTimeWage.maximum}` : ''
                  }
                </span>
              </p> */}

              {/* <p className="mb-2 text-info">Priority:
                <span className="text-dark">
                  {data && data.priority}
                </span>
              </p> */}

              {/* <p className="mb-2 text-info">Last Date:
                <span className="text-dark">
                  {data && data.expirationDate}
                </span>
              </p> */}

              {/* <p className="mb-2 text-info">Keywords:

                {data && data.keywords ? data.keywords.map(e => {
                  return <span className="px-2 py-1 rounded-pill bg-info text-white mr-1 mb-1" key={e}>{e}</span>

                }) : null}

              </p> */}

              {/* <p className="mb-2 text-info">Referral Compensation:
                <span className="text-dark">
                  {data && data.referralCompensationAmount}
                </span>
              </p> */}

              {/* <p className="mb-2 text-info">Remote Work:
                <span className="text-dark">
                  {data && data.remoteWorkPercent} %
                </span>
              </p> */}

              {/* <p className="mb-2 text-info">Status:
                <span className="text-dark">
                  {data && data.status}
                </span>
              </p> */}

              {/* <p className="mb-2 text-info">Work Authorizations:

                {data && data.workAuthorizations ? data.workAuthorizations.map(e => {
                  return <span className="px-2 py-1 rounded-pill bg-info text-white mr-1 mb-1" key={e}>{e}</span>

                }) : null}

              </p> */}

            </div>

            {/* About Client  */}
            <div className="col-xl-6">
              <h4 className='mb-3'>About Client</h4>
              <p>{data && data.client && data.client.name}</p>
            </div>
          </div>

          <h4 className='my-3'>Job Details</h4>
          <div dangerouslySetInnerHTML={{ __html: data && data.details }}></div>

        </div>

      </div>
    )
  }
}

export default JobDetails;
