import React from "react";
import { Routes, Route } from "react-router-dom";
import "mdb-react-ui-kit/dist/css/mdb.min.css";

import Nav from "./nav/Nav";
import Table from "./Table/Table";
import AddPage from "./addPage/Testpage";
import Edit from "./editPage/EditPage";

export default function App() {
  return (
    <>
      <div className="md:ml-64">
        <Nav />
        <Routes>
          <Route path="/" element={<Table />} />
          <Route path="/add-page" element={<AddPage />} />
          <Route path="/Edit-todo/:id" exact element={<Edit />} />
        </Routes>
      </div>
    </>
  );
}
