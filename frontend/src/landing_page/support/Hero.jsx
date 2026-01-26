function Hero() {
    return (
        <div className=" container-fluid bg-light px-5 py-5 ">
            <div className=" mx-5 px-5">
                <h1 className="">Support Portal</h1>
                <form class="d-flex mt-4" role="search">
                    <input class="form-control me-2 p-3 " type="search" placeholder="Search" aria-label="Search" />
                    <button class="btn btn-outline-success p-3" type="submit">Search</button>
                </form>
            </div>
        </div>
    );
}

export default Hero;