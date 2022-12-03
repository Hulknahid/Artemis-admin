import React, { Component } from 'react';
import { WithContext as ReactTags } from "react-tag-input";
const KeyCodes = {
    comma: 188,
    enter: 13
};
const delimiters = [KeyCodes.comma, KeyCodes.enter];
class Tags extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: []
        }
    }

    handleTagAdd = (tag) => {
        let { tags } = this.state;
        this.setState({ tags: [...tags, { id: tags.length + 1, text: tag }] }, () => {
            this.props.getTags(this.state.tags)
        });
    }


    handleTagDelete = (i) => {
        const { tags } = this.state;

        this.setState({
            tags: tags.filter((tag, index) => index !== i)
        }, () => {
            this.props.getTags(this.state.tags)
        })


    }

    clearState = () => {
        this.setState({ tags: [] })
    }
    setStates = (tags) => {
        this.setState({ tags })
    }


    render() {
        let { tags } = this.state
        return (
            <ReactTags
                ref={this.props.ref}
                tags={tags}
                delimiters={delimiters}
                handleDelete={this.handleTagDelete}
                handleAddition={this.handleTagAdd}
                // handleDrag={handleDrag}
                // handleTagClick={this.handleTagClick}
                inputFieldPosition="left"
                autocomplete
                placeholder={this.props.placeholder}
            />
        );
    }
}

export default Tags;
