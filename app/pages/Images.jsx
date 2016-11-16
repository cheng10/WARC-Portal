import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Gallery from 'react-photo-gallery';
import {ProgressBar, List, Pagination, ListGroup} from 'react-bootstrap';

import Lightbox from 'react-images';
import DocumentList from '../components/DocumentList.jsx';

const IMAGE='https://images.unsplash.com/photo-1418985991508-e47386d96a71?dpr=1&auto=format&fit=crop&w=1500&h=1000&q=80&cs=tinysrgb&crop=';
const IMAGE2='http://i.imgur.com/znpXhls.jpg'
const PHOTO_SET = [
  {
    src: IMAGE,
    width: 300,
    height: 300,
    aspectRatio: 1,
  },
  {
    src: IMAGE2,
    width: 300,
    height: 300,
    aspectRatio: 1,
  },  
  {
    src: IMAGE,
    width: 300,
    height: 300,
    aspectRatio: 1,
  },  {
    src: IMAGE,
    width: 300,
    height: 300,
    aspectRatio: 1,
  },
  {
    src: IMAGE2,
    width: 300,
    height: 300,
    aspectRatio: 1,
  },  
  {
    src: IMAGE,
    width: 300,
    height: 300,
    aspectRatio: 1,
  },
];

export class Images extends React.Component {
    /**
     * Constructor for app component. Initializes state and bind eventlisteners.
     * Fetches image list on construction
     * @param {object} props passed down from parent
     */
    constructor(props) {
        super(props);
        console.log("inside images", props);
        props.dispatch({type: 'imgFetchList', query: this.props.page});

        this.changePage = this.changePage.bind(this);
        this.onChange = this.onChange.bind(this);    
    }

    /**
     * Life cycle method of React that is called before receiving new props
     * 
     * @param {object} newprops passed down from parent to check if page needs to retrieve new data 
     */
    componentWillUpdate(newprops) {
        console.log("willupdate", this.props, newprops.queryParams.queryParams);
        console.log(_.isEqual(newprops.queryParams, this.props.queryParams));
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
        console.log("fetched images", this.props.images);
        if (this.props.images.length === 0) {
            return [{
                src: "",
                width: 300,
                height: 300,
                aspectRatio: 1,
            }];
        }
        return this.props.images.map(({crawl, detail, file, link, name, url}) => {
            return {
                src: link,
                width: 200,
                height: 200,
                aspectRatio: 1
            }
        });
    }

    /**
     * eventhandler to change the user lists' current page
     * @param {number} page number changing to
     */
    changePage(page) {
        console.log("changing page");
        const search = this.props.queryParams.search;
        console.log(search);
        let url = search ? `/images/?search=${search}&page=${page}`: `/images/?page=${page}`;
        this.props.dispatch(push(url));
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
        console.log("image rerender")
        const per_page = 9;
        const pages = Math.ceil(this.props.count / per_page);
        let start_count = 0;
        return (
            <div className="page-home">
                <div className="page-main">
                    <div className="gallery-list-view">
                        <Gallery disableLightbox={true} photos={this.createSet()} />
                        <Pagination className="users-pagination pull-right" bsSize="medium" maxButtons={10} first last next prev
                            boundaryLinks items={pages} activePage={this.props.page} onSelect={this.changePage}/>
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * Mapping props from state received from store
 */
function mapStateToProps(state) {
    console.log("Image state", state);
    return {
        loading: state.docs.loading,
        page: Number(state.routing.locationBeforeTransitions.query.page) || 1,
        images: state.docs.images || [],
        count: state.docs.img_count || 0,
        queryParams: state.routing.locationBeforeTransitions.query || ''
    };
}
export default connect(mapStateToProps)(Images);
