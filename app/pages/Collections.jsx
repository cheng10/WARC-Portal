import React from 'react';
import { connect } from 'react-redux';
import { Button, FormControl, ProgressBar } from 'react-bootstrap';
import _ from 'lodash';
import {Field, reduxForm} from 'redux-form';
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
          value: null,
        }

        // Fetching list by calling collectionfetchlist in /sagas/collections
        this.props.dispatch({type: 'collectionFetchList'});
        this.props.dispatch({type: 'filesFetchList'});
        this.handleSubmit = this.handleSubmit.bind(this);
        this.createFileList = this.createFileList.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.createFieldText = this.createFieldText.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
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

    handleSelectChange(value) {
      this.setState({ value });
    }

    handleFieldChange(e) {
      this.setState({
        name: "potato"
      })
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

    createFieldText(field) {
      return (
        <FormControl
          type="text"
          {...field.input}
        />)}
    ;
     /**
      * render method to render the collections page
      */
    render() {
        if(this.props.collections.length === undefined || this.props.files.length === undefined){
          return (
            <ProgressBar active now={100}/>
          )
        }
        else {
          return (
            <div className="app-body">
              <div className="collection-container">
                <div className="collection-list-container">
                    <div className="create-collection-list">
                      <div className="collection-list-header"> Collections </div>
                        <div className="collection-list-scroller">
                          <ul id="collections-list">
                            {this.props.collections.map((collection, index) => {
                                return (<li color="white" key={collection.name} id={index}>{collection.name}</li>);
                            })}
                          </ul>
                      </div>
                    </div>
                    <div className="create-collection-container">
                      <div className="create-collection-header"> Create Collection </div>
                        <div className="create-collection-form">
                        <form onSubmit={this.props.handleSubmit(this.handleSubmit)} id="files_list">
                          <div className="create-collection-name">
                            Name
                            <Field name="collectionName" component={this.createFieldText} type="text"/>
                          </div>
                          <div className="files-selector-container">
                            Files
                            <div className="files-selector">
                              <Select multi simpleValue 
                                value={this.state.value} 
                                placeholder="Select your files" 
                                options={this.createFileList()} 
                                onChange={this.handleSelectChange} 
                              />
                            </div>
                            <Button bsStyle="success" type="submit">
                              Add Collection
                            </Button>
                          </div>
                        </form>
                      </div>
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
