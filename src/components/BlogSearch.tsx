import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

interface IBlogSearch {
  placeholder?: string;
  defaultValue?: any;
}

const BlogSearch = ({ placeholder, defaultValue }: IBlogSearch) => {
  return (
    <form
      method="GET"
      action="/search"
      className="input-search-language input-group"
    >
      <input
        type="text"
        name="q"
        defaultValue={defaultValue}
        className="form-control"
        placeholder={placeholder}
        aria-label={placeholder}
        aria-describedby="button-find-blog"
        required
        minLength={3}
      />
      <button className="btn btn-primary" type="submit" id="button-find-blog">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </form>
  );
};

export default BlogSearch;
