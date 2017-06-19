import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import request from 'request';

class ImageComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataUri: null,
        }
    }

    chooseFile(event) {
        const reader = new FileReader();
        const file = event.target.files[0];

        reader.onload = (upload) => {
            this.setState({
                dataUri: upload.target.result,
            });
        };
        reader.readAsDataURL(file);
    }

    handleSubmit(event) {
        event.preventDefault();
        const img = this.state.dataUri;
        this.uploadImageToImgur(img);
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

    uploadImageToImgur(imageData){
        let newImageData = imageData.replace(/data:image\/.+;base64/i, '');
        let options = {
            url: 'https://api.imgur.com/3/upload',
            headers: { 'Authorization': 'Client-ID 908c85ce012a0e1' },
            method: 'POST',
            form: { image: newImageData }
        }
        request(options, function(err,httpResponse,body){
            if (err) {
                sweetAlert("Oops...", "Upload not successful!", "error");
            } else {
                swal({
                    title: "Upload successful!",
                    text: "The image's link in imgur is \
                        <span style='color:#F8BB86'>\
                            <a href = "+JSON.parse(body).data.link+">\
                                "+JSON.parse(body).data.link+"\
                            </a>\
                        <span>.",
                    html: true
                });
            }
        });
    }

    componentDidMount(){
        this.GetImagesFromImgur();
    }

    render() {
        return (
            <div>
                <div className = "upload">
                    <form onSubmit={ this.handleSubmit.bind(this) } encType="multipart/form-data">
                        <div className = "upload-button">
                            <div className = "upload-title">
                                <label>Upload image to Imgur</label>
                            </div>
                            <div>
                                <input type="file" onChange={ this.chooseFile.bind(this) } />
                                <input type="submit" value="Upload" />
                            </div>
                        </div>
                    </form>
                </div>

                <div className = "subtitle">
                    Image list from Imgur
                </div>
                <div id="image-list">
                </div>
            </div>
        );
    }
}

export default ImageComponent;
