import { Link } from "react-router-dom";

function Team() {
    return (
        <div className="container">
            <div className="row p-5 text-center">
                <h1 className="fs-2">People</h1>
            </div>
            <div className="row p-5 ">
                <div className="col-6 text-center">
                    <img src="/media/images/nithinKamath.jpg" style={{ width: "50%", margin: "auto", borderRadius: "50%" }}></img>
                    <p className="fs-5 mt-3">Nithin Kamath</p>
                    <p className="fs-6 text-muted">Founder, CEO</p>
                </div>
                <div className="col-6" style={{ fontSize: "1.2em" }}>
                    <p>Nithin bootstrapped and founded Zerodha in 2010 to overcome the hurdles he faced during his decade long stint as a trader. Today, Zerodha has changed the landscape of the Indian broking industry.</p>

                    <p>He is a member of the SEBI Secondary Market Advisory Committee (SMAC) and the Market Data Advisory Committee (MDAC).</p>

                    <p>Playing basketball is his zen.</p>

                    <p className="text-decoration-none">Connect on  <a href="">Homepage </a> /<a href="">TradingQnA</a> /<a href=""> Twitter</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Team;