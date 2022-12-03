import React, { Component } from 'react';
import classnames from 'classnames'


export default class Search extends Component {

    render() {
        const { results, loading, handleSelectedValue, value, onChange, close, dropdown, placeholder } = this.props;

        return <div className="search-wrapper">
            <input name="searchinput" type="text" className='form-control'
                onChange={onChange}
                value={value}
                autoComplete="off"
                placeholder={placeholder}
            />
            <span className='close' onClick={close}>
                <i className='mdi mdi-close'></i>
            </span>
            {/* <div className='selected-valuewraaper' onFocus={this.handleFocus} onBlur={this.handleBlur} onClick={this.handleClick}>
                {value}
            </div> */}

            <ul className={classnames("search-result", { active: dropdown })}>
                {
                    loading ? <li>searching.....</li> :
                        results.length > 0 ? results.map((e, key) => <li key={key} onClick={() => handleSelectedValue(e)} style={{ textTransform: 'capitalize' }}> {e.name}</li>) : <li>Don't Match please search again!!!</li>
                }
            </ul>

        </div>;
    }
}
