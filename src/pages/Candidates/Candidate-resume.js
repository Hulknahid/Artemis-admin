import React, { Component } from 'react'
import { connect } from 'react-redux';
import { resumeOut } from '../../actions/candidate-action';
import classnames from 'classnames';
import FileViewer from 'react-file-viewer';


class CandidateResume extends Component {

    handleClose = () => {
        this.props.resumeOut()
    }

    onError = e => {
        console.log(e, "error in file-viewer");
    }


    render() {

        const { singleCandidate, resumeIn, resumeClose } = this.props;

        //console.log(singleCandidate.resume && singleCandidate.resume.url);

        let fileType = '';
        let url = '';

        if (singleCandidate.resume && singleCandidate.resume.url) {
            url = singleCandidate.resume.url
            fileType = url.split('.').pop();
        }

        return (
            <div className={classnames("resume-wrapper", { active: resumeIn })}>
                <span className="close" onClick={resumeClose}>
                    <i className="mdi mdi-close"></i>
                </span>
                {
                    singleCandidate && singleCandidate.resume &&
                    <FileViewer
                        fileType={fileType}
                        filePath={url}
                        onError={this.onError}
                    />
                }

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        resume: state.candidates.resumeIn
    }
}

export default connect(mapStateToProps, { resumeOut })(CandidateResume)
