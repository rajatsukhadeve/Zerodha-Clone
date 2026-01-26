function LeftSection({ imageUrl, productName, productDescription, tryDemo, learnMore, googlePlay, appStore }) {
    return (
        <div className="container  mt-5">
            <div className="row mt-5 p-5 ">
                <div className="col-6 ">
                    <img src={imageUrl}></img>
                </div>
                <div className="col-2"></div>
                <div className="col-4 mt-5 ">
                    <h1 className="fs-2">{productName}</h1>
                    <p>{productDescription}</p>
                    <div>
                        <a href={tryDemo} style={{ textDecoration:"none"}}>Try demo <i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>
                        <a href={learnMore} style={{marginLeft:"60px" ,textDecoration:"none"}}>Learn more <i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>
                    </div>
                    <div className="mt-3">
                        <a href={googlePlay}><img src="media/images/googlePlayBadge.svg" /></a> &nbsp; &nbsp;
                        <a href={appStore}><img src="media/images/appstoreBadge.svg" /></a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LeftSection;