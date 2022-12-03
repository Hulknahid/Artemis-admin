import React, { Component } from 'react';
import { connect } from 'react-redux';
import Autosuggest from 'react-autosuggest';
// import languages from '../../pages/Contacts/data-contacts';
import languages from '../../pages/Candidates/data-contacts';
import { appointmentName } from '../../actions/job-action';



class ClientSearch extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: []
    };
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
    this.props.appointmentName(newValue)
  };

  componentDidMount(nextProps) {
    console.log(this.props)
  }

  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  getSuggestionValue = suggestion => suggestion.name;

  // Teach Autosuggest how to calculate suggestions for any given input value.
  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    // console.log(this.props)

    return inputLength === 0 ? [] : languages.filter(lang =>
      lang.name.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  // Use your imagination to render suggestions.
  renderSuggestion = suggestion => (
    <div>
      {suggestion.name}
    </div>
  );

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };
  render() {
    const { value, suggestions } = this.state;

    // console.log(this.state)

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Type Client name',
      value,
      onChange: this.onChange
    };

    // Finally, render it!
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}

        getTitle={this.state.value}

      />
    );
  }
}

const mapStateToProps = state => {
  return {

  }
}

export default connect(mapStateToProps, { appointmentName })(ClientSearch);