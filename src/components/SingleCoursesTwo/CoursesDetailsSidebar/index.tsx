import React, { useContext, useMemo } from "react";
import { API } from "@escolalms/sdk/lib";
import { EscolaLMSContext } from "@escolalms/sdk/lib/react/context";
import { IconText, Text, CourseProgress } from "@escolalms/components";
import { PricingCard } from "@escolalms/components/lib/components/atoms/PricingCard/PricingCard";
import { IconSquares, IconWin, IconCamera } from "../../../icons";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { Title } from "@escolalms/components/lib/components/atoms/Typography/Title";
import { useTheme } from "styled-components";
import { useCourseProgress } from "../../../hooks/useCourseProgress";
import CourseDetailsSidebarButtons from "./Buttons";
import { formatPrice } from "@/utils/index";
import ContentLoader from "@/components/ContentLoader";
import ProductPrices from "@/components/ProductPrices";

interface Props {
  course: API.Course;
  onRequestAccess: () => void;
}

const CoursesDetailsSidebar: React.FC<Props> = ({
  course,
  onRequestAccess,
}) => {
  const theme = useTheme();
  const { user, courseAccess } = useContext(EscolaLMSContext);
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const { progress } = useCourseProgress(Number(id));

  const userOwnThisCourse = useMemo(
    () => course?.product?.owned,
    [course?.product?.owned]
  );
  const userCourseAccess = useMemo(
    () =>
      !!courseAccess.list?.data?.find(
        (courseAccessItem) =>
          courseAccessItem?.course?.id === course.id &&
          courseAccessItem.status === "approved"
      ),
    [course.id, courseAccess.list?.data]
  );

  const currentCourse = useMemo(() => progress.data || [], [progress.data]);

  const progressMap = useMemo(() => {
    if (user.value && (userOwnThisCourse || userCourseAccess)) {
      const finishedLessons =
        currentCourse?.filter((item) => item.status === 1) || [];
      return finishedLessons.length;
    } else {
      return 0;
    }
  }, [currentCourse, user.value, userCourseAccess, userOwnThisCourse]);

  const isFree = course.product?.price === 0 || !course.product?.price;

  return !isMobile ? (
    <PricingCard>
      <Title level={4} as="h2">
        {course.title}
      </Title>
      {!isFree && (
        <ProductPrices
          price={course.product?.price}
          taxRate={course.product?.tax_rate}
          oldPrice={course.product?.price_old}
        />
      )}
      {progress.loaded ? (
        <CourseDetailsSidebarButtons
          onRequestAccess={onRequestAccess}
          course={course}
          userOwnThisCourse={userOwnThisCourse}
          isFree={isFree}
        />
      ) : (
        <ContentLoader />
      )}
      {!isFree && <Text size={"12"}> {t("CoursePage.30Days")}</Text>}
      <div className="pricing-card-features">
        {course.duration && (
          <IconText
            icon={<IconCamera />}
            text={`${t("CoursePage.Duration")}: ${course.duration}`}
          />
        )}
        {course.lessons && (
          <IconText
            icon={<IconSquares />}
            text={`${t("CoursePage.Lessons")}: ${course.lessons.length}`}
          />
        )}
        {course.language && (
          <IconText
            icon={<IconSquares />}
            text={`${t("CoursePage.Language")}: ${course.language}`}
          />
        )}
        {course.level && (
          <IconText
            icon={<IconSquares />}
            text={`${t("CoursePage.Level")}: ${course.level}`}
          />
        )}
        {course.users_count ? (
          <IconText
            icon={<IconSquares />}
            text={`${t("CoursePage.Students")}: ${course.users_count}`}
          />
        ) : (
          ""
        )}
      </div>
      {!user.value ? (
        <Text size="12">
          <Link
            to={`/login?referrer=/courses/${course.id}`}
            style={{
              marginRight: "4px",
              color: theme.primaryColor,
            }}
          >
            {t<string>("CoursePage.Login")}
          </Link>
          {t("CoursePage.ToSeeProgress")}
        </Text>
      ) : (
        <CourseProgress
          progress={
            currentCourse && currentCourse?.length > 0
              ? progressMap / currentCourse.length
              : 0
          }
          icon={
            progress.loaded ? (
              <IconWin />
            ) : (
              <ContentLoader width="22px" height="22px" />
            )
          }
          title={t("CoursePage.MyProgress")}
        >
          <strong style={{ fontSize: 14 }}>
            {t<string>("CoursePage.Finished")} {progressMap || 0}{" "}
            {t<string>("CoursePage.Of")}{" "}
            {currentCourse && currentCourse?.length > 0
              ? currentCourse.length
              : 0}{" "}
            {t<string>("CoursePage.Lessons")}
          </strong>
          <p style={{ marginTop: 9, marginBottom: 0 }}>
            {t<string>("CoursePage.FinishToGetCertificate")}
          </p>
        </CourseProgress>
      )}
    </PricingCard>
  ) : (
    <PricingCard mobile>
      <Title level={5} as={"h5"}>
        {course.title}
      </Title>
      <div className="pricing-card-footer">
        {!isFree && (
          <div>
            {course.product?.price_old && (
              <div className="pricing-card-discount">
                <Title level={5} as={"h5"}>
                  {formatPrice(
                    course.product?.price_old,
                    course.product?.tax_rate
                  )}{" "}
                  zł
                </Title>
              </div>
            )}
            <Title level={4} as={"h4"}>
              {formatPrice(course.product?.price, course.product?.tax_rate)} zł
            </Title>
          </div>
        )}
        <div>
          {progress.loaded ? (
            <CourseDetailsSidebarButtons
              onRequestAccess={onRequestAccess}
              course={course}
              userOwnThisCourse={userOwnThisCourse}
            />
          ) : (
            <ContentLoader />
          )}
        </div>
      </div>
    </PricingCard>
  );
};

export default CoursesDetailsSidebar;
