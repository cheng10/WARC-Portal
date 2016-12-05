import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import Select from 'react-select';
import rd3 from 'rd3';
import {ProgressBar} from 'react-bootstrap';

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
     * Select collection handler
     *
     * @param {object} the item clicked on from the dropdown
     */
    handleSelect(value) {
        this.setState({category: value ? value.value : null});
    }

    /**
     * Select document handler
     *
     * @param {object} the item clicked on from the dropdown
     */
    handleDocumentSelect(value) {
        this.setState({document: value ? value.value : null});
    }

    /**
     * Creates list of collections
     *
     */
    createCollectionList() {
        let options = [];
        if (this.props.collections.length !== undefined) {
            this.props.collections.map(({name}, i) => {
                options.push({
                    value: i,
                    label: name
                });
            });
        }
        console.log(options);
        return options;
    }

    /**
     * Creates list of documents in a collection
     *
     */
    createDocumentList() {
        if (this.state.category || this.state.category === 0) {
            return (
                <div>
                    Document
                    <Select
                        name="document-selector"
                        placeholder="Document"
                        value={this.state.document}
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
        if (this.state.category || this.state.category === 0) {
            console.log("DUCOMUETNS")
            console.log(this.props.collections[this.state.category])
            const scores = JSON.parse(this.props.collections[this.state.category]["score_kv"])
            let options = [];
            console.log(scores);
            _.keys(scores).forEach((value) => {
                options.push({value: value, label: value});
            });

            return options;
        } else {
            return null;
        }
    }

    /**
     * Creates a graph of the score
     *
     */
    renderGraph() {
        if (this.state.document) {
            let listitems = [];
            const scores = JSON.parse(this.props.collections[this.state.category]["score_kv"])
            const keys = _.keys(scores[this.state.document]);
            const BarChart = rd3.BarChart;
            console.log(scores[this.state.document])
            const values = _.reduce(scores[this.state.document], (result=[], value, key) => {
                result.push({
                    'x': key,
                    'y': value
                })
                return result;
            }, [])

            let barData = [{
                "name": this.state.document,
                "values": values
            }];

            return (          
                <div className="score-graph">
                   	<BarChart
                        data={barData}
                        width={800}
                        height={400}
                        title="tf-idf Graph"
                        xAxisLabel="Terms"
                        yAxisLabel="tf-idf score"
                    />
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
        const docOptions = this.createDocumentOptions();
            if (this.props.collections.length == undefined) {
                return (
                    <ProgressBar active now={100}/>
                )
            } else {
                return (
                    <div className="app-content">
                        <div className="tfidf-content">
                            <div className="tfidf-selectors">
                                <div className="category-selector">
                                    Collection
                                    <Select
                                        name="category-selector"
                                        placeholder="Please select collection first"
                                        value={this.state.category}
                                        options={this.createCollectionList()}
                                        onChange={this.handleSelect}
                                    />
                                </div>
                                <div className="document-selector">
                                    Document
                                    <Select
                                        name="document-selector"
                                        placeholder="Please select document"
                                        value={this.state.document}
                                        options={this.createDocumentOptions()}
                                        onChange={this.handleDocumentSelect}
                                    />
                                </div>
                            </div>
                        <hr/>
                        {this.renderGraph()}
                    </div>
                </div>
            )
        }
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
