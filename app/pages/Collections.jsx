import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {ProgressBar, List, Pagination, ListGroup, Button} from 'react-bootstrap';
import { browserHistory } from 'react-router';
import _ from 'lodash';
import {Field, reduxForm} from 'redux-form';
import URLBuilder from '../helpers/URLBuilder.js';
import Select from 'react-select';

class Collections extends React.Component {
  /**
   * Constructor for app component. Initializes state and bind eventlisteners.
   * Fetches image list on construction
   * @param {object} props passed down from parent
   */
    constructor(props) {
        super(props);
        this.state = {
          warcFiles: [],
          name: "",
          value: null
        }

        // Fetching list by calling collectionfetchlist in /sagas/collections
        this.props.dispatch({type: 'collectionFetchList'});
        this.props.dispatch({type: 'filesFetchList'});
        this.handleSubmit = this.handleSubmit.bind(this);
        this.createFileList = this.createFileList.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }
    /**
     * Handler for submitting of the form included in collection creation.
     *
     * @param {object} form data passed down from the caller
     */
    handleSubmit(form) {
       _.omit(form, ["collectionName"])
       let files = [];
       _.forEach(_.omit(form, ["collectionName"]), (value, key) => {
         if (form[key] === true){
           files.push(atob(key));
         }
       })
       
       this.props.dispatch({
         type: 'collectionPost', 
         name: form.collectionName, 
         warcFiles: this.state.value ? this.state.value.split(",") : null});
     }

    handleSelectChange (value) {
      this.setState({ value });
    }

    createFileList() {
      if (this.props.files) {
      return this.props.files.map((file) => {
        return {
          value: file.name,
          label: file.name
          }
        })
      } else {
        return null;
      }
     }

     /**
      * render method to render the collections page
      */
    render() {
        let collectionName = "HelloWorld"
        if (this.props.collections[0]) {
            collectionName = this.props.collections[0].name;
        }
        var rows = [];
        console.log("Collections", this.props, !this.props.collections.results , this.props.files.length === 0 , this.props.files.length === undefined);
        if(this.props.collections.length === undefined || this.props.files.length === undefined){
          return(
            <div>LOADING</div>
          )
        }
        else {
          return (
            <div className="app-body">
              <div className="collection-container">
                <div className="collection-list-container">
                    <center> <h1> Collections </h1> </center>
                    <div className="create-collection-list">
                      <ul id="collections_list">
                        {this.props.collections.map((collection, index) => {
                            return (<li color="white" key={collection.name} id={index}>{collection.name}</li>);
                        })}
                      </ul>
                    </div>
                  <hr/>
                    <div className="create-collection-container">
                      <center><h1> Create a Collection </h1></center>
                      <form onSubmit={this.props.handleSubmit(this.handleSubmit)} id="files_list">
                        <div>
                          <label>Collection Name:</label>
                          <Field name="collectionName" component="input" type="text"/>
                        </div>
                        <div className="files-selector-container">
                          <div className="files-selector">
                            <Select multi simpleValue 
                              value={this.state.value} 
                              placeholder="Select your files" 
                              options={this.createFileList()} 
                              onChange={this.handleSelectChange} 
                            />
                          </div>
                          <Button bsStyle="success" type="submit">
                            <i className="fa fa-plus" aria-hidden="true"/>
                          </Button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div> );
        }

    }
}

/*
* Form uses redux to make the data more digestable
*/
const CollectionForm = reduxForm({form: 'collection'})(Collections);
/**
 * Mapping props from state received from store. Turns state.collections in this.props.collections
 * to be used in the component
 */
function mapStateToProps(state) {
    return {
        collections: state.collections || null,
        files: state.files || []
    };
}

// Connecting component to the store
export default connect(mapStateToProps)(CollectionForm);
