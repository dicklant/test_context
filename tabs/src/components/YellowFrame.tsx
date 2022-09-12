import React from 'react';


type YellowInfo = {
    idSession : string,
    homePage : boolean
}

class YellowTab extends React.Component<YellowInfo> {

    private yellowInfo : YellowInfo;
    private url : string;

    constructor (props : YellowInfo) {
        super(props);

        this.yellowInfo = props;
        this.url = "https://yellowintegration.azurewebsites.net/";
    }

    render() {

        if(this.yellowInfo.idSession!=null)
            this.url = this.url.concat(this.yellowInfo.idSession);

        return <div>
            <h1>Yellow</h1>
            <iframe id="YellowFrame" title='Yellow App' src={this.url} height="80%" width="100%"></iframe>
        </div>
    }
}

export default YellowTab;

