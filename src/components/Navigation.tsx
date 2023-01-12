import React from "react";
import { Link } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

import useHeaderNavigation from "../hooks/useHeaderNavigation";

const Navigation = () => {
  const navigation = useHeaderNavigation();

  return (
    <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-3">
      {navigation &&
        navigation.length > 0 &&
        navigation.map(({ node }: any) => {
          const hasChild = node?.items.length > 0;

          return (
            <li
              key={node?.id}
              className={`nav-item ${hasChild ? "dropdown" : ""}`}
            >
              {hasChild ? (
                <div className="menu-dropdown position-relative d-inline-block">
                  <button className="border-0 bg-transparent nav-link d-flex align-items-center gap-1">
                    {node?.title}
                    <FontAwesomeIcon icon={faChevronDown} />
                  </button>
                  <div className="menu-drodpown-content position-absolute rounded-2 shadow p-2">
                    {node?.items.map(({ id, title, path }: any) => (
                      <Link
                        key={`child-${id}`}
                        className="text-decoration-none nav-link"
                        to={path}
                      >
                        {title}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  className="nav-link"
                  activeClassName="text-primary"
                  to={node?.path}
                >
                  {node?.title}
                </Link>
              )}
            </li>
          );
        })}
    </ul>
  );
};

export default Navigation;
