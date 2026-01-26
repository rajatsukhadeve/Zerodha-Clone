function RightSection({ imageUrl, productName, productDescription, learnMore }) {
    return (
        <div className="container mt-5">
            <div className="row p-5">
                <div className="col-4 pt-5" >
                    <h1 className="fs-2 mt-5 pt-5" >{productName}</h1>
                    <p>{productDescription}</p>
                    <div>
                        <a href={learnMore} style={{  textDecoration: "none" }}>Learn more <i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>
                    </div>
                </div>
                <div className="col-2"></div>
                <div className="col-6 ">
                    <img src={imageUrl} ></img>
                </div>


            </div>
        </div>
    );
}

export default RightSection;