import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function UserSignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const { handleSubmit, register } = useForm({
    mode: 'onSubmit',
  });
 
  const executeSignUpForm = async (formData) => {
    const {username, useremail, userpass} = formData

    setName(username)
    setEmail(useremail)
    setPass(userpass)

    await fetch('http://backend.dev2/api-docs/users/signup', {
        method: 'POST',
        body: JSON.stringify({
          email: email,
          password: pass,
          name: username,
        }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
    });

  }

  return (
  <>
    <>
      <form onSubmit={handleSubmit(executeSignUpForm)}>
        <input {...register('username')} type="text" name="username" placeholder='Enter first and last name' />
        <input {...register('useremail')} type="text" name="useremail" placeholder='Enter valid email address' />
        <input {...register('userpass')} type="text" name="userpass" placeholder='Enter password'/>
        <br/>
        <button type="submit">Sign Up</button>
      </form>
    </>
  </>)
}