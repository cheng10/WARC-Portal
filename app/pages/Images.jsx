import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Gallery from 'react-grid-gallery';
import {ProgressBar, List, Pagination, ListGroup} from 'react-bootstrap';

import URLBuilder from '../helpers/URLBuilder.js';
import DocumentList from '../components/DocumentList.jsx';

export class Images extends React.Component {
    /**
     * Constructor for app component. Initializes state and bind eventlisteners.
     * Fetches image list on construction
     * @param {object} props passed down from parent
     */
    constructor(props) {
        super(props);
        this.props.dispatch({type: 'imgFetchList', query: props.queryParams});

        this.changePage = this.changePage.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    /**
     * Life cycle method of React that is called before receiving new props
     *
     * @param {object} newprops passed down from parent to check if page needs to retrieve new data
     */
    componentWillUpdate(newprops) {
        if (!_.isEqual(newprops.queryParams, this.props.queryParams)) {
            this.onChange();
            this.props.dispatch({type: 'imgFetchList', query: newprops.queryParams});
        }
    }
    /**
     * Creates set of images to be read by gallery
     * @returns {object} image object containing link, dimensions, ratio
     */
    createSet() {
        if (this.props.images.length === 0) {
            return [];
        }

        return this.props.images.map(({crawl, detail, file, link, name, url}) => {
            let tags = []
            if (detail) {
                tags = detail.split(",").reduce((result, item) => {
                    if (item === " ") {
                        // do nothing
                    } else {
                        let rObj = {}
                        rObj["value"] = item;
                        rObj["title"] = item;
                        result.push(rObj);
                    }
                    return result;
                }, [])
            }
            return {
                src: link,
                thumbnail: link,
                caption: link,
                thumbnailWidth: 300,
                thumbnailHeight: 300,
                tags: tags
            }
        });
    }

    /**
     * eventhandler to change the user lists' current page
     * @param {number} page number changing to
     */
    changePage(page) {
        let newquery = {page: page};
        let url = _.merge({}, this.props.queryParams, newquery);
        this.props.dispatch(push(this.props.path.pathname + URLBuilder(url)));
        this.onChange();
    }

    onChange() {
        this.props.dispatch({type: 'docs.onLoad'});
    }

    /**
     * render method rendering Images
     *
     */
    render() {
        const per_page = 20;
        const pages = Math.ceil(this.props.count / per_page);
        let start_count = 0;
        if (this.props.loading) {
            return (
                <ProgressBar active now={100}/>
            );
        }
        return (
            <div className="image-main">
                <div className="gallery-list-view">
                    <h2> Gallery </h2>
                    <Gallery 
                        images={this.createSet()} 
                        enableImageSelection={false}
                    />
                </div>
                <div className="image-paginator">
                    <Pagination 
                        className="users-pagination pull-right" 
                        bsSize="medium" 
                        maxButtons={10} first last next prev
                        boundaryLinks items={pages} 
                        activePage={this.props.page} 
                        onSelect={this.changePage}
                    />
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
        loading: state.docs.loading,
        page: Number(state.routing.locationBeforeTransitions.query.page) || 1,
        images: state.docs.images || [],
        count: state.docs.img_count || 0,
        queryParams: state.routing.locationBeforeTransitions.query || '',
        path: state.routing.locationBeforeTransitions || ''
    };
}
export default connect(mapStateToProps)(Images);
