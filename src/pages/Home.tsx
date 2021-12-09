import React from "react";
import PageSeo from "seo/PageSeo";

const Home = () => {
    return (
        <PageSeo
            title="메인 화면"
            meta={[
                { name: "description", content: "리액트 커스텀 SSR입니다." },
            ]}
        >
            <div>Homdde</div>
        </PageSeo>
    );
};

export default Home;
