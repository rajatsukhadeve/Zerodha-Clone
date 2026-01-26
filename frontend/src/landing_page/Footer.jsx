function Footer() {
    return (
        <footer className="bg-light border-top">
            <div className="container   mt-5 ">
                <div className="row mt-5 ">
                    <div className="col ">
                        <img src="media/images/logo.svg" alt="logo" style={{ width: "50%" }} />
                        <p>
                            &copy; Zerodha <br /> All rights reserved.
                        </p>
                    </div>
                    <div className="col  footer-links">
                        <p className="fs-4">Company</p>
                        <a href="" >About</a><br />
                        <a href="">Philosophy</a><br />
                        <a href="">Press & media</a><br />
                        <a href="">Careers</a><br />
                        <a href="">Zerodha Cares</a><br />
                        <a href="">Zerodha.tech</a><br />
                        <a href="">Open source</a><br />
                    </div>
                    <div className="col footer-links">
                        <p className="fs-4">Support</p>
                        <a href="">Contact us</a><br />
                        <a href="">Support portal</a><br />
                        <a href="">How to file a complaint?</a><br />
                        <a href="">Status of your complaints</a><br />
                        <a href="">Bulletin</a><br />
                        <a href="">Circular</a><br />
                        <a href="">Z-Connect blog</a><br />
                        <a href="">Downloads</a><br />
                    </div>
                    <div className="col footer-links">
                        <p className="fs-4">Account</p>
                        <a href="">Open demat account </a><br />
                        <a href="">Minor demat account</a><br />
                        <a href="">NRI demat account</a><br />
                        <a href="">Commodity</a><br />
                        <a href="">Dematerialisation</a><br />
                        <a href="">Fund transfer</a><br />
                        <a href="">MTF</a><br />
                        <a href="">Referral program</a><br />
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;