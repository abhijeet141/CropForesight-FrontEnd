import "./404.css";

const Err = () => {
    return (
        <>
            <div className="pg_not_found">
                <h1 className="error">4<span><i class="fas fa-ghost purple"></i></span>4</h1>
                <h2>Error: 404 page not found</h2>
                <p>Sorry, the page you're looking for cannot be accessed</p>
            </div>
        </>
    )
}

export default Err;
