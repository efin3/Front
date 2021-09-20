import React, { useContext, useEffect } from "react";

import PageBanner from "../components/Common/PageBanner";

import { useTranslation } from "react-i18next";
import { EscolaLMSContext } from "../escolalms/context";
import Preloader from "../components/Preloader";
import PageCard from "../components/PageCard";

const Pages = () => {
  const { fetchPages, pages } = useContext(EscolaLMSContext);

  const { t } = useTranslation();

  useEffect(() => {
    fetchPages();
  }, []);

  console.log(pages);

  return (
    <React.Fragment>
      <PageBanner
        pageTitle={t("Pages")}
        homePageUrl="/"
        homePageText="Home"
        activePageText={t("Pages")}
      />

      <div className="courses-area ptb-100">
        <div className="container">
          <div className="row">
            {pages.loading && <Preloader />}
            {pages.list ? (
              <div
                className="col-lg-8 col-md-12"
                suppressHydrationWarning={true}
              >
                <div className="escolalms-grid-sorting row align-items-center"></div>

                <div className="row">
                  {pages.list.data.map((page) => (
                    <div className="col-lg-6 col-md-6" key={page.id}>
                      <PageCard page={page} />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="col-lg-8 col-md-12"></div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Pages;
