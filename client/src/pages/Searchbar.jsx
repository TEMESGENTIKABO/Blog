import React, { useState } from "react";
import moment from "moment";
import { listSearch } from "../../actions/blog";
import { Link, Typography } from "@mui/material";

const SearchBar = () => {
  const [open, setOpen] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState("sm");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMaxWidthChange = (event) => {
    setMaxWidth(event.target.value);
  };

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };

  const [values, setValues] = useState({
    search: undefined,
    results: [],
    searched: false,
    message: "",
  });

  const { search, results, searched, message } = values;

  const searchSubmit = (e) => {
    e.preventDefault();
    listSearch({ search }).then((data) => {
      console.log(data);
      setValues({
        ...values,
        results: data,
        searched: true,
        message: `${data.length} blogs found`,
      });
    });
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      search: e.target.value,
      searched: false,
      results: [],
    });
  };

  const searchedBlogs = (results = []) => (
    <ul className="list-none">
      {message && (
        <p className="pt-4 text-muted font-italic">{message}</p>
      )}

      {results.map((blog, i) => (
        <React.Fragment key={i}>
          <li className="mb-4">
            <Link href={`/blogs/${blog.slug}`}>
              <div className="flex items-center">
                <img
                  className="w-10 h-10 mr-4 rounded-full"
                  src={`${API}/blog/photo/${blog.slug}`}
                  alt={blog.title}
                />
                <div>
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {blog.title}
                  </Typography>
                  <p className="text-gray-500 text-sm">
                    Published {moment(blog.updatedAt).fromNow()}
                  </p>
                </div>
              </div>
            </Link>
          </li>
          <hr className="border-t border-gray-300" />
        </React.Fragment>
      ))}
    </ul>
  );

  return (
    <>
      <React.Fragment>
        <button
          className="hidden sm:flex md:flex items-center text-gray-800 bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
          onClick={handleClickOpen}
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6s2-4 2-5H10s2 1 2 5zm-2 9a7 7 0 1 0 14 0H10zm4 4h2m-4 0h2m-8 0h2"
            ></path>
          </svg>
          Search...
        </button>
        <div className="fixed inset-0 z-10 overflow-y-auto" style={{ display: open ? 'block' : 'none' }}>
          {/* Rest of the code remains the same */}
        </div>
      </React.Fragment>
    </>
  );
};

export default SearchBar;
