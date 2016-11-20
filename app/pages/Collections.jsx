import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {ProgressBar, List, Pagination, ListGroup} from 'react-bootstrap';
import _ from 'lodash';
import {Field, reduxForm} from 'redux-form';
import URLBuilder from '../helpers/URLBuilder.js';

/**
 * Not found page component
 */
class Collections extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          warcFiles: [],
          name: ""
        }
        console.log("COLLECTIONSSS");

        // Fetching list by calling collectionfetchlist in /sagas/collections
        this.props.dispatch({type: 'collectionFetchList'});
        this.props.dispatch({type: 'filesFetchList'});
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(form) {
       console.log("SUBMITTING", form);
       _.omit(form, ["collectionName"])
       let files = [];
       _.forEach(_.omit(form, ["collectionName"]), (value, key) => {
         if (form[key] === true){
           files.push(key.replace(/-/g, "."));
         }
       })
       this.props.dispatch({type: 'collectionPost', name: form.collectionName, warcFiles: files });
     }


    render() {
        console.log(this.props.collections);
        let collectionName = "HelloWorld"
        if (this.props.collections.results) {
            collectionName = this.props.collections.results[0 ].name;
        }
        var rows = [];

        if(!this.props.collections.results || this.props.files.length === 0){
          return(
            <div>LOADING</div>
          )
        }
        else{
          console.log("HELLOIAMDOG", this.props.files)
          return(
            <div className="app-body">
              <center> <h1> Your Collections </h1> </center>
              <div className="doc-list">
                  <ul id="collections_list">
                    {this.props.collections.results.map((collection, index) => {
                        return (<h3><li color="white" key={index} id={index}>{collection.name}</li></h3> );
                    })}
                    </ul>
                </div>
              <br></br>
              <br></br>
              <hr></hr>
                <div>
                  <center><h1> Create a Collection </h1></center>
                  <form onSubmit={this.props.handleSubmit(this.handleSubmit)} id="files_list">
                    {this.props.files.map((file, index) => {
                      return( <div>
                        <label htmlFor={file.name}>{file.name}</label>
                        <Field name={file.name.replace(/\./g, "-")} component="input" type="checkbox"></Field>
                      </div> );
                    })}
                    <div>
                      <label>Collection Name:</label>
                      <Field name="collectionName" component="input" type="text"/>
                    </div>

                    <button type="submit">Add Collection</button>
                  </form>
                </div>
              </div> );
        }

    }
}
const CollectionForm = reduxForm({form: 'collection'})(Collections);
/**
 * Mapping props from state received from store. Turns state.collections in this.props.collections
 * to be used in the component
 */
function mapStateToProps(state) {
    console.log("Collections state", state);
    return {
        collections: state.collections || [],
        files: state.files || []
    };
}

// Connecting component to the store
export default connect(mapStateToProps)(CollectionForm);
