import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import request from 'request';

class ImageComponent extends Component {
    constructor(props) {
        super(props);
    }

    GetImagesFromImgur() {

        request(
            {
                url: 'https://api.imgur.com/3/album/h3Qqm/images',
                method: 'GET',
                headers: { 'Authorization': 'Client-ID 908c85ce012a0e1' }
            },

            function( error, response, body ){
                console.log(body);
            }
        );
    }

    componentDidMount(){
        this.GetImagesFromImgur();
    }

    render() {
        return (
            <div>
                <span>
                    Image list from Imgur
                </span>
                <div id="image-list">
                </div>
            </div>
        );
    }
}

export default ImageComponent;
