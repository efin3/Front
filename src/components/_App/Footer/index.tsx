import { useContext, useEffect, useMemo } from "react";
import { Text } from "@escolalms/components/lib/components/atoms/Typography/Text";
import styled from "styled-components";
import { EscolaLMSContext } from "@escolalms/sdk/lib/react";
import { isMobile } from "react-device-detect";
import { useTranslation } from "react-i18next";
import { Col, Row } from "react-grid-system";
import { PageListItem, PaginatedMetaList } from "@escolalms/sdk/lib/types/api";
import { Link } from "@escolalms/components";
import Container from "@/components/Container";
import routeRoutes from "@/components/Routes/routes";

const StyledFooter = styled.footer`
  padding: ${isMobile ? "50px 0 70px" : "50px 0 50px"};
  z-index: 50;
  position: relative;
  .links-row {
    display: flex;
    flex-direction: ${isMobile ? "column" : "row"};
    justify-content: center;
    align-items: center;
    width: 100%;
    flex-wrap: wrap;
    column-gap: ${isMobile ? "0" : "95px"};
    row-gap: ${isMobile ? "20px" : "0"};
    &:nth-of-type(1) {
      margin-bottom: 30px;
    }

    &.pages {
      display: block;
      text-align: ${isMobile ? "center" : "left"};
      border-top: 1px solid ${({ theme }) => theme.gray3};
      padding: 2em 0;

      a > p {
        margin-bottom: 0.5em;
      }
    }
  }

  .single-link {
    text-decoration: none;
    transition: all 0.25s;
    opacity: 1;
    &:hover {
      opacity: 0.5;
    }
  }

  .copyrights {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 42px;
    p {
      margin: 0;
    }
    img {
      max-width: 100%;
      height: auto;
      max-height: 22px;
      margin-left: ${isMobile ? "10px" : "27px"};
    }
  }
`;

const Footer = () => {
  const { settings, fetchPages, pages, user } = useContext(EscolaLMSContext);
  const { t, i18n } = useTranslation();
  useEffect(() => {
    fetchPages();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const footerFromApi = useMemo(
    () =>
      (settings?.value?.footerMenu?.menu ?? []).filter(
        (item: Record<string, string | Record<string, string>>) =>
          user.value ? item : !item.auth
      ),
    [settings?.value?.footerMenu?.menu, user.value]
  );

  const chunkArray = (
    arr: PaginatedMetaList<PageListItem> | undefined,
    chunkSize: number
  ) => {
    if (!arr) return [];
    const tempArray = [];
    for (let i = 0; i < arr.data.length; i += chunkSize) {
      tempArray.push(arr.data.slice(i, i + chunkSize));
    }
    return tempArray;
  };

  return (
    <StyledFooter>
      <Container>
        <div className="links-row">
          {footerFromApi && footerFromApi.length > 0 ? (
            <>
              {footerFromApi.map(
                (link: Record<string, string | Record<string, string>>) => {
                  return (
                    !!link.link && (
                      <Link
                        key={link.link.toString()}
                        className="single-link"
                        href={link.link}
                      >
                        {typeof link.label === "object" && (
                          <Text size="14">{link.label[i18n.language]}</Text>
                        )}
                      </Link>
                    )
                  );
                }
              )}
            </>
          ) : (
            <>
              <Link className="single-link" href={routeRoutes.home}>
                <Text size="14">{t<string>("Footer.HomePage")}</Text>
              </Link>
              <Link className="single-link" href={routeRoutes.courses}>
                <Text size="14">{t<string>("Footer.Courses")}</Text>
              </Link>
              {user.value ? (
                <Link className="single-link" href={routeRoutes.myProfile}>
                  <Text size="14">{t<string>("Footer.UserProfile")}</Text>
                </Link>
              ) : (
                <>
                  <Link className="single-link" href={routeRoutes.login}>
                    <Text size="14">{t<string>("Header.Login")}</Text>
                  </Link>
                  <Link className="single-link" href={routeRoutes.register}>
                    <Text size="14">{t<string>("Header.Register")}</Text>
                  </Link>
                </>
              )}
              <Link className="single-link" href={routeRoutes.cart}>
                <Text size="14">{t<string>("Footer.Cart")}</Text>
              </Link>
            </>
          )}
        </div>

        <div className={"links-row pages"}>
          {chunkArray(pages.list, 4).map((chunk: any[]) => (
            <Row key={chunk.toString()}>
              {chunk.map((page: PageListItem) => (
                <Col xs={12} sm={12} md={12} lg={3} key={page.id}>
                  <Link className="single-link" href={`/#/${page.slug}`}>
                    <Text size="14">{page.title}</Text>
                  </Link>
                </Col>
              ))}
            </Row>
          ))}
        </div>

        <div className="copyrights">
          <Text size="14">{t<string>("Footer.PoweredBy")}</Text>

          <img src={settings?.value?.global?.logo || ""} alt="" />
        </div>
      </Container>
    </StyledFooter>
  );
};

export default Footer;
