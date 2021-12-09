import React from "react";
import { Helmet } from "react-helmet";

type PageSeoProps = {
    children: React.ReactNode;
    title?: string;
    link?: any[];
    meta?: any[];
};

const DEFAULT_TITLE = "기본 타이틀";
const DEFAULT_LINK: any[] = [];
const DEFAULT_META: any[] = [];

const PageSeo = ({
    children,
    title = DEFAULT_TITLE,
    link = DEFAULT_LINK,
    meta = DEFAULT_META,
}: PageSeoProps) => {
    return (
        <>
            <Helmet title={title} link={link} meta={meta} />
            {children}
        </>
    );
};

export default PageSeo;
