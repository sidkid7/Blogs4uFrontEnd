import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { loadAllPosts } from "../services/post-service";
import {
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Container,
} from "reactstrap";
import Post from "./Post";
import { toast } from "react-toastify";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { NavLink as ReactLink } from "react-router-dom";
function NewFeed() {
  const [postContent, setPostContent] = useState({
    content: [],
    totalPages: "",
    totalElements: "",
    pageSize: "",
    lastPage: false,
    pageNumber: "",
  });

  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    console.log("loading posts");
    console.log(currentPage);
    changePage(currentPage);
  }, [currentPage]);

  const changePage = (pageNumber = 0, pageSize = 5) => {
    //cheaks if data is available to give and exits fuction if not.
    //if last page
    if (pageNumber > postContent.pageNumber && postContent.lastPage) {
      return;
    }

    //if content is empty
    if (pageNumber < postContent.pageNumber && postContent.pageNumber == 0) {
      return;
    }

    //Get method call
    loadAllPosts(pageNumber, pageSize)
      .then((data) => {
        setPostContent({
          content: [...postContent.content, ...data.content],
          totalPages: data.totalPages,
          totalElements: data.totalElements,
          pageSize: data.pageSize,
          lastPage: data.lastPage,
          pageNumber: data.pageNumber,
        });

        console.log(data);
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
    <div className="container-fluid pt-4 pe-1 ps-1">
      <Row>
        <Col
          md={{
            size: 10,
            offset: 1,
          }}
        >
          <div className="pt-2 d-flex align-items-center justify-content-center justify-content-md-start">
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggle caret color="white" className="categorySelect ">
                All Blogs( {postContent?.totalElements} )
              </DropdownToggle>
              <DropdownMenu className="dropMenu">
                <DropdownItem header>All</DropdownItem>
                <DropdownItem tag={ReactLink} to="/science">
                  Science
                </DropdownItem>
                <DropdownItem tag={ReactLink} to="/technology">
                  Technology
                </DropdownItem>
                <DropdownItem tag={ReactLink} to="/personalblogs">
                  Personal blogs
                </DropdownItem>
                <DropdownItem tag={ReactLink} to="/educational">
                  Educational
                </DropdownItem>
                <DropdownItem tag={ReactLink} to="/financial">
                  Financial
                </DropdownItem>
                <DropdownItem tag={ReactLink} to="/travel">
                  Travel
                </DropdownItem>
                <DropdownItem tag={ReactLink} to="/health">
                  Health
                </DropdownItem>
                <DropdownItem tag={ReactLink} to="/food">
                  Food
                </DropdownItem>
                <DropdownItem tag={ReactLink} to="/sports">
                  Sports
                </DropdownItem>
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
            {/* postitems */}

            {postContent.content.map((post, index) => (
              <Post post={post} key={index} /> //Post fuction is called here to display data.
            ))}
          </InfiniteScroll>
        </Col>
      </Row>
    </div>
  );
}

export default NewFeed;
