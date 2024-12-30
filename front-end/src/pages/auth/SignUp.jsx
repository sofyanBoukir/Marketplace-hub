import { useState } from "react";
import { Link } from "react-router-dom";

import { Input } from "../../components/ui/Input";
import { Label } from "../../components/ui/Label";
import { Button } from "../../components/ui/Button";
import { Notification } from "../../components/ui/Notification";

export const SignUp = () => {
  const [formSignUp, setFormSingUp] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    retypePassword: "",
  });
  const [showNotification, setShowNotification] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormSingUp((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    formSignUp.password !== formSignUp.retypePassword
      ? setShowNotification(true)
      : setShowNotification(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center h-screen">
        <div className="bg-dark flex flex-col gap-5 justify-center p-5 pt-6 mx-auto">
          <div className="mb-6">
            <h1 className="text-4xl mb-2">Sign up</h1>
            <h4>
              Already have an account?&nbsp;
              <Link to={"/login"} className="text-blue-500 underline">
                Sign in
              </Link>
            </h4>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label text={"First name"} />
              <Input
                type={"text"}
                name={"firstName"}
                placholder={"ex:John"}
                value={formSignUp.firstName}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label text={"Last name"} />
              <Input
                type={"text"}
                name={"lastName"}
                placholder={"ex:doe"}
                value={formSignUp.lastName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <Label text={"Email"} />
            <Input
              type={"email"}
              name={"email"}
              placholder={"ex:John.doe@gmail.com"}
              value={formSignUp.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label text={"Password"} />
            <Input
              type={"password"}
              name={"password"}
              placholder={"••••••••"}
              value={formSignUp.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label text={"Retype password"} />
            <Input
              type={"password"}
              name={"retypePassword"}
              placholder={"••••••••"}
              value={formSignUp.retypePassword}
              onChange={handleChange}
            />
          </div>
          <div>
            <Button type="Submit" text="Sign up" />
          </div>
          {showNotification && (
            <Notification text="the password doesn't match" kind="error" />
          )}
        </div>
      </div>
    </form>
  );
};
