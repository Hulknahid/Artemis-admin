import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';

const ContactTab = (props) => {
  const [activeTab, setActiveTab] = useState('note');

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }

  return (
    <div>
      <Nav className="tab-profile">
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === 'note' })}
            onClick={() => { toggle('note'); }}
          >
            <i class="fa fa-sticky-note-o text-warning" aria-hidden="true"></i>
            Note
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === 'task' })}
            onClick={() => { toggle('task'); }}
          >
            <i class="fa fa-calendar-check-o text-danger" aria-hidden="true"></i>
            Task
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === 'email' })}
            onClick={() => { toggle('email'); }}
          >
            <i class="fa fa-envelope-o text-success" aria-hidden="true"></i>
            Email
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === 'phone' })}
            onClick={() => { toggle('phone'); }}
          >
            <i class="fa fa-phone text-info" aria-hidden="true"></i>
            Phone
          </NavLink>
        </NavItem>


      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="note">
          <input type="text" className="form-control" placeholder="Add notes" />
        </TabPane>
        <TabPane tabId="task">
          <input type="text" className="form-control" placeholder="Add Task" />
        </TabPane>
        <TabPane tabId="email">
          <input type="text" className="form-control" placeholder="Add Email" />
        </TabPane>
        <TabPane tabId="phone">
          <input type="text" className="form-control" placeholder="Add Phone" />
        </TabPane>
      </TabContent>
    </div>
  );
}

export default ContactTab;
