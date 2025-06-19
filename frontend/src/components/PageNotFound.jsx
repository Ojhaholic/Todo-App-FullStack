import React from 'react';
import './PageNotFound.css';

function PageNotFound() {
    return (
        <>
            <section class="page_404">
                <div class="container">
                    <div class="content">
                        <h1>404</h1>
                        <h2>Oops! Page Not Found</h2>
                        <p>We can't seem to find the page you're looking for.</p>
                        <a href="/" class="btn-home">Go to Home</a>
                    </div>
                </div>
            </section>
        </>
    )
}

export default PageNotFound