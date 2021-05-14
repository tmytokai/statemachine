import React, { Component } from 'react';
import { connect } from 'react-redux'
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

const nodes = state => {
   let data = [
       {id: 0, label: 'S0\n\nスイッチ:OFF\nLED:OFF', x: 0,   y: 0 },
       {id: 1, label: 'S1\n\nスイッチ:ON\nLED:ON', x: 300, y: 0 },
       {id: 2, label: 'S2\n\nスイッチ:OFF\nLED:ON', x: 300, y: 200 },
       {id: 3, label: 'S3\n\nスイッチ:ON\nLED:OFF', x: 0,   y: 200 },
       {id: 4, label: 'スイッチをONにした',  shape: "text", fixed: true, x: 150, y: -15 },
       {id: 5, label: 'スイッチをOFFにした', shape: "text", fixed: true, x: 375, y: 110 },
       {id: 6, label: 'スイッチをONにした',  shape: "text", fixed: true, x: 150, y: 215 },
       {id: 7, label: 'スイッチをOFFにした', shape: "text", fixed: true, x: -75, y: 110 },
       {id: 8, label: 'LED',  x: -100,   y: -100 },
  ];
  data[state]['color'] = { background: '#FFFF00', border: '#000000'};
  if( state == 1 || state == 2 ) data[8]['color'] = { background: '#FF0000', border: '#000000'};

  return new DataSet( data );
}

class MyNetwork extends Component {

    constructor(props) {
        super(props);
        this.network = null;
        this.networkRef = React.createRef();
    }
  
    redraw = state => {
        if( this.network != null ){
            const data = {
                nodes: nodes(state),
                edges: edges
            };
            this.network.setData(data);
            this.network.redraw();
        }
    }

    render() {
        const { state } = this.props;
//        console.log( state );

	this.redraw( state );

        return (
            <div ref={this.networkRef} />
        );
    }

    componentDidMount() {
        const { state } = this.props;
        const data = {
            nodes: nodes(state),
            edges: edges
        };
        this.network = new Network(this.networkRef.current, data, options);
    }
}

const mapStateToProps = state => ({
    state: state.state
});

const mapDispatchToProps = {
}

export default connect( mapStateToProps, mapDispatchToProps )(MyNetwork);
