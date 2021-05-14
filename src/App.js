import React, { Component } from 'react';
import MyTable from './MyTable';
import MySwitch from './MySwitch';
import MyNetwork from './MyNetwork';

export default class App extends Component {

    constructor(props) {
        super(props);
    }
  
    render() {
        return (
            <div>
              <table><tbody><tr>
              <td>
                <MyTable />
              </td>
              <td>
                <MySwitch />
                <MyNetwork />
              </td>
              </tr></tbody></table>
            </div>
        );
    }
}
