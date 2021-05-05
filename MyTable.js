import React, { Component } from 'react';
import { connect } from 'react-redux'

class MyTable extends Component {

    constructor(props) {
        super(props);
    }
  
    render() {
        const { state } = this.props;

        return (
            <div>
              <table className='statetable'>
              <tbody>
              <tr>
                <td className='diag' ><div className='diagr'>イベント</div><div className='diagl'>現在の状態</div></td>
                <td className={state == 0 || state == 2 ? 'blink' : ''}>スイッチをONにした</td>
                <td className={state == 1 || state == 3 ? 'blink' : ''}>スイッチをOFFにした</td>
              </tr>
              <tr>
                <td className={state == 0 ? 'hl' : ''} >S0<br/>スイッチ:OFF<br/>LED:OFF</td>
                <td>LEDをONにする<br/>／　S1</td>
                <td>― ／ ―</td>
              </tr>
              <tr>
                <td className={state == 1 ? 'hl' : ''} >S1<br/>スイッチ:ON<br/>LED:ON</td>
                <td>― ／ ―</td>
                <td>― ／ S2</td>
              </tr>
              <tr>
                <td className={state == 2 ? 'hl' : ''} >S2<br/>スイッチ:OFF<br/>LED:ON</td>
                <td>LEDをOFFにする<br/>／　S3</td>
                <td>― ／ ―</td>
              </tr>
              <tr>
                <td className={state == 3 ? 'hl' : ''} >S3<br/>スイッチ:ON<br/>LED:OFF</td>
                <td>― ／ ―</td>
                <td>― ／ S0</td>
              </tr>
              </tbody>
              </table>
            </div>
        );
    }
}

const mapStateToProps = state => ({
  state: state.state
});

const mapDispatchToProps = {
}

export default connect( mapStateToProps, mapDispatchToProps )(MyTable);
