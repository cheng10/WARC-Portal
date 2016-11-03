import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Gallery from 'react-photo-gallery';

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
   * @param {number} param this is param.
   * @return {number} this is return.
   */
    constructor(props) {
        super(props);
        console.log("images", props)
        props.dispatch({type: 'imgFetchList'});
    }

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

    render() {
        console.log("set", this.createSet());
        return (
            <div className="page-home">
                <div className="page-main">
                    <div className="gallery-list-view">
                        <Gallery disableLightbox={true} photos={PHOTO_SET} />
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log("Image state", state);
    return {
        documents: state.docs.documents || [],
        loading: state.docs.loading,
        images: state.docs.images || []
    };
}
export default connect(mapStateToProps)(Images);
