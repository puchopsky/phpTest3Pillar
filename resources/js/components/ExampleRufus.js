import React from 'react';
import ReactDOM from 'react-dom';

function ExampleRufus() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">RUFUS Component</div>

                        <div className="card-body">I'm an RUFUS component!</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExampleRufus;

if (document.getElementById('exampleRufus')) {
    ReactDOM.render(<ExampleRufus />, document.getElementById('exampleRufus'));
}
