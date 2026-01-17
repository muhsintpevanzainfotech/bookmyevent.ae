import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
  Drawer,
  TextField,
  Button,
  Avatar,
  Divider,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";

export default function Profile() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const schema = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    phone: Yup.string().required("Required"),
  });

  return (
    <div className="max-w-4xl mx-auto p-6">

      {/* PROFILE CARD */}
      <div className="bg-white rounded-xl shadow p-6 flex items-center gap-6">
        <Avatar
          src={user?.profilePhoto}
          sx={{ width: 90, height: 90 }}
        />

        <div className="flex-1">
          <h2 className="text-xl font-bold">
            {user?.firstName} {user?.lastName}
          </h2>
          <p className="text-gray-600">{user?.email}</p>
          <p className="text-gray-600">{user?.phone}</p>
          <p className="text-sm text-gray-400">User ID: {user?.userId}</p>
        </div>

        <Button
          variant="contained"
          onClick={() => setOpen(true)}
        >
          Edit Profile
        </Button>
      </div>

      {/* SIDE DRAWER */}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: "100%", sm: 420 },
            height: "100%",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        {/* HEADER */}
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Edit Profile</h2>
        </div>

        {/* BODY */}
        <div className="flex-1 p-4 overflow-y-auto">
          <Formik
            initialValues={{
              firstName: user?.firstName || "",
              lastName: user?.lastName || "",
              phone: user?.phone || "",
            }}
            validationSchema={schema}
            onSubmit={(values) => {
              dispatch({
                type: "auth/updateProfileRequest",
                payload: values,
              });
              setOpen(false);
            }}
          >
            {({ values, handleChange, touched, errors }) => (
              <Form className="space-y-4">

                <TextField
                  sx={{ mb: 2 }}
                  fullWidth
                  label="First Name"
                  name="firstName"
                  variant="outlined"
                  value={values.firstName}
                  onChange={handleChange}
                  error={touched.firstName && !!errors.firstName}
                  helperText={touched.firstName && errors.firstName}
                />

                <TextField
                  sx={{ mb: 2 }}
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  variant="outlined"
                  value={values.lastName}
                  onChange={handleChange}
                  error={touched.lastName && !!errors.lastName}
                  helperText={touched.lastName && errors.lastName}
                />

                <TextField
                  sx={{ mb: 2 }}
                  fullWidth
                  label="Phone"
                  name="phone"
                  variant="outlined"
                  value={values.phone}
                  onChange={handleChange}
                  error={touched.phone && !!errors.phone}
                  helperText={touched.phone && errors.phone}
                />
              </Form>
            )}
          </Formik>
        </div>

        {/* FOOTER (FIXED BUTTONS) */}
        <div className="p-4 border-t flex gap-3">
          <Button
            variant="contained"
            fullWidth
            onClick={() => document.querySelector("form").requestSubmit()}
          >
            Save Changes
          </Button>

          <Button
            variant="outlined"
            fullWidth
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
        </div>
      </Drawer>

    </div>
  );
}
