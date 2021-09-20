import React, { useContext, useEffect } from "react";

import PageBanner from "../../../components/Common/PageBanner";

import { EscolaLMSContext } from "../../../escolalms/context";
import { useParams } from "react-router-dom";
import Preloader from "../../../components/Preloader";
import Image from "../../../escolalms/components/Image";
import ReactMarkdown from "react-markdown";
import CourseCard from "../../../components/CourseCard";
import Layout from "../../../components/_App/Layout";

const Profile = ({ pageProps }) => {
  const { id } = useParams();

  // const id = pathname.split("tutors/")[1];
  const { tutor, fetchTutor, courses, fetchCourses } =
    useContext(EscolaLMSContext);

  useEffect(() => {
    fetchTutor(Number(id));
    fetchCourses({ author_id: id });
  }, [id]);

  console.log(tutor);

  return (
    <Layout {...pageProps}>
      <React.Fragment>
        {/* <Navbar /> */}
        <PageBanner
          pageTitle="Tutor"
          homePageUrl="/"
          homePageText="Home"
          activePageText="Tutor"
        />

        <div className="profile-area">
          <div className="container">
            {tutor.loading && <Preloader />}

            {tutor.value && (
              <div className="profile-box ptb-100">
                <div className="row align-items-center">
                  <div className="col-lg-4 col-md-4">
                    <div className="image">
                      <Image
                        path={tutor.value.path_avatar}
                        srcSizes={[355, 355 * 2]}
                      />
                    </div>
                  </div>

                  <div className="col-lg-8 col-md-8">
                    <div className="content">
                      <h3>
                        {tutor.value.first_name} {tutor.value.last_name}
                      </h3>
                      <span className="sub-title">Tutor</span>
                      <div>
                        <ReactMarkdown>{tutor.value.bio}</ReactMarkdown>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="profile-courses pb-70">
              <h3 className="title">Tutor Courses</h3>
              <div className="row">
                {courses.list?.data.map((course) => (
                  <div className="col-lg-4 col-md-6">
                    <CourseCard course={course} key={course.id} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    </Layout>
  );
};

export default Profile;