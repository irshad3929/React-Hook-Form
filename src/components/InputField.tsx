import React from "react";
import { useForm } from "react-hook-form";

interface IFormInput {
  name: string;
  email: string;
  social: {
    facebook: string;
    twitter: string;
  };
  phoneNumbers: string[];
}

let renderCount = 0;
const InputField = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      name: "Irshad",  // Default values
      email: "",      
      social: {
        facebook: "",
        twitter: "",
      },
      phoneNumbers: ["", ""],
    },
  });

  const onSubmit = (data: IFormInput) => {
    console.log("Form submitted", data);
  };
  renderCount++;
  return (
    <div className="form-data">
      <h1>React hook form demo ({renderCount / 2} )</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="form-control">
        <label htmlFor="name">Name : </label>
        <input
          {...register("name", {
            required: { value: true, message: "Name is required" },
            minLength: { value: 3, message: "Minimum length is 3" },
          })}
          type="text"
          id="name"
          name="name"
          placeholder="Enter your name"
        />
        {errors.name && <p className="error">{errors.name?.message}</p>}

        <label htmlFor="email">Email : </label>
        <input
          {...register("email", {
            required: { value: true, message: "Email is required" },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Invalid email address",
            },
            validate: {       // Custom validation
              notAdmin: (value) => {
                return value !== "admin@example.com" || "Admin is not allowed";
              },
              notBlacklisted: (value) => {
                return (
                  !value.endsWith("baddomain.com") || "You are blacklisted"
                );
              },
            },
          })}
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
        />
        {errors.email && <p className="error">{errors.email?.message}</p>}
        <br></br>

        <label htmlFor="twitter">Twitter : </label>
        <input
          {...register("social.twitter", {
            validate: {
              notValid: (value) => {
                return (
                  value.endsWith("@twitter.com") ||
                  "Invalid twitter account, it must end with @twitter.com"
                );
              },
            },
          })}
          type="text"
          id="twitter"
          placeholder="Enter your twitter account"
        />
        {errors.social?.twitter && (
          <p className="error">{errors.social.twitter?.message}</p>
        )}
        <br></br>

        <label htmlFor="facebook">Facebook : </label>
        <input
          {...register("social.facebook", {
            validate: {
              notValid: (value) => {
                return (
                  value.endsWith("@facebook.com") ||
                  "Invalid facebook account, it must end with @facebook.com"
                );
              },
            },
          })}
          type="text"
          id="facebook"
          placeholder="Enter your facebook account"
        />
        {errors.social?.facebook && (
          <p className="error">{errors.social.facebook?.message}</p>
        )}
        <br></br>

        <label htmlFor="primary-phone">Primary Phone no : </label>
        <input
          {...register("phoneNumbers.0" , {
            required: { value: true, message: "Phone number is required" },
            pattern: {
                value: /^[0-9]{10}$/i,
                message: 'Invalid phone number, Must be 10 digit number'
                },
          })}
          type="text"
          id="primary-phone"
          placeholder="Enter your primary phone number"
        />

        {errors.phoneNumbers?.[0] && <p className="error">{errors.phoneNumbers[0]?.message}</p>}

        <br></br>

        <label htmlFor="secondary-phone">Secondary Phone No : </label>
        <input
          {...register("phoneNumbers.1")}
          type="text"
          id="secondary-phone"
          placeholder="Enter your secondary phone number"
        />
        <br></br>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default InputField;
