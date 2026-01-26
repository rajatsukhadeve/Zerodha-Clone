function Universe() {
    return (
        <div className="container">
            <div className="row text-center mt-5 p-5 ">
                <h1 className="fs-2 mb-4">The Zerodha Universe</h1>
                <p className="fs-5">Extend your trading and investment experience even further with our partner platforms</p>
            </div>
            <div className="row text-center mb-5">
                <div className="col-4 px-5">
                    <img src="media/images/zerodhaFundhouse.png" style={{ width: "70%" }} />
                    <p className="mt-3">Our asset management venture
                        that is creating simple and transparent index
                        funds to help you save for your goals.
                    </p>
                </div>
                <div className="col-4 px-5">
                    <img src="media/images/sensibullLogo.svg" style={{ width: "70%" }} />
                    <p className="mt-4">Options trading platform that lets you
                        create strategies, analyze positions, and examine
                        data points like open interest, FII/DII, and more.
                    </p>
                </div>
                <div className="col-4 px-5">
                    <img src="media/images/goldenpiLogo.png" style={{ width: "70%" }} />
                    <p className="mt-3">Investment research platform
                        that offers detailed insights on stocks,
                        sectors, supply chains, and more.

                    </p>
                </div>
            </div>
            <div className="row text-center">
                <div className="col-4 px-5">
                    <img src="media/images/streakLogo.png" style={{ width: "70%" }} />
                    <p className="mt-3">Systematic trading platform
                        that allows you to create and backtest
                        strategies without coding.
                    </p>
                </div>
                <div className="col-4 px-5">
                    <img src="media/images/smallcaseLogo.png" style={{ width: "70%" }} />
                    <p className="mt-3">Thematic investing platform
                        that helps you invest in diversified
                        baskets of stocks on ETFs.
                    </p>
                </div>
                <div className="col-4 px-5">
                    <img src="media/images/dittoLogo.png" style={{ width: "50%" }} />
                    <p className="mt-3">Personalized advice on life
                        and health insurance. No spam
                        and no mis-selling.
                        Sign up for free
                    </p>
                </div>
            </div>
            <div className="d-flex justify-content-center mb-5">
                <button className="btn btn-primary  fs-4 my-5" > Sign up for free</button>
            </div>
        </div>
    );
}

export default Universe;