import React from "react";

import Layout from "@/components/_App/Layout";
import CoursesCollection from "@/components/Courses/CoursesCollection";
import CoursesProvider from "@/components/Courses/CoursesProvider";
import { useTranslation } from "react-i18next";
import Container from "@/components/Container";

const CoursesPage = () => {
  const { t } = useTranslation();
  return (
    <Layout metaTitle={t("CoursesPage.Courses")}>
      <CoursesProvider onlyFree={false}>
        <section className="courses-page">
          <Container>
            <CoursesCollection />
          </Container>
        </section>
      </CoursesProvider>
    </Layout>
  );
};

export default CoursesPage;
