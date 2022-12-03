import React from 'react';
import Autosuggest from 'react-autosuggest';

const languages = [
  {
    title: 'Companies',
    languages: [
      {
        id: 1,
        name: 'C#',
        year: 'I am dipu '
      },
      {
        id: 2,
        name: 'Scala',
        year: 'I am rubi'
      },
      {
        id: 3,
        name: 'Clojure',
        year: 'I am rubi'
      },
      {
        id: 4,
        name: 'Go',
        year: 'I am rubi'
      }
    ]
  },
  {
    title: 'Contacts',
    languages: [
      {
        id: 1,
        name: 'C++',
        year: 'I am rubi'
      },
      {
        id: 2,
        name: 'Perl',
        year: 'I am rubi'
      }
    ]
  }

];

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');

  return languages
    .map(section => {
      return {
        title: section.title,
        languages: section.languages.filter(language => regex.test(language.name))
      };
    })
    .filter(section => section.languages.length > 0);
}

function getSuggestionValue(suggestion) {
  console.log(suggestion)
  return suggestion.name
}

function renderSuggestion(suggestion) {
  console.log(suggestion.name)
  return (
    <span className="dfdf" > { suggestion.name}</span >
  );
}

function renderSectionTitle(section) {
  return (
    <strong>{section.title}</strong>
  );
}

function getSectionSuggestions(section) {
  return section.languages;
}

class HeaderSearch extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: []
    };
  }

  onChange = (event, { newValue, method }) => {
    console.log(newValue)
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Search......",
      value,
      onChange: this.onChange
    };

    return (
      <Autosuggest
        multiSection={true}
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        renderSectionTitle={renderSectionTitle}
        getSectionSuggestions={getSectionSuggestions}
        inputProps={inputProps} />
    );
  }
}


export default HeaderSearch;