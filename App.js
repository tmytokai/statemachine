import React, { Component } from 'react';
import { DataSet, Network } from "vis";

const edges = new DataSet([
  {from: 0, to: 1, arrows: 'to'},
  {from: 1, to: 2, arrows: 'to'},
  {from: 2, to: 3, arrows: 'to'},
  {from: 3, to: 0, arrows: 'to'},
]);

const options = {
  width:  '600',
  height: '400',
  nodes:{
    shape: 'circle',
    color: {
        background: '#FFFFFF',
        border: '#000000'
    },
    margin: 10,
    fixed: true,
  },
  edges:{
    color: {
        color:'#000000',
        highlight:'#000000',
        hover: '#000000',
        inherit: false,
        opacity: 1.0
    }
  },
  physics:{
    enabled: false
  }
};

let network = null;

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
          state: 0,
          pushed: false
        };
        this.networkRef = React.createRef();
    }
  
    nodes = (state) => {

　　　let data = [
        {id: 0, label: 'S0\n\nスイッチ:OFF\nLED:OFF', x: 0,   y: 0 },
        {id: 1, label: 'S1\n\nスイッチ:ON\nLED:ON', x: 300, y: 0 },
        {id: 2, label: 'S2\n\nスイッチ:OFF\nLED:ON', x: 300, y: 200 },
        {id: 3, label: 'S3\n\nスイッチ:ON\nLED:OFF', x: 0,   y: 200 },

        {id: 4, label: 'スイッチをONにした',  shape: "text", fixed: true, x: 150, y: -15 },
        {id: 5, label: 'スイッチをOFFにした', shape: "text", fixed: true, x: 370, y: 110 },
        {id: 6, label: 'スイッチをONにした',  shape: "text", fixed: true, x: 150, y: 215 },
        {id: 7, label: 'スイッチをOFFにした', shape: "text", fixed: true, x: -70, y: 110 },

        {id: 8, label: 'LED',  x: -100,   y: -100 },
      ];
      data[state]['color'] = { background: '#FFFF00', border: '#000000'};
      if( state == 1 || state == 2 ) data[8]['color'] = { background: '#FF0000', border: '#000000'};
      return new DataSet( data );
    }

    redrawnetwork = (state) => {
        if( network != null ){
            const data = {
                nodes: this.nodes(state),
                edges: edges
            };
            network.setData(data);
            network.redraw();
        }
    }

    onmousedown = (e) => {
        let { state } = this.state;
        state = (state+1)%4;
        this.setState({ state: state, pushed: true })
        this.redrawnetwork( state );
    }

    onmouseup = (e) => {
        let { state, pushed } = this.state;
        if( pushed ){
            state = (state+1)%4;
            this.setState({ state: state, pushed: false })
            this.redrawnetwork( state );
        }
    }

    render() {
        const { state } = this.state;
//        console.log( state );
        return (
            <div>
              <table><tbody><tr>
              <td>
              <table className='statetable'>
              <tbody>
              <tr>
                <td className='diag' >　　　　　　　　　イベント<br/>現在の状態</td>
                <td>スイッチをONにした</td>
                <td>スイッチをOFFにした</td>
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
              </td>
              <td>
              <button type='button' id='button' className='switch' onMouseDown={ this.onmousedown } >スイッチ</button>
              <div ref={this.networkRef} />
              </td>
              </tr></tbody></table>
            </div>
        );
    }

    componentDidMount() {
      document.addEventListener( 'mouseup', this.onmouseup );
      const { state } = this.state;
      const data = {
        nodes: this.nodes(state),
        edges: edges
      };
      network = new Network(this.networkRef.current, data, options);
    }
}
