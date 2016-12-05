import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import Select from 'react-select';
import rd3 from 'rd3';
import {ProgressBar} from 'react-bootstrap';
import d3 from 'd3';
import WordCloud from 'react-d3-cloud';

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
            scores: null
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
        console.log("value", value);
        this.props.dispatch({type: 'tfidfFetch', id: value});
        this.setState({category: value ? value.value : null});
    }

    /**
     * Select document handler
     *
     * @param {object} the item clicked on from the dropdown
     */
    handleDocumentSelect(value) {
        console.log("value", value);
        this.setState({
            document: value ? value.value : null,
            scores: value ? value.scores:null
        });
    }

    /**
     * Creates list of collections
     *
     */
    createCollectionList() {
        let options = [];
        if (this.props.collections.length !== undefined) {
            this.props.collections.map(({name, id}, i) => {
                options.push({
                    value: id,
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
        if (this.props.tfidf.score_kv) {
            const scores = JSON.parse(this.props.tfidf["score_kv"]);
            console.log(JSON.parse(this.props.tfidf["score_kv"]));
            let options = [];
            _.keys(scores).forEach((value) => {
                options.push({value: value, label: value, scores: scores[value]});
            });

            return options;
        } else {
            return null;
        }
    }

    /**
     * Creates a cloud of the score
     *
     */
    renderGraph() {
        if (this.state.scores) {
            const data = _.reduce(this.state.scores, (result=[], value, key) => {
                result.push({text: key, value: value});
                return result;
            }, [])

            const fontSizeMapper = word => word.value * 1000;
            const rotate = word => word.value;
            console.log(data);
            if (document.getElementsByTagName('svg')[0]) {
                document.getElementsByTagName('svg')[0].remove();
            }
            return (          
                <div className="score-graph">
                    <WordCloud
                        data={data}
                        fontSizeMapper={fontSizeMapper}
                        rotate={rotate}
                    />,
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
    console.log("wordcloud", state);
    return {
        collections: state.collections || [],
        tfidf: state.tfidf || []
    };
}

export default connect(mapStateToProps)(Visualizations);
