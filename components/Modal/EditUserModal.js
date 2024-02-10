import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
const EditUserModal = ({
  isModalOpen,
  setIsModalOpen,
  formDataForEdit,
  setFormDataForEdit,
  handleEditChange,
  handleEditSubmit,
}) => {
  const handleClose = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <Dialog
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Edit Account</DialogTitle>
        <DialogContent>
          <div className="w-[300px] flex items-center flex-col  justify-center">
            <div>
              <input
                className="border-2 p-2"
                type="text"
                name="name"
                value={formDataForEdit.name}
                onChange={handleEditChange}
              />
            </div>
            <div>
              <input
                className="border-2 p-2"
                name="email"
                type="text"
                value={formDataForEdit.email}
                onChange={handleEditChange}
              />
            </div>
            <div>
              <input
                className="border-2 p-2"
                type="number"
                name="contactNumber"
                onChange={handleEditChange}
                value={formDataForEdit.contactNumber}
              />
            </div>
            <div>
              <input
                className="border-2 p-2"
                name="address"
                type="text"
                onChange={handleEditChange}
                value={formDataForEdit.address}
              />
            </div>

            <div className="w-[197px] border-2 p-2">
              <select
                name="gender"
                value={formDataForEdit.gender}
                className="w-full"
                onChange={handleEditChange}
              >
                <option value="null">Please Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>{" "}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleEditSubmit} autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditUserModal;
