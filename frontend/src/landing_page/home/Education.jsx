function Education() {
    return (
        <div className="container p-5">
            <div className="row p-5">
                <div className="col-6">
                    <img src="media/images/education.svg" style={{width:"75%"}}></img>
                </div>
                
                <div className="col-6 ">
                    <h1 className="fs-2 mb-5">Free and open market education</h1>
                    <p className="mb-3">Varsity, the largest online stock market education book in the world covering everything from the basics to advanced trading.</p>
                    <a href="" className="text-decoration-none">Varsity <i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>

                    <p className="mb-3 mt-4">TradingQ&A, the most active trading and investment community in India for all your market related queries.</p>
                    <a href="" className="text-decoration-none">TradingQ&A <i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>
                </div>
            </div>
        </div>
    );
}

export default Education;