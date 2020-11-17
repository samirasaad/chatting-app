import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import FilterBar from "../FilterBar/FilterBar";
import UserAvatar from "../UserAvatar/UserAvatar";
import "./UsersList.scss";

const UsersList = ({
  handleChange,
  handleFilter,
  searchValue,
  filteredList,
  peerUserId,
}) => {
  useEffect(() => {
    document.querySelectorAll(`.selected-user`).forEach((item) => {
      item.classList.remove("selected-user");
    });

    peerUserId &&
      document.querySelector(`#${peerUserId}`) &&
      document.querySelector(`#${peerUserId}`).classList.add("selected-user");
  });
  return (
    <section className="users-list-wrapper pt-2">
      <FilterBar
        handleFilter={handleFilter}
        handleChange={handleChange}
        searchValue={searchValue}
      />
      {filteredList &&
        filteredList.length > 0 &&
        filteredList.map((user) => (
          <Link to={`/chat/${user.id}`} key={user.id}>
            <div className="d-flex p-2 mt-4 align-items-stretch" id={user.id}>
              <UserAvatar
                img={user.photoUrl && user.photoUrl}
                size="small"
                statusClass={`${
                  user.availibility === "online" && "status-circle-small"
                } `}
              />
              <p className="mx-3 bold-font user-name mb-0 mt-1">{user.userName}</p>
            </div>
          </Link>
        ))}
    </section>
  );
};

export default UsersList;
