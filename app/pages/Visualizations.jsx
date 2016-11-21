import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import Select from 'react-select';

/**
 * Content component that is rendered
 *
 * App
 * @extends {React.Component}
 */
class Visualizations extends React.Component {
    /**
     * Constructor for app component. Initializes state and bind eventlisteners.
     * @param {object} props passed down from parent
     */
    constructor(props) {
        super(props);
        this.state = {
            category: "",
            document: "",
        }
        this.props.dispatch({type: 'collectionFetchList'});

        this.handleSelect = this.handleSelect.bind(this);
        this.handleDocumentSelect = this.handleDocumentSelect.bind(this);
    }

    /**
     * click event for switching between tabs
     * @param {object} e event from clicklistener
     */
    onClick(e) {
    }

    /**
     * Select collection handler
     *
     * @param {object} the item clicked on from the dropdown
     */
    handleSelect(value) {
        console.log(value);
        this.setState({category: value.value});
        console.log(this.state);
    }

    /**
     * Select document handler
     *
     * @param {object} the item clicked on from the dropdown
     */
    handleDocumentSelect(value) {
        this.setState({document: value.value});
    }

    /**
     * Creates list of collections
     *
     */
    createCollectionList() {
        let options = [];
        console.log(this.props);
        if (this.props.collections.results) {
            this.props.collections.results.map(({name}, i) => {
                options.push({
                    value: i,
                    label: name
                });
            });
        }
        return options;
    }

    /**
     * Creates list of documents in a collection
     *
     */
    createDocumentList() {
        console.log(this.state);
        if (this.state.category) {
            return (
                <div>
                    Document
                    <Select
                        name="document-selector"
                        placeholder="Document"
                        value={this.state.category}
                        options={this.createDocumentOptions()}
                        onChange={this.handleDocumentSelect}
                    />
                </div>
            )
        } else {
            return null;
        }
    }

    /**
     * Creates document options for the select box
     *
     */
    createDocumentOptions() {
        const scores = JSON.parse(this.props.collections.results[this.state.category]["score_kv"])
        let options = [];
        _.keys(scores).forEach((value) => {
            options.push({value: value, label: value});
        });

        return options;
    }

    /**
     * Creates a graph of the score
     *
     */
    renderGraph() {
        if (this.state.document) {
            let listitems = [];
            const scores = JSON.parse(this.props.collections.results[this.state.category]["score_kv"])
            const keys = _.keys(scores[this.state.document]);
            console.log(scores);
            console.log(keys);
            return (          
                <div className="score-list">
                    <ul id="score_list">
                        {keys.map((key) => {
                            console.log(scores[key])
                            return (
                                <li key={key}> {`${key}------${scores[this.state.document][key]}`}</li>
                            )
                        })
                        }
                    </ul>
                </div>
                )
        } else {
            return null;
        }
    }

    /**
     * render method rendering Visualizations
     *
     */
    render() {
        return (
            <div className="app-content">
                Category
                <Select
                    name="category-selector"
                    placeholder="Categories"
                    value={this.state.category}
                    options={this.createCollectionList()}
                    onChange={this.handleSelect}
                />
                <br/> <br/> <br/>
                {this.createDocumentList()}
                {this.renderGraph()}
            </div>
        );
    }
}

/**
 * Mapping props from state received from store
 */
function mapStateToProps(state) {
    return {
        collections: state.collections || []
    };
}

export default connect(mapStateToProps)(Visualizations);
