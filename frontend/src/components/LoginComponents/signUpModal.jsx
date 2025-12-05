import { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

function SignUpModal(props) {
  const [form, setForm] = useState({
    username: "",
    name: "",
    email: "",
    address: "",
    mobile: "",
    employee_id: "",
    password: "",
  });
  const fields = [
        { label: "Username", name: "username", type: "text" },
        { label: "Name", name: "name", type: "text" },
        { label: "Email", name: "email", type: "email" },
        { label: "Address", name: "address", type: "text" },
        { label: "Mobile", name: "mobile", type: "text" },
        { label: "Employee ID", name: "employeeId", type: "text" },
        { label: "Password", name: "password", type: "password" },
    ];

  // Generic handler for all inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          padding: 4,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 1,
            fontWeight: 700,
            color: "#2c2a2a",
            fontSize: "1.5rem",
            fontFamily: `'Alumni Sans Pinstripe', 'Segoe UI', sans-serif`,
          }}
        >
          Sign Up
        </Typography>

        <form
          onSubmit={(e) => {
            e.preventDefault(); // submit full form on Enter or click
          }}
        >
            {fields.map((field) => (
                <TextField
                    key={field.name}
                    label={field.label}
                    name={field.name}
                    type={field.type}
                    fullWidth
                    required
                    variant="outlined"
                    value={form[field.name]}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
            ))}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            required
            onClick={() => props.createUser(form)}
          >
            Sign Up
          </Button>
        </form>
        <Typography
          onClick={props.onClose}  
          sx={{
            mt: 2,
            textAlign: "center",
            color: "#0077cc",
            cursor: "pointer",
            fontSize: "0.9rem",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          Already have an account? Login!
        </Typography>
      </Box>
  );
}

export default SignUpModal;