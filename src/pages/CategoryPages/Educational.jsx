import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Row, Col } from "reactstrap";
import { toast } from "react-toastify";
import InfiniteScroll from "react-infinite-scroll-component";
import Base from "../../components/Base";
import Post from "../../components/Post";
import { loadPostByCat } from "../../services/post-service";
import { NavLink as ReactLink } from "react-router-dom";
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
const Educational = () => {
  //defining postContent
  const [postContent, setPostContent] = useState({
    content: [],
    totalPages: "",
    totalElements: "",
    pageSize: "",
    lastPage: false,
    pageNumber: "",
  });

  // to call a function for a first Time
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    console.log("loading posts");
    console.log(currentPage);
    changePage(currentPage);
  }, [currentPage]);

  const changePage = (pageNumber = 0, pageSize = 5) => {

    if (pageNumber > postContent.pageNumber && postContent.lastPage) {
      return;
    }
    if (pageNumber < postContent.pageNumber && postContent.pageNumber == 0) {
      return;
    }
    loadPostByCat(4, pageNumber, pageSize)
      .then((data) => {
        setPostContent({
          content: [...postContent.content, ...data.content],
          totalPages: data.totalPages,
          totalElements: data.totalElements,
          pageSize: data.pageSize,
          lastPage: data.lastPage,
          pageNumber: data.pageNumber,
        });

      })
      .catch((error) => {
        toast.error("Error in loading posts");
      });
  };

  const changePageInfinite = () => {
    console.log("page chagned");
    setCurrentPage(currentPage + 1);
  };

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <Base>
      <div className="container-fluid pt-5 pe-1 ps-1">
        <Row>
          <Col
            md={{
              size: 10,
              offset: 1,
            }}
          >
            <div className="d-flex align-items-center justify-content-center justify-content-md-start">
              <Dropdown
                isOpen={dropdownOpen}
                toggle={toggle}
                
              >
                <DropdownToggle caret color="white"  className="categorySelect">Educational ( {postContent?.totalElements} )</DropdownToggle>
                <DropdownMenu className="dropMenu" >
                  <DropdownItem header>Educational</DropdownItem>
                  <DropdownItem tag={ReactLink} to="/">All</DropdownItem>
                  <DropdownItem tag={ReactLink} to="/science">Science</DropdownItem>
                  <DropdownItem tag={ReactLink} to="/personalblogs">Personal blogs</DropdownItem>
                  <DropdownItem tag={ReactLink} to="/technology">Technology</DropdownItem>
                  <DropdownItem tag={ReactLink} to="/financial">Financial</DropdownItem>
                  <DropdownItem tag={ReactLink} to="/travel">Travel</DropdownItem>
                  <DropdownItem tag={ReactLink} to="/health">Health</DropdownItem>
                  <DropdownItem tag={ReactLink} to="/food">Food</DropdownItem>
                  <DropdownItem tag={ReactLink} to="/sports">Sports</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            

            <InfiniteScroll
              dataLength={postContent.content.length}
              next={changePageInfinite}
              hasMore={!postContent.lastPage}
              loader={<h4>Loading...</h4>}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              {postContent.content.map((post, index) => (
                <Post post={post} key={index} />
              ))}
            </InfiniteScroll>
          </Col>
        </Row>
      </div>
    </Base>
  );
};

export default Educational;
