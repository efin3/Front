//@ts-nocheck
import React, { useCallback, useContext, useEffect, useState } from "react";
import { CoursesContext } from "@/components/Courses/CoursesContext";
import { Title } from "@escolalms/components/lib/components/atoms/Typography/Title";
import { Text } from "@escolalms/components/lib/components/atoms/Typography/Text";
import { Spin } from "@escolalms/components/lib/components/atoms/Spin/Spin";
import { Dropdown } from "@escolalms/components/lib/components/molecules/Dropdown/Dropdown";
import { useTranslation } from "react-i18next";
import { API } from "@escolalms/sdk/lib";
import { CourseCard } from "@escolalms/components/lib/components/molecules/CourseCard/CourseCard";
import { Categories } from "@escolalms/components/lib/components/molecules/Categories/Categories";
import styled, { css, useTheme } from "styled-components";
import { EscolaLMSContext } from "@escolalms/sdk/lib/react";
import { CloseIcon } from "../../../icons";
import { useHistory, useLocation } from "react-router-dom";
import qs from "query-string";
import Pagination from "@/components/Pagination";
import { isMobile } from "react-device-detect";
import PromotedCoursesSection from "@/components/PromotedCoursesSection";
import CategoriesSection from "@/components/CategoriesSection";

type updateParamType =
  | { key: "free" | "tag"; value: string | undefined }
  | { key: "categories"; value: number[] };

type InitialFilters = {
  categories: number[] | undefined;
  free: string | undefined;
  tag: string | undefined;
};

const StyledHeader = styled("div")<{ filters: API.CourseParams | undefined }>`
  background: ${({ theme }) => theme.primaryColor};
  padding: ${isMobile ? "60px 20px 20px 20px" : "140px 40px 30px"};
  margin-bottom: ${isMobile ? "100px" : "40px"};
  position: relative;
  z-index: 100;

  h1 {
    color: ${({ theme }) => theme.white};
    margin-bottom: ${({ filters }) =>
      filters && Object.keys(filters).length > 1 ? "35px" : "-35px"};
    transition: margin-bottom 0.5s ease-out;
  }

  .filters-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    position: relative;

    .Dropdown-control {
      background: transparent;
      border-color: transparent;
      .Dropdown-placeholder {
        color: ${({ theme }) => theme.white};
      }
      .Dropdown-arrow-wrapper {
        svg {
          filter: brightness(0) invert(1);
        }
      }
    }
    .categories-container {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      &--loading {
        opacity: 0.6;
      }
      ${isMobile &&
      css`
        position: absolute;
        bottom: -95px;
        left: -20px;
        width: calc(100% + 40px);
      `}

      .clear-btn {
        appearance: none;
        background: transparent;
        border: none;
        outline: none;
        margin-left: 15px;
        cursor: pointer;
        &--desktop {
          display: ${isMobile ? "none" : "block"};
        }
        ${isMobile &&
        css`
          svg {
            path {
              fill: ${({ theme }) => theme.primaryColor};
            }
          }
        `}
      }

      .categories-row {
        display: flex;
        max-width: ${isMobile ? "100%" : "500px"};
        overflow-x: auto;
        overflow-y: hidden;
        justify-content: flex-start;
        align-items: center;
        column-gap: 10px;
        padding-bottom: 5px;
        ::-webkit-scrollbar {
          height: 4px;
          width: 4px;
          border: 1px solid transparent;
        }
        ::-webkit-scrollbar-track {
          border-radius: 0;
          background: rgba(255, 255, 255, 0.2);
        }
        ::-webkit-scrollbar-thumb {
          border-radius: 0;
          background: #ffffff;
        }

        .single-filter {
          border-width: 2px;
          border-style: solid;
          margin-bottom: 0;
          padding: 10px 20px;
          line-height: 0.9;
          text-align: center;
          max-height: 50px;
          min-height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-color: ${({ theme }) =>
            isMobile ? theme.primaryColor : theme.white};
          color: ${({ theme }) =>
            isMobile ? theme.primaryColor : theme.white};

          &--filters {
            display: flex;
            justify-content: center;
            align-items: center;
            min-width: 120px;
            color: ${({ theme }) => theme.primaryColor};
          }

          &--active {
            border-color: ${({ theme }) =>
              isMobile ? theme.primaryColor : theme.white};
            color: ${({ theme }) =>
              isMobile ? theme.white : theme.primaryColor};
            background-color: ${({ theme }) =>
              isMobile ? theme.primaryColor : theme.white};
          }
        }
      }
    }
    .mobile-categories-wrapper {
      button {
        color: ${({ theme }) => theme.primaryColor};
        border-color: ${({ theme }) => theme.primaryColor};
        min-width: 110px;
      }
    }
    .selects-row {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      column-gap: 35px;
      @media (max-width: 991px) {
        justify-content: space-between;
        width: 100%;
      }
      @media (max-width: 575px) {
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        row-gap: 15px;
      }
      .single-select {
        min-width: 130px;
        &--category {
          min-width: 200px;
          div {
            &:not(.categories-dropdown-options) {
              border: none;
            }
          }
          .categories-dropdown-options {
            background-color: ${({ theme }) => theme.white};
            margin-top: -1px;
          }
          .categories-dropdown-button {
            font-size: 16px;
            font-weight: 400;
            font-family: ${({ theme }) => theme.font};
          }
          button {
            ${isMobile &&
            css`
              color: ${({ theme }) => theme.white};
              border-color: ${({ theme }) => theme.white};
            `}
          }

          label {
            input {
              min-width: 20px;
            }
          }
        }
      }
    }
  }
`;

const CoursesList = styled.section`
  .course-wrapper {
    margin-bottom: ${isMobile ? "50px" : "75px"};
  }
`;

const CoursesCollection: React.FC = () => {
  const { params, setParams, courses } = useContext(CoursesContext);
  const { categoryTree, uniqueTags } = useContext(EscolaLMSContext);
  const [parsedParams, setParsedParams] = useState<
    API.CourseParams | undefined
  >();
  const initialFilters = {
    categories: [],
    free: "",
    tag: "",
  };
  const [filterState, setFilterState] =
    useState<InitialFilters>(initialFilters);
  const [paramsLoaded, setParamsLoaded] = useState<API.CourseParams | false>(
    false
  );
  const { t } = useTranslation();
  const history = useHistory();
  const location = useLocation();
  const theme = useTheme();

  const updateState = useCallback(
    (updateObj: updateParamType) =>
      setFilterState((prevState) => ({
        ...prevState,
        [updateObj.key]: updateObj.value,
      })),
    []
  );

  const resetFilters = () => {
    setFilterState(initialFilters);
  };

  const typeFilters = [
    { label: "Wszystkie", value: "false" },
    { label: "Darmowe", value: "true" },
  ];
  const tagsFilters = uniqueTags.list
    ? uniqueTags.list?.map((item) => {
        return { label: String(item.title), value: String(item.title) };
      })
    : [];

  useEffect(() => {
    params && setParamsLoaded(params);
  }, [params]);

  useEffect(() => {
    paramsLoaded &&
      setParsedParams(
        qs.parse(location.search, {
          arrayFormat: "bracket",
          parseNumbers: true,
        })
      );
  }, [paramsLoaded]);

  useEffect(() => {
    parsedParams &&
      setFilterState({
        categories: parsedParams.ids,
        tag: parsedParams.tag,
        free: parsedParams.free,
      });
  }, [parsedParams]);
  return (
    <>
      <StyledHeader filters={params}>
        <Title level={1}> {t("CoursesPage.Courses")}</Title>
        <div className="filters-container">
          <div
            className={`categories-container ${
              courses?.loading && "categories-container--loading"
            }`}
          >
            <div className="categories-row">
              {(filterState.free ||
                filterState.tag ||
                (filterState.categories &&
                  filterState.categories?.length > 0)) &&
                isMobile && (
                  <button
                    type="button"
                    onClick={() => {
                      setParsedParams({});
                      setParams && setParams({ page: 1 });
                      resetFilters();
                    }}
                    className="clear-btn"
                  >
                    <CloseIcon />
                  </button>
                )}
              {isMobile && (
                <div className="mobile-categories-wrapper">
                  <Categories
                    mobile
                    categories={categoryTree.list || []}
                    label={"Kategoria"}
                    selectedCategories={
                      filterState.categories &&
                      filterState.categories.length > 0
                        ? filterState.categories
                        : parsedParams && parsedParams.ids
                    }
                    drawerTitle={
                      <Title
                        level={5}
                        style={{
                          fontSize: "14px",
                        }}
                      >
                        {t("CoursesPage.Category")}
                      </Title>
                    }
                    handleChange={(value) => {
                      const newValue = value;
                      updateState({
                        key: "categories",
                        value: newValue,
                      });
                      setParams &&
                        setParams({
                          ...params,
                          page: 1,
                          "ids[]": newValue,
                        });
                    }}
                  />
                </div>
              )}
              {filterState.categories &&
                filterState.categories.length > 0 &&
                categoryTree?.list
                  ?.filter(
                    (item) => filterState.categories.indexOf(item.id) > -1
                  )
                  .map((category) => (
                    <Text key={category.id} className="single-filter">
                      {category.name}
                    </Text>
                  ))}
              {filterState && filterState.free === "true" && (
                <Text className="single-filter"> {t("CoursesPage.Free")}</Text>
              )}
              {filterState && filterState.free === "false" && (
                <Text className="single-filter"> {t("CoursesPage.All")}</Text>
              )}
              {filterState?.tag && (
                <Text className="single-filter">{params?.tag}</Text>
              )}
            </div>
            {(filterState.free ||
              filterState.tag ||
              (filterState.categories && filterState.categories?.length > 0)) &&
              !isMobile && (
                <button
                  type="button"
                  onClick={() => {
                    setParsedParams({});
                    setParams && setParams({ page: 1 });
                    resetFilters();
                  }}
                  className="clear-btn clear-btn--desktop"
                >
                  <CloseIcon />
                </button>
              )}
          </div>
          <div className="selects-row">
            {!isMobile && (
              <div className="single-select single-select--category">
                <Categories
                  backgroundColor={theme.primaryColor}
                  categories={categoryTree.list || []}
                  label={"Kategoria"}
                  selectedCategories={
                    filterState.categories && filterState.categories.length > 0
                      ? filterState.categories
                      : parsedParams && parsedParams.ids
                  }
                  drawerTitle={
                    <Title
                      level={5}
                      style={{
                        fontSize: "14px",
                      }}
                    >
                      {t("CoursesPage.Category")}
                    </Title>
                  }
                  handleChange={(value) => {
                    const newValue = value;
                    updateState({
                      key: "categories",
                      value: newValue,
                    });
                    setParams &&
                      setParams({
                        ...params,
                        page: 1,
                        "ids[]": newValue,
                      });
                  }}
                />
              </div>
            )}
            <div className="single-select">
              <Dropdown
                onChange={(e) => {
                  updateState({
                    key: "free",
                    value: e.value,
                  });
                  setParams &&
                    setParams({
                      ...params,
                      page: 1,
                      free: e.value === "true" ? true : false,
                    });
                }}
                placeholder={t("CoursesPage.Type")}
                value={filterState.free}
                options={typeFilters}
              />
            </div>
            <div className="single-select">
              <Dropdown
                onChange={(e) => {
                  updateState({
                    key: "tag",
                    value: e.value,
                  });
                  setParams &&
                    setParams({
                      ...params,
                      page: 1,
                      tag: e.value,
                    });
                }}
                value={filterState.tag}
                placeholder="Tag"
                options={[
                  { label: t("CoursesPage.All"), value: "" },
                  ...tagsFilters,
                ]}
              />
            </div>
          </div>
        </div>
      </StyledHeader>
      {courses &&
      !courses.loading &&
      (!courses.list || !courses.list.data?.length) ? (
        <Title level={4}>{t("NoCourses")}</Title>
      ) : (
        <>
          {courses?.loading ? (
            <div
              style={{ display: "flex", justifyContent: "center" }}
              className="loader-wrapper"
            >
              <Spin color={theme.primaryColor} />
            </div>
          ) : (
            <CoursesList>
              <div className="row">
                {courses?.list?.data.map((item) => (
                  <div className="col-xl-3 col-lg-4 col-md-6" key={item.id}>
                    <div className="course-wrapper">
                      <CourseCard
                        mobile={isMobile}
                        id={item.id}
                        title={item.title}
                        categories={{
                          categoryElements: item.categories || [],
                          onCategoryClick: (id) =>
                            history.push(`/courses/?category_id=${id}`),
                        }}
                        onButtonClick={() =>
                          history.push(`/courses/${item.id}`)
                        }
                        buttonText={t("StartNow")}
                        lessonCount={5}
                        hideImage={false}
                        subtitle={
                          item.subtitle ? (
                            <Text>
                              <strong style={{ fontSize: 14 }}>
                                {item.subtitle?.substring(0, 30)}
                              </strong>
                            </Text>
                          ) : null
                        }
                        image={{
                          url: item.image_url,
                          alt: "",
                        }}
                        tags={item.tags as API.Tag[]}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CoursesList>
          )}
        </>
      )}
      {courses &&
        courses.list &&
        courses.list.meta.total > courses.list.meta.per_page && (
          <Pagination
            total={courses.list.meta.total}
            perPage={courses.list.meta.per_page}
            currentPage={courses.list.meta.current_page}
            onPage={(i) =>
              setParams &&
              setParams({
                ...params,
                page: i,
                per_page: 6,
              })
            }
          />
        )}
      {courses && courses.list && courses.list.data.length >= 6 && (
        <PromotedCoursesSection courses={courses.list.data} />
      )}
      {categoryTree && (
        <CategoriesSection categories={categoryTree.list || []} />
      )}
    </>
  );
};

export default CoursesCollection;
