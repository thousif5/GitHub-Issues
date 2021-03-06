import React, { Component } from "react";
import { auth, signOut } from "./auth";
import MultipleSelect from "./MultipleSelect";
import "../App.css";
import { loginCheck } from "../actions/IssueActions";
import { connect } from "react-redux";

export class HeaderContainer extends Component {

  filterData = (e) => {
    let obj = {
      state: '',
      authors: '',
      label: '',
      search: '',
      sort: ''
    }
    obj[e.target.className] = (e.target.value!=='')?e.target.value:-1;
    this.props.filterAll(obj);
  }

  importToken = () => {
    if (sessionStorage.length === 1) {
      auth();
      this.props.loginCheck();
    } else {
      signOut();
      this.props.loginCheck();
    }
  };

  reset = () => {
    var authorDropDown = document.getElementById("authorDropDown");
    authorDropDown.selectedIndex = 0;
    var sortDropDown = document.getElementById("sortDropDown");
    sortDropDown.selectedIndex = 0;
    this.props.issuesHandler();
  };

  render() {
    let homeUrl = "http://localhost:3000";
    return (
      <div>
        <div className="title">
          <a href={`https://github.com/${this.props.repoOwner}`}>
            {this.props.repoData.owner}/
            <strong>{this.props.repoData.repo}</strong>
          </a>
          <input id="reset-button" onClick={this.reset} type="reset" />
          <input className = 'search'
            onKeyUp={this.filterData}
            type="text"
            placeholder="Search.."
          />
          <button onClick={this.importToken} className="signIn">
            {this.props.signed}
          </button>
        </div>
        <div className="issues-border">
          <div className="issues-tab">
            <i style={{ fontSize: "24px" }} className="fa">
              &#xf06a;&nbsp;
            </i>
            <a href={homeUrl}>
              <p>issues</p>
            </a>
          </div>
          <div>
            <button value = 'open' className = 'state' onClick={this.filterData}>
              open {this.props.openState}
            </button>
          </div>
          <div>
            <button value = 'closed' className = 'state' onClick={this.filterData}>
              closed {this.props.closeState}
            </button>
          </div>
          <div className="author-drop">
            <select
              id="authorDropDown"
              className = 'authors'
              onChange={this.filterData}
              defaultValue="Authors"
            >
              <option value="Authors" disabled>
                &nbsp;&nbsp;Authors
              </option>
              {this.props.authors.map(author => (
                <option>{author}</option>
              ))}
            </select>
          </div>
          <div className="sortDrop">
            <select
              id="sortDropDown"
              className = 'sort'
              onChange={this.filterData}
              defaultValue="Sort"
            >
              <option value="Sort" disabled>
                &nbsp;&nbsp;Sort
              </option>
              <option>Oldest</option>
              <option>Newest</option>
              <option>Recently Upadted</option>
              <option>Least Recently Updated</option>
            </select>
          </div>
          <div className="dropDown-list">
            <MultipleSelect />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    signed: state.issues.signed
  };
};

export default connect(
  mapStateToProps,
  { loginCheck }
)(HeaderContainer);
