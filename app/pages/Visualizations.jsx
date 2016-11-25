import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import Select from 'react-select';
import rd3 from 'rd3';

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
        this.setState({category: value ? value.value : null});
        console.log(this.state);
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
        if (this.state.category) {
            const scores = JSON.parse(this.props.collections.results[this.state.category]["score_kv"])
            let options = [];
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
            const scores = JSON.parse(this.props.collections.results[this.state.category]["score_kv"])
            const keys = _.keys(scores[this.state.document]);
            const BarChart = rd3.BarChart;

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
                        xAxisLabel="Word"
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
        return (
            <div className="app-content">
                <div className="tfidf-content">
                    <div className="tfidf-selectors">
                        <div className="category-selector">
                            Collection
                            <Select
                                name="category-selector"
                                placeholder="Please select category first"
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
