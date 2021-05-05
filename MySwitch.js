import React, { Component } from 'react';
import { connect } from 'react-redux'
import { inc } from './MyStore';

let pushed = false

class MySwitch extends Component {

    constructor(props) {
        super(props);
    }
  
    onmousedown = (e) => {
        this.props.inc();
        pushed = true;
    }

    onmouseup = (e) => {
        if( pushed ){
            this.props.inc();
            pushed = false;
        }
    }

    render() {
        return (
            <button type='button' id='button' className='switch' onMouseDown={ this.onmousedown } >スイッチ</button>
        );
    }

    componentDidMount() {
        document.addEventListener( 'mouseup', this.onmouseup );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
  inc
}

export default connect( mapStateToProps, mapDispatchToProps )(MySwitch);
