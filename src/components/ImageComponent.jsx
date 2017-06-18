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
                let pictureLayout = JSON.parse(body).data.map(function(picture){
                    let thumbStyles;
                    if( picture.width > picture.height ){
                        thumbStyles = "\
                        <div class='thumbnail'>\
                            <a href=#"+picture.id+">\
                                <img src=" + picture.link + " />\
                            </a>\
                        </div>\
                        <a href='#_'>\
                        <div class='lightbox' id="+picture.id+">\
                        <img src=" + picture.link + " />\
                        </div>\
                        </a>\
                        ";
                    }else{
                        thumbStyles = "\
                        <div class='thumbnail'>\
                            <a href=#"+picture.id+">\
                                <img class='portrait' src=" + picture.link + " />\
                            </a>\
                        </div>\
                        <a href='#_'>\
                        <div class='lightbox' id="+picture.id+">\
                        <img src=" + picture.link + " />\
                        </div>\
                        </a>\
                        ";
                    }
                    return thumbStyles;
                })
                document.getElementById('image-list').innerHTML = pictureLayout.join('');
            }
        );
    }

    componentDidMount(){
        this.GetImagesFromImgur();
    }

    render() {
        return (
            <div>
                <div className = "Upload-Button">
                    <label>Upload image to Imgur</label>
                    <form encType="multipart/form-data">
                        <input type="file" />
                        <input type="submit" value="Upload" />
                    </form>
                </div>

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
