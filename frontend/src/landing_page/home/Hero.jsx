function Hero() {
    return (
        <div className="container p-5 mb-5 ">
            <div className="row text-center">
                <img src="media/images/homeHero.png" alt="Hero png" className="mb-5"></img>
                <h1 className="mt-5">Invest in everything</h1>
                <p>Online platform to invest in stocks, derivatives, mutual funds, ETFs, bonds, and more.</p>
                <button style={{width:"20%",margin:"auto"}} className="p-2 fs-5 btn btn-primary mb-5">Sign up for free</button>
            </div>
        </div>
    );
}

export default Hero;