function Hero() {
    return (
        <div className="container">
            <div className="row text-center m-5 p-5">
                <h1 className="fs-2 ">Charges</h1>
                <p className="fs-4 text-muted">List of all charges and taxes</p>
            </div>
            <div className="row text-center p-5">
                <div className="col">
                    <img src="media/images/pricing0.svg" style={{width:"80%"}}/>
                    <h1 className="fs-2 mb-3">Free equity delivery</h1>
                    <p>All equity delivery investments (NSE, BSE), are absolutely free — ₹ 0 brokerage.</p>
                </div>
                <div className="col">
                    <img src="media/images/pricing20.svg" style={{width:"80%"}}/>
                    <h1 className="fs-2 mb-3">Intraday and F&O trades</h1>
                    <p>Flat ₹ 20 or 0.03% (whichever is lower) per executed order on intraday trades across equity, currency, and commodity trades. Flat ₹20 on all option trades.</p>
                </div>
                <div className="col">
                    <img src="media/images/pricing0.svg"  style={{width:"80%"}}/>
                    <h1 className="fs-2 mb-3">Free direct MF</h1>
                    <p>All direct mutual fund investments are absolutely free — ₹ 0 commissions & DP charges.</p>
                </div>
            </div>
        </div>
    );
}

export default Hero;